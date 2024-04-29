import { generateRandomId } from "./generateRandomId";
import { Copyable, Note, Todo } from "../type";
import moment from "moment";

export const noteDefaultValue = (
  newNoteId: string = generateRandomId()
): Note => ({
  id: newNoteId,
  title: "",
  content: "",
  todos: [],
  copyable: [],
  createdAt: moment(),
  updatedAt: moment()
});

export const todoNoteDefaultValue = (
  newTodoId: string = generateRandomId()
): Todo => ({
  id: newTodoId,
  content: "",
  isCompleted: false
});

export const copyableNoteDefaultValue = (
  newTodoId: string = generateRandomId()
): Copyable => ({
  id: newTodoId,
  content: ""
});
