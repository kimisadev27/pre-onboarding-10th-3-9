import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { SearchInputProps } from '../@types/Search';

import './styles/search.css';

const InputTodo = ({ setTodos }: any, { onFocus }: SearchInputProps) => {
  // const [inputText, setInputText] = useState("");
  const { inputText } = useSearchState();
  const { changeInputText } = useSearchDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    // eslint-disable-next-line consistent-return
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev: []) => (prev ? [...prev, data] : [data]));
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        changeInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos],
  );

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => {
          changeInputText(e.target.value);
        }}
        disabled={isLoading}
        onFocus={onFocus}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
  );
};

export default InputTodo;
