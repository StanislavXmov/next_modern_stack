"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { Folder, Note } from "@/generated/api";
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
  const [path, setPath] = useQueryState("folder", {
    defaultValue: "",
  });

  const columns = buildColumns(folders, parsePath(path));
  const notes = getSelectedNotes(folders, parsePath(path));

  const handleSelectedFolder = (folderId: number, colIndex: number) => {
    const currentPath = parsePath(path);

    if (currentPath[colIndex] === folderId) {
      // Deselect if already selected
      const newPath = currentPath.slice(0, colIndex);
      setPath(newPath.join(","));
      return;
    }

    const newPath = [...currentPath.slice(0, colIndex), folderId];
    setPath(newPath.join(","));
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
          {notes.length > 0 && (
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
                    href={`/terminal/notes/${note.id}`}
                    key={note.id}
                    className="mb-1 cursor-pointer hover:bg-gray-700 rounded block"
                  >
                    {slug}.txt
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
