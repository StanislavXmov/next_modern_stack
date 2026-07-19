import { PageWrapper } from "@/modules/shared/page-wrapper";
import { TerminalContent } from "@/modules/terminal/terminal-content";

export default async function TerminalPage() {
  const folders = await fetch("http://localhost:3005/folders").then((res) =>
    res.json(),
  );
  return (
    <PageWrapper>
      <TerminalContent folders={folders} />
    </PageWrapper>
  );
}
