import { INote } from "../page";
import styles from "../Notes.module.css";

async function getNote(noteId: string): Promise<INote> {
  const res = await fetch(
      `http://127.0.0.1:8090/api/collections/note/records/${noteId}`,
      {
        next: { revalidate: 10 },
      }
    ),
    data = await res.json();

  return data;
}

export default async function TodosPage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h2>{note.title}</h2>
        <h3>{note.content}</h3>
        <p>
          {new Intl.DateTimeFormat("pt-br").format(new Date(note.created))}
        </p>{" "}
      </div>
    </div>
  );
}
