export function TerminalContent() {
  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="flex">
          <div className="border-r border-gray-700 pr-4">
            <div className="border-b mb-2">Content Filters</div>
            <div>
              <div>Item 1</div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
