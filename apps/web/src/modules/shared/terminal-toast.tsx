"use client";

import { useEffect, useState } from "react";

type Props = {
  message: string;
  onDone: () => void;
};

export function TerminalToast({ message, onDone }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-gray-900 text-green-500 font-mono px-4 py-2 rounded border border-gray-700 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {message}
    </div>
  );
}
