"use client";

import { useQueryState } from "nuqs";
import { Folder } from "@/generated/api";
import { TerminalFolder } from "./terminal-folder";

function buildColumns(folders: Folder[], path: number[]): Folder[][] {
  const columns: Folder[][] = [folders];

  let current = folders;

  for (const id of path) {
    const selected = current.find((folder) => folder.id === id);
    if (!selected?.children.length) break;

    columns.push(selected.children || []);
    current = selected.children || [];
  }

  return columns;
}

export function TerminalContent({ folders }: { folders: Folder[] }) {
  const [selectedFolderId, setSelectedFolderId] = useQueryState("folder", {
    defaultValue: "",
  });

  const path = selectedFolderId ? [parseInt(selectedFolderId, 10)] : [];
  const columns = buildColumns(folders, path);

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
                    onClick={() => setSelectedFolderId(folder.id.toString())}
                    isSelected={folder.id.toString() === selectedFolderId}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
