import useNoteList from "@renderer/layout/Sidebar/hooks/useNoteList";
import { Note } from "@renderer/common/type";

interface Props {
  className?: string;
  note: Note;
  selectedNoteId: string;
}
function NoteCard(props: Props): JSX.Element {
  const { handleSelectNote } = useNoteList();

  const noteTitle = props.note.title || "New Note";
  const noteContent =
    props.note.content.trim().length !== 0
      ? props.note.content
      : "..." || "...";

  return (
    <div
      className={props.className}
      onClick={() => handleSelectNote(props.note.id)}
    >
      <div
        className={`p-2 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border shadow-md hover:shadow-lg hover:duration-150 ease-in-out transition cursor-pointer ${props.selectedNoteId === props.note.id ? "border-white border-opacity-80" : "border-gray-100 border-opacity-20 hover:border-opacity-40"}`}
      >
        <span className="line-clamp-1">{noteTitle}</span>
        <span className="text-xs text-white text-opacity-70 line-clamp-2">
          {noteContent}
        </span>
      </div>
    </div>
  );
}

export default NoteCard;
