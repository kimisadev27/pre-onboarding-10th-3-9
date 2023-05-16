import { createContext, useContext, useEffect, useState } from 'react';
import { SearchResultProp } from '../@types/Search';
import useDebounce from '../hooks/useDebounce';
import { DEBOUNCE_DELAY_IN_MS, START_ACTIVE_INDEX } from '../utils/const';
import Cache from '../utils/cache';
import useSearch from '../hooks/useSearch';

interface SearchState {
  searchResult: SearchResultProp | null;
  inputText: string;
  activeIndex: number;
}

interface Dispatch {
  changeInputText: (newKeyword: string) => void;
  inactivate: () => void;
}

const SearchContext = createContext<SearchState | null>(null);
const SearchDispatchContext = createContext<Dispatch | null>(null);

export const SearchContextProvider = ({
  cache,
  children,
}: {
  cache: Cache;
  children: React.ReactNode;
}) => {
  const [searchResult, search] = useSearch(cache);
  const [inputText, setInputText] = useState('');
  const [activeIndex, setActiveIndex] = useState(START_ACTIVE_INDEX);

  const debouncedKeyword = useDebounce<string>(inputText.trim(), DEBOUNCE_DELAY_IN_MS);

  useEffect(() => {
    search(debouncedKeyword);
  }, [debouncedKeyword]);

  const changeInputText = (keyword: string) => {
    setInputText(keyword);
    setActiveIndex(START_ACTIVE_INDEX);
  };

  const inactivate = () => setActiveIndex(START_ACTIVE_INDEX);

  return (
    <SearchContext.Provider value={{ inputText, activeIndex, searchResult }}>
      <SearchDispatchContext.Provider
        value={{
          changeInputText,
          inactivate,
        }}
      >
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  const state = useContext(SearchContext);
  if (!state) {
    throw new Error('SearchContextProvider not found');
  }
  return state;
};

export const useSearchDispatch = () => {
  const dispatch = useContext(SearchDispatchContext);
  if (!dispatch) {
    throw new Error('SearchContextProvider not found');
  }
  return dispatch;
};
