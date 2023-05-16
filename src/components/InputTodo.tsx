import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';

import './styles/search.css';
import Dropdown from './Dropdown';
import useBoolean from '../hooks/useBoolean';
import { InputTodoProp } from '../@types/Todo';

const InputTodo = ({ addTodo, isLoading }: InputTodoProp) => {
  const { inputText, searchResult } = useSearchState();
  const { changeInputText } = useSearchDispatch();

  const { value: isDropdownOpen, setTrue: openDropdown } = useBoolean(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    changeInputText('');
    addTodo(inputText);
  };

  const onClickResult = (clickedResult: string) => {
    changeInputText('');
    addTodo(clickedResult);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="default"
        placeholder="Add new todo..."
        value={inputText}
        onChange={(e) => {
          changeInputText(e.target.value);
        }}
        disabled={isLoading}
        onFocus={openDropdown}
      />
      {isDropdownOpen && searchResult?.result.length !== 0 && (
        <Dropdown onClickResult={onClickResult} />
      )}
    </form>
  );
};

export default InputTodo;
