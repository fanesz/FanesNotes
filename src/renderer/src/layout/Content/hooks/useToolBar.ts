import { useNoteContext } from "@renderer/context";
import useNoteDetails from "./useNoteDetails";
import {
  copyableNoteDefaultValue,
  todoNoteDefaultValue
} from "@renderer/common/utils/defaultValues";
import { saveFile } from "@renderer/common/utils/fileHandler";

interface ToolBarReturn {
  handleDeleteNote: (noteId: string) => void;
  handleAddTodo: () => void;
  handleExportNote: () => void;
  handleAddCopyable: () => void;
}

const useToolBar = (): ToolBarReturn => {
  const { state, setState } = useNoteContext();
  const { noNoteSelectedChecker, getNoteToUpdate } = useNoteDetails();

  const handleDeleteNote = (noteId: string): void => {
    setState((prev) => {
      const newNotes = prev.notes.filter((note) => note.id !== noteId);
      return {
        ...prev,
        notes: newNotes,
        selectedNoteId:
          prev.selectedNoteId === noteId
            ? newNotes?.[0]?.id || prev.selectedNoteId
            : prev.selectedNoteId,
        isModalOpen: {
          ...prev.isModalOpen,
          deleteNoteConfirm: false
        }
      };
    });
  };

  const handleAddTodo = (): void => {
    !noNoteSelectedChecker("todo") &&
      setState((prev) => {
        const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
        if (!updatedNote) return prev;

        return {
          ...prev,
          notes: [
            {
              ...updatedNote,
              todos: [...updatedNote.todos, todoNoteDefaultValue()]
            },
            ...otherNotes
          ]
        };
      });
  };

  const handleExportNote = (): void => {
    const noteToSave = state.notes.find(
      (note) => note.id === state.selectedNoteId
    );
    if (noteToSave) {
      saveFile(noteToSave);
    }
  };

  const handleAddCopyable = (): void => {
    !noNoteSelectedChecker("copyable") &&
      setState((prev) => {
        const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
        if (!updatedNote) return prev;

        return {
          ...prev,
          notes: [
            {
              ...updatedNote,
              copyable: [
                ...(updatedNote.copyable ?? []),
                copyableNoteDefaultValue()
              ]
            },
            ...otherNotes
          ]
        };
      });
  };

  return {
    handleDeleteNote,
    handleAddTodo,
    handleExportNote,
    handleAddCopyable
  };
};

export default useToolBar;
