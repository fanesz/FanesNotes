import { useNoteContext } from "@renderer/context";
import {
  copyableNoteDefaultValue,
  noteDefaultValue,
  todoNoteDefaultValue
} from "@renderer/common/utils/defaultValues";
import { generateRandomId } from "@renderer/common/utils/generateRandomId";
import { Note } from "@renderer/common/type";
import moment from "moment";

type InputNoteKey = "title" | "content";
type NoNoteCheckerAction = "content" | "todo" | "copyable";

interface NoteDetailsReturn {
  getNoteToUpdate: (notes: Note[]) => {
    updatedNote: Note | undefined;
    otherNotes: Note[];
  };
  handleInputNote: (key: InputNoteKey, value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  noNoteSelectedChecker: (
    action: NoNoteCheckerAction,
    value?: string
  ) => boolean;
}

const useNoteDetails = (): NoteDetailsReturn => {
  const { state, setState } = useNoteContext();

  const getNoteToUpdate = (
    notes: Note[]
  ): {
    updatedNote: Note | undefined;
    otherNotes: Note[];
  } => {
    const updatedNote = notes.find((note) => note.id === state.selectedNoteId);
    const otherNotes = notes.filter((note) => note.id !== state.selectedNoteId);
    return { updatedNote, otherNotes };
  };

  const noNoteSelectedChecker = (
    action: NoNoteCheckerAction,
    value?: string
  ): boolean => {
    if (state.notes.length === 0) {
      const newNoteId = generateRandomId();
      const newNote = noteDefaultValue(newNoteId);

      if (action === "content") {
        newNote.content = value || "";
      } else if (action === "todo") {
        newNote.todos = [todoNoteDefaultValue()];
      } else if (action === "copyable") {
        newNote.copyable = [copyableNoteDefaultValue()];
      }

      setState((prev) => ({
        ...prev,
        notes: [
          {
            ...newNote
          }
        ],
        selectedNoteId: newNoteId,
        filteredNotes: []
      }));
      return true;
    }
    return false;
  };

  const handleInputNote = (key: InputNoteKey, value: string): void => {
    !noNoteSelectedChecker("content", value) &&
      setState((prev) => {
        const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
        if (!updatedNote) return prev;

        return {
          ...prev,
          notes: [
            { ...updatedNote!, [key]: value, updatedAt: moment() },
            ...otherNotes
          ]
        };
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();

      const textarea = e.target as HTMLTextAreaElement;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;

      const value = textarea.value;
      const lines = value.split("\n");
      const currentLine =
        lines[textarea.value.substr(0, selectionStart).split("\n").length - 1];

      const prefixMap = {
        "-": "\n- ",
        "+": "\n+ "
      };

      const prefixCharacters = Object.keys(prefixMap);

      const currentTrimmed = currentLine.trim();
      const startsWithPrefix = prefixCharacters.some((prefix) =>
        currentTrimmed.startsWith(prefix)
      );

      if (startsWithPrefix) {
        const prefix = currentTrimmed.charAt(0);
        const insertionString = prefixMap[prefix];

        const newValue =
          value.substring(0, selectionStart) +
          insertionString +
          value.substring(selectionEnd, value.length);

        handleInputNote("content", newValue);

        setTimeout(() => {
          const newPosition = selectionStart + insertionString.length;
          textarea.selectionStart = newPosition;
          textarea.selectionEnd = newPosition;
        });
      } else {
        const newValue =
          value.substring(0, selectionStart) +
          "\n" +
          value.substring(selectionEnd, value.length);

        handleInputNote("content", newValue);

        setTimeout(() => {
          textarea.selectionStart = selectionStart + 1;
          textarea.selectionEnd = selectionStart + 1;
        });
      }
    }
  };

  return {
    getNoteToUpdate,
    handleInputNote,
    handleKeyDown,
    noNoteSelectedChecker
  };
};

export default useNoteDetails;
