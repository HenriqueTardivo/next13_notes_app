"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

export default function CreateNote() {
  const titleRef = useRef<HTMLInputElement>(null),
    contentRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const create = async () => {
    if (titleRef.current && contentRef.current) {
      const data = {
        title: titleRef.current.value,
        content: contentRef.current.value,
      };

      const client = new PocketBase("http://127.0.0.1:8090/");

      const record = await client.records.create("note", data);

      router.refresh();
    }
  };

  return (
    <form onSubmit={create}>
      <h3>Create a new Note</h3>
      <input type="text" placeholder="title" ref={titleRef} />
      <textarea placeholder="content" ref={contentRef} />
      <button type="submit">Create Note</button>
    </form>
  );
}
