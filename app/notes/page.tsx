import Link from "next/link";
import CreateNote from "./CreateNote";
import styles from "./Notes.module.css";

async function fetchNotes(): Promise<INote[]> {
  const res = await fetch(
      "http://127.0.0.1:8090/api/collections/note/records",
      { cache: "no-store" }
    ),
    data = await res.json();

  return data?.items;
}

export interface INote {
  id: string;
  title: string;
  content: string;
  created: Date;
}

export default async function NotesPage() {
  const notes = await fetchNotes();

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Link href={`notes/${note.id}`} key={note.id} className={styles.note}>
            <div>
              <h2>{note.title}</h2>
              <h3>{note.content}</h3>
              <p>
                {new Intl.DateTimeFormat("pt-br").format(
                  new Date(note.created)
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <CreateNote />
    </div>
  );
}
