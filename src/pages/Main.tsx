import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import Dropdown from '../components/Dropdown';

import { getTodoList } from '../api/todo';
import { doSearch } from '../api/search';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import useBoolean from '../hooks/useBoolean';
import useClickOutside from '../hooks/useClickOutside';

const Main = () => {
  const {
    value: isDropdownOpen,
    setFalse: closeDropdown,
    setTrue: openDropdown,
  } = useBoolean(false);

  const {
    value: isDropdownScroll,
    setFalse: resetScroll,
    setTrue: reSearchAndResetScroll,
  } = useBoolean(false);

  const { ref } = useClickOutside<HTMLDivElement>(closeDropdown);

  const [todoListData, setTodoListData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
      // setSearchList([]);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <div className="searchBar">
          <InputTodo setTodos={setTodoListData} />
          <Dropdown isOpen={isDropdownOpen} isScrollEnd={isDropdownScroll} />
        </div>
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
