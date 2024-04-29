import { StateType, initialState } from "@renderer/context";
import {
  copyableNoteDefaultValue,
  noteDefaultValue,
  todoNoteDefaultValue
} from "./defaultValues";
import { generateRandomId } from "./generateRandomId";

export function filterBadState(state: StateType): StateType {
  return { ...initialState, ...state };
}

export function filterBadNote(state: StateType): StateType {
  const updatedNotes =
    state?.notes?.map((note) => {
      const fixedTodos =
        note?.todos?.map((todo) => ({
          ...todoNoteDefaultValue(),
          ...todo
        })) || [];

      const fixedCopyable =
        note?.copyable?.map((item) => ({
          ...copyableNoteDefaultValue(),
          ...item
        })) || [];

      return {
        ...noteDefaultValue(),
        ...note,
        todos: fixedTodos,
        copyable: fixedCopyable
      };
    }) || [];

  return { ...state, notes: updatedNotes };
}

export function filterDuplicateIDs(state: StateType): StateType {
  const uniqueIds = new Set<string>();

  const updatedNotes = state?.notes?.map((note) => {
    if (uniqueIds.has(note?.id)) {
      note.id = generateRandomId();
    } else {
      uniqueIds.add(note?.id);
    }

    const uniqueTodoIds = new Set<string>();
    note?.todos?.forEach((todo) => {
      if (uniqueTodoIds.has(todo?.id)) {
        todo.id = generateRandomId();
      } else {
        uniqueTodoIds.add(todo?.id);
      }
    });

    const uniqueCopyableIds = new Set<string>();
    note?.copyable?.forEach((item) => {
      if (uniqueCopyableIds.has(item?.id)) {
        item.id = generateRandomId();
      } else {
        uniqueCopyableIds.add(item?.id);
      }
    });

    return note;
  });

  return { ...state, notes: updatedNotes };
}
