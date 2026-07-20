import { Folder } from "@/generated/api";

export function TerminalContent({ folders }: { folders: Folder[] }) {
  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="flex">
          <div className="border-r border-gray-700 pr-4">
            <div className="border-b mb-2">Content Filters</div>
            <div>
              {folders.map((folder) => (
                <div key={folder.id}>{folder.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
