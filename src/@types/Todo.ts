import { SetStateAction } from 'react';

export interface TodoProp {
  title: string;
}

export interface InputTodoProp {
  setTodos: SetStateAction<[]>;
}

export interface TodoListProp {
  todos: [];
  setTodos: SetStateAction<[]>;
}
