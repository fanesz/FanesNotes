import { useNoteContext } from "@renderer/context";
import useNoteDetails from "./useNoteDetails";
import { Todo } from "@renderer/common/type";
import moment from "moment";
type InputTodoKey = "isCompleted" | "content";

interface TodoListReturn {
  handleInputTodos: (
    key: InputTodoKey,
    selectedTodoId: string,
    value: boolean | string
  ) => void;
  handleDeleteTodo: (pressedKey: string, selectedTodoId: string) => void;
  handleDragTodos: (updatedTodos: Todo[]) => void;
}

const useTodoList = (): TodoListReturn => {
  const { setState } = useNoteContext();
  const { getNoteToUpdate } = useNoteDetails();

  const handleInputTodos = (
    key: InputTodoKey,
    selectedTodoId: string,
    value: boolean | string
  ): void => {
    setState((prev) => {
      const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
      if (!updatedNote) return prev;

      const updatedTodo = updatedNote.todos.map((todo) =>
        todo.id === selectedTodoId ? { ...todo, [key]: value } : todo
      );

      return {
        ...prev,
        notes: [
          {
            ...updatedNote,
            todos: updatedTodo,
            updatedAt: moment()
          },
          ...otherNotes
        ]
      };
    });
  };

  const handleDeleteTodo = (
    pressedKey: string,
    selectedTodoId: string
  ): void => {
    setState((prev) => {
      if (pressedKey !== "Backspace") return prev;

      const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
      if (!updatedNote) return prev;

      const todoToDelete = updatedNote.todos.find(
        (todo) => todo.id === selectedTodoId
      );
      if (todoToDelete?.content !== "") return prev;

      const updatedTodo = updatedNote.todos.filter(
        (todo) => todo.id !== selectedTodoId
      );

      return {
        ...prev,
        notes: [
          {
            ...updatedNote,
            todos: updatedTodo
          },
          ...otherNotes
        ]
      };
    });
  };

  const handleDragTodos = (updatedTodos: Todo[]): void => {
    setState((prev) => {
      const { updatedNote, otherNotes } = getNoteToUpdate(prev.notes);
      if (!updatedNote) return prev;

      return {
        ...prev,
        notes: [
          {
            ...updatedNote!,
            todos: updatedTodos
          },
          ...otherNotes
        ]
      };
    });
  };

  return {
    handleInputTodos,
    handleDeleteTodo,
    handleDragTodos
  };
};

export default useTodoList;
