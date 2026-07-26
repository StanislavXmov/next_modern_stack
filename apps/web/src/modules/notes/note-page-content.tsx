import { Note } from "@/generated/api";

export function NotePageContent({ note }: { note: Note }) {
  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="text-2xl font-bold">{note.id}</h1>
      <p>{note.text}</p>
    </div>
  );
}
