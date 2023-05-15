import { useEffect, useRef } from 'react';
import { DropdownProps } from '../@types/Search';
import { useSearchState } from '../contexts/SearchContext';

import './styles/dropdown.css';
import DropdownItem from './DropdownItem';

const Dropdown = ({ isOpen, isScrollEnd }: DropdownProps) => {
  const { searchResult, inputText } = useSearchState();

  return (
    <div className="DropdownGroup">
      검색결과:
      {searchResult?.result.length === 0 ? (
        <div>결과 없음</div>
      ) : (
        searchResult?.result.map((result, idx) => (
          <DropdownItem key={result} index={idx}>
            {result}
          </DropdownItem>
        ))
      )}
    </div>
  );
};

export default Dropdown;
