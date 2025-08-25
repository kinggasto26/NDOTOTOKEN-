"use client";
import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const ToastComponent = () =>
    message ? (
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-lg">
        {message}
      </div>
    ) : null;

  return { showToast, ToastComponent };
}