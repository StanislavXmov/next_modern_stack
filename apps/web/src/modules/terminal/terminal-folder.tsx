import cn from "classnames";
import { Folder } from "@/generated/api";

type Props = {
  folder: Folder;
  onClick: () => void;
  isSelected: boolean;
};

export function TerminalFolder({ folder, onClick, isSelected }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("hover:bg-gray-800 cursor-pointer", {
        "bg-gray-700": isSelected,
      })}
    >
      <div>{folder.name}</div>
    </button>
  );
}
