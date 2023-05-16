import { SetStateAction } from 'react';

export interface TodoProp {
  id?: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InputTodoProp {
  addTodo: (title: string) => void;
  isLoading: boolean;
}

export interface TodoListProp {
  todos: [];
  setTodos: SetStateAction<[]>;
}
