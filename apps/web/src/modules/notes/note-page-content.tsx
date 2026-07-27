"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Note, updateNote } from "@/generated/api";
import { TerminalToast } from "../shared/terminal-toast";

export function NotePageContent({ note }: { note: Note }) {
  const [text, setText] = useState(note.text);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const folder = searchParams.get("folder") ?? "";
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    async (value: string) => {
      await updateNote(String(note.id), { text: value });
      setToast("> Note saved");
    },
    [note.id],
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(value), 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center flex-col w-full h-full">
      <div className="bg-gray-900 text-green-500 font-mono p-4 rounded w-full">
        <div className="flex items-center justify-between border-b border-gray-700 mb-2 pb-1">
          <span>note_{note.id}.txt</span>
          <button
            type="button"
            onClick={() =>
              router.push(`/terminal${folder ? `?folder=${folder}` : ""}`)
            }
            className="text-green-500 hover:text-green-300 cursor-pointer"
          >
            [ESC] Close
          </button>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="w-full font-mono whitespace-pre-wrap break-words invisible min-h-6"
          >
            {`${text}\n`}
          </div>
          <textarea
            value={text}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full bg-transparent text-green-500 font-mono resize-none outline-none border-none p-0"
          />
        </div>
      </div>
      {toast && <TerminalToast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
