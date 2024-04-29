import { StateType } from "@renderer/context";
import { Note } from "../type";

type ParsedNote = {
  title: string;
  content: string;
};
function parseNote(note: Note): ParsedNote {
  const parsedContent: string[] = [];

  note.todos.map((todo) => {
    const checked = todo.isCompleted ? "[x] " : "[ ] ";
    parsedContent.push(checked + todo.content);
  });

  note.copyable.map((item) => {
    parsedContent.push("\n```");
    parsedContent.push(item.content);
    parsedContent.push("```");
  });

  parsedContent.push("\n" + note.content);

  return {
    title: note.title || "Untitled",
    content: parsedContent.join("\n")
  };
}

export async function saveFile(note: Note): Promise<void> {
  window.electron.ipcRenderer.send("saveFile", parseNote(note));
}

export async function saveFiles(notes: Note[]): Promise<void> {
  const parsedNotes: ParsedNote[] = [];
  const titleCounts: { [title: string]: number } = {};

  notes?.forEach((note) => {
    const parsedNote = parseNote(note);
    let title = parsedNote.title;
    if (titleCounts[title]) {
      titleCounts[title]++;
      title = `${title} (${titleCounts[title]})`;
    } else {
      titleCounts[title] = 1;
    }
    parsedNotes.push({
      title: title,
      content: parsedNote.content
    });
  });
  window.electron.ipcRenderer.send("saveFiles", parsedNotes);
}

export async function backupOnClose(state: StateType): Promise<void> {
  window.electron.ipcRenderer.send("backupOnClose", state);
}