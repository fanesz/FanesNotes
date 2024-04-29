import { useNoteContext } from "@renderer/context";
import { noteDefaultValue } from "@renderer/common/utils/defaultValues";
import { generateRandomId } from "@renderer/common/utils/generateRandomId";
import { Note } from "@renderer/common/type";

interface NoteListReturn {
  handleAddNote: () => void;
  handleSelectNote: (noteId: string) => void;
  handleOpenModal: (key: string) => void;
  handleCloseModal: (key: string) => void;

  handleDragNotes: (updatedItems: Note[]) => void;
}

const useNoteList = (): NoteListReturn => {
  const { setState } = useNoteContext();

  const handleAddNote = (): void => {
    const newNoteId = generateRandomId();
    setState((prev) => ({
      ...prev,
      notes: [noteDefaultValue(newNoteId), ...prev.notes],
      selectedNoteId: newNoteId,
      filteredNotes: []
    }));
  };

  const handleSelectNote = (noteId: string): void => {
    setState((prev) => ({
      ...prev,
      selectedNoteId: noteId
    }));
  };

  const handleOpenModal = (key: string): void => {
    setState((prev) => ({
      ...prev,
      isModalOpen: {
        ...prev.isModalOpen,
        [key]: true
      }
    }));
  };

  const handleCloseModal = (key: string): void => {
    setState((prev) => ({
      ...prev,
      isModalOpen: {
        ...prev.isModalOpen,
        [key]: false
      }
    }));
  };



  const handleDragNotes = (updatedItems: Note[]): void => {
    setState((prevState) => ({
      ...prevState,
      notes: updatedItems
    }));
  };

  return {
    handleAddNote,
    handleSelectNote,
    handleOpenModal,
    handleCloseModal,

    handleDragNotes
  };
};

export default useNoteList;
