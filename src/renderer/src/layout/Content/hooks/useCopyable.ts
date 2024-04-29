import { useNoteContext } from "@renderer/context";
import useNoteDetails from "./useNoteDetails";
import { useState } from "react";
import moment from "moment";

type CopyingState = "Copy" | "Failed" | "Copied";
interface CopyableReturn {
  copying: CopyingState;
  handleInputCopyable: (selectedCopyableId: string, value: string) => void;
  handleCopyToClipboard: (value: string) => void;
  handleDeleteCopyable: (
    pressedKey: string,
    selectedCopyableId: string
  ) => void;
}

const useCopyable = (): CopyableReturn => {
  const { setState } = useNoteContext();
  const { getNoteToUpdate } = useNoteDetails();
  const [copying, setCopying] = useState<CopyingState>("Copy");

  const handleInputCopyable = (
    selectedCopyableId: string,
    value: string
  ): void => {
    setState((prev) => {
      const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
      if (!updatedNote) return prev;

      const updatedCopyable = updatedNote.copyable.map((item) =>
        item.id === selectedCopyableId ? { ...item, content: value } : item
      );

      return {
        ...prev,
        notes: [
          {
            ...updatedNote,
            copyable: updatedCopyable,
            updatedAt: moment()
          },
          ...otherNotes
        ]
      };
    });
  };

  const handleChangeCopyingState = (state: CopyingState): void => {
    setCopying(state);
    setTimeout(() => {
      setCopying("Copy");
    }, 1000);
  };

  const handleCopyToClipboard = (value: string): void => {
    try {
      navigator.clipboard.writeText(value);
      handleChangeCopyingState("Copied");
    } catch (err) {
      handleChangeCopyingState("Failed");
    }
  };

  const handleDeleteCopyable = (
    pressedKey: string,
    selectedCopyableId: string
  ): void => {
    setState((prev) => {
      if (pressedKey !== "Backspace") return prev;

      const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
      if (!updatedNote) return prev;

      console.log(selectedCopyableId);

      const copyableToDelete = updatedNote.copyable.find(
        (copyable) => copyable.id === selectedCopyableId
      );
      if (copyableToDelete?.content !== "") return prev;

      const updatedcopyable = updatedNote.copyable.filter(
        (copyable) => copyable.id !== selectedCopyableId
      );

      return {
        ...prev,
        notes: [
          {
            ...updatedNote,
            copyable: updatedcopyable
          },
          ...otherNotes
        ]
      };
    });
  };

  return {
    copying,
    handleInputCopyable,
    handleCopyToClipboard,
    handleDeleteCopyable
  };
};

export default useCopyable;
