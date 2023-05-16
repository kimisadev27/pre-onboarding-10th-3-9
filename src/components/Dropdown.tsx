import { DropdownProps } from '../@types/Search';
import { useSearchState } from '../contexts/SearchContext';

import './styles/dropdown.css';
import DropdownItem from './DropdownItem';

const Dropdown = ({ onClickResult }: DropdownProps) => {
  const { searchResult } = useSearchState();

  return (
    <div className="DropdownGroup">
      {searchResult?.result.map((result, idx) => (
        <DropdownItem index={idx} onClickResult={onClickResult}>
          {result}
        </DropdownItem>
      ))}
    </div>
  );
};

export default Dropdown;
