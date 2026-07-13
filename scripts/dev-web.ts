import { join } from "node:path";

const webDir = join(import.meta.dir, "..", "apps", "web");
const isWindows = process.platform === "win32";

let shuttingDown = false;

const proc = Bun.spawn(["bun", "--bun", "next", "dev"], {
  cwd: webDir,
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
  detached: !isWindows,
});

async function cleanup(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;

  const pid = proc.pid;
  if (!pid) {
    process.exit(0);
    return;
  }

  if (isWindows) {
    const killer = Bun.spawn(["taskkill", "/PID", String(pid), "/T", "/F"], {
      stdout: "ignore",
      stderr: "ignore",
    });
    await killer.exited;
  } else {
    try {
      process.kill(-pid, "SIGTERM");
    } catch {
      proc.kill("SIGTERM");
    }
  }

  const exitCode = await proc.exited;
  process.exit(exitCode ?? (signal === "SIGINT" ? 130 : 143));
}

process.on("SIGINT", () => {
  void cleanup("SIGINT");
});

process.on("SIGTERM", () => {
  void cleanup("SIGTERM");
});

const exitCode = await proc.exited;
process.exit(exitCode ?? 0);
