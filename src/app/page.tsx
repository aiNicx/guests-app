"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export default function Home() {
  const messages = useQuery(api.messages.list) ?? [];
  const addMessage = useMutation(api.messages.add);
  const [text, setText] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Case Vacanza Info</h1>

      <div className="grid gap-4 w-full max-w-md">
        {messages?.map((m: { _id: string; text: string }) => (
          <div
            key={m._id}
            className="rounded-2xl bg-white shadow p-4 text-center"
          >
            {m.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (text) {
            await addMessage({ text });
            setText("");
          }
        }}
        className="mt-6 flex gap-2 w-full max-w-md"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded-lg"
          placeholder="Aggiungi messaggio"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          +
        </button>
      </form>
    </main>
  );
}
