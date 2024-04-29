import { Moment } from "moment";

export type Todo = {
  id: string;
  content: string;
  isCompleted: boolean;
};

export type Copyable = {
  id: string;
  content: string;
}

export type Note = {
  id: string;
  title: string;
  content: string;
  todos: Todo[];
  copyable: Copyable[];
  createdAt: Moment;
  updatedAt: Moment;
};

