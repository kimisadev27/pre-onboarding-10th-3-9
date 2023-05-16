import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';

import { createTodo, getTodoList } from '../api/todo';
import { TodoProp } from '../@types/Todo';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  const addTodo = async (text: string) => {
    try {
      setIsLoading(true);
      const trimmed = text.trim();
      if (!trimmed) {
        return alert('Please write something');
      }

      const newItem = { title: trimmed };
      const { data } = await createTodo(newItem);
      if (data) {
        return setTodoListData((prev) => [...prev, data]);
      }

      return null;
    } catch (error) {
      console.error(error);
      return alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }

    return undefined;
  };

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodo={addTodo} isLoading={isLoading} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
