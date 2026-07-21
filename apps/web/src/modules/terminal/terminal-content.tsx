"use client";

import { useQueryState } from "nuqs";
import { Folder } from "@/generated/api";
import { TerminalFolder } from "./terminal-folder";

export function TerminalContent({ folders }: { folders: Folder[] }) {
  const [selectedFolderId, setSelectedFolderId] = useQueryState("folder", {
    defaultValue: "",
  });

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="flex">
          <div className="border-r border-gray-700 pr-4">
            <div className="border-b mb-2">Content Filters</div>
            <div className="flex flex-col items-start">
              {folders.map((folder) => (
                <TerminalFolder
                  onClick={() => setSelectedFolderId(folder.id.toString())}
                  key={folder.id}
                  folder={folder}
                  isSelected={selectedFolderId === folder.id.toString()}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
