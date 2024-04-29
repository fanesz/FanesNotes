import { Note } from "@renderer/common/type";
import React, { createContext, useContext, useState } from "react";

type StateType = {
  notes: Note[];
  selectedNoteId: string;
  isModalOpen: {
    deleteNoteConfirm: boolean;
  };
  searchValue: string;
  filteredNotes: Note[];
  showSidebar: boolean;
};

export const initialState: StateType = {
  notes: [],
  selectedNoteId: "",

  isModalOpen: {
    deleteNoteConfirm: false
  },

  searchValue: "",
  filteredNotes: [],

  showSidebar: true
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const NoteContext = createContext<ContextType | null>(null);

const useNoteContext = (): ContextType => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NotesProvider");
  }
  return context;
};

const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, setState] = useState<StateType>(initialState);

  return (
    <NoteContext.Provider value={{ state, setState }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NotesProvider, useNoteContext };
export type { StateType };
