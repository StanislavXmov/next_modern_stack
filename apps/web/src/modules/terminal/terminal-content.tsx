"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { createNote, Folder, Note } from "@/generated/api";
import { TerminalToast } from "../shared/terminal-toast";
import { TerminalFolder } from "./terminal-folder";

function parsePath(path: string): number[] {
  return path.split(",").map(Number).filter(Boolean);
}

function getSelectedNotes(folders: Folder[], path: number[]): Note[] {
  let current = folders;
  let selected: Folder | undefined;

  for (const id of path) {
    selected = current.find((folder) => folder.id === id);
    if (!selected) break;
    current = selected.children || [];
  }

  return selected?.notes || [];
}

function buildColumns(folders: Folder[], path: number[]): Folder[][] {
  const columns: Folder[][] = [folders];

  let current = folders;

  for (const id of path) {
    const selected = current.find((folder) => folder.id === id);
    if (!selected?.children?.length) break;

    columns.push(selected.children || []);
    current = selected.children || [];
  }

  return columns;
}

export function TerminalContent({ folders }: { folders: Folder[] }) {
  const router = useRouter();
  const [path, setPath] = useQueryState("folder", {
    defaultValue: "",
  });

  const [showPrompt, setShowPrompt] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const promptRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showPrompt) {
      promptRef.current?.focus();
    }
  }, [showPrompt]);

  const columns = buildColumns(folders, parsePath(path));
  const notes = getSelectedNotes(folders, parsePath(path));

  const currentPath = parsePath(path);
  const hasFolderSelected = currentPath.length > 0;

  const handleSelectedFolder = (folderId: number, colIndex: number) => {
    const currentPath = parsePath(path);

    if (currentPath[colIndex] === folderId) {
      const newPath = currentPath.slice(0, colIndex);
      setPath(newPath.join(","));
      return;
    }

    const newPath = [...currentPath.slice(0, colIndex), folderId];
    setPath(newPath.join(","));
  };

  const handleCreateNote = useCallback(async () => {
    if (!promptText.trim()) return;

    const folderId = currentPath[currentPath.length - 1];
    await createNote({ text: promptText.trim(), folderId });
    setShowPrompt(false);
    setPromptText("");
    setToast("> Note created");
    router.refresh();
  }, [promptText, currentPath, router]);

  const handlePromptKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateNote();
    } else if (e.key === "Escape") {
      setShowPrompt(false);
      setPromptText("");
    }
  };

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="flex">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="border-r border-gray-700 pr-4 mr-4">
              <div className="border-b mb-2">
                {colIndex === 0 ? "Root" : "Subfolders"}:
              </div>
              <div className="flex flex-col items-start">
                {column.map((folder) => (
                  <TerminalFolder
                    key={folder.id}
                    folder={folder}
                    onClick={() => handleSelectedFolder(folder.id, colIndex)}
                    isSelected={parsePath(path)[colIndex] === folder.id}
                  />
                ))}
              </div>
            </div>
          ))}
          {(notes.length > 0 || hasFolderSelected) && (
            <div>
              <div className="border-b mb-2">Notes:</div>
              {notes.map((note) => {
                const slug = note.text
                  .toLowerCase()
                  .replace(/[^a-z0-9-]+/g, "-")
                  .slice(0, 20)
                  .replace(/-$/, "");

                return (
                  <Link
                    href={`/notes/${note.id}?folder=${path}`}
                    key={note.id}
                    className="mb-1 cursor-pointer hover:bg-gray-700 rounded block"
                  >
                    {slug}.txt
                  </Link>
                );
              })}
              {hasFolderSelected && !showPrompt && (
                <button
                  type="button"
                  onClick={() => setShowPrompt(true)}
                  className="mt-1 cursor-pointer hover:bg-gray-700 rounded text-green-600 hover:text-green-400"
                >
                  [+] new_note.txt
                </button>
              )}
            </div>
          )}
        </div>
        {showPrompt && (
          <div className="mt-2 flex items-center">
            <span>$ note text:&nbsp;</span>
            <input
              ref={promptRef}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handlePromptKeyDown}
              className="bg-transparent text-green-500 outline-none border-none flex-1 font-mono"
            />
          </div>
        )}
      </div>
      {toast && <TerminalToast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
