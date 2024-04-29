import { useNoteContext } from "@renderer/context";
import { saveFiles } from "@renderer/common/utils/fileHandler";

interface MainMenuReturn {
  handleShowHideSidebar: () => void;
  handleSearchNote: (value: string) => void;
  handleSortNote: (value: string) => void;
  handleExportAllNotes: () => void;
}

const useMainMenu = (): MainMenuReturn => {
  const { state, setState } = useNoteContext();

  const handleShowHideSidebar = (): void => {
    setState((prev) => ({
      ...prev,
      showSidebar: !prev.showSidebar
    }));
  };

  const handleSearchNote = (value: string): void => {
    setState((prev) => ({
      ...prev,
      searchValue: value
    }));
  };

  const handleSortNote = (value: string): void => {
    if (value.trim() === "") {
      setState((prev) => ({
        ...prev,
        filteredNotes: []
      }));
      return;
    }

    setState((prev) => {
      const filteredNotes = prev.notes.filter((note) =>
        note.title.toLowerCase().includes(value.toLowerCase())
      );
      return {
        ...prev,
        filteredNotes,
        selectedNoteId:
          filteredNotes.length !== 0 && !state.showSidebar
            ? filteredNotes[0].id
            : prev.selectedNoteId
      };
    });
  };

  const handleExportAllNotes = (): void => {
    const noteToSave = state.notes;
    if (noteToSave) {
      saveFiles(noteToSave);
    }
  };

  return {
    handleShowHideSidebar,
    handleSearchNote,
    handleSortNote,
    handleExportAllNotes
  };
};

export default useMainMenu;
