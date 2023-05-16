import { createContext, useContext, useEffect, useState } from 'react';
import { SearchResultProp } from '../@types/Search';
import useDebounce from '../hooks/useDebounce';
import {
  DEBOUNCE_DELAY_IN_MS,
  DEFAULT_RESULT_LENGTH,
  KEYBOARD,
  START_ACTIVE_INDEX,
} from '../utils/const';
import Cache from '../utils/cache';
import useSearch from '../hooks/useSearch';

interface SearchState {
  searchResult: SearchResultProp | null;
  inputText: string;
  activeIndex: number;
}

interface Dispatch {
  controlKeyboard: (e: React.KeyboardEvent) => void;
  changeInputText: (newKeyword: string) => void;
  hoverAction: (itemIndex: number) => void;
  inactivate: () => void;
  changeSearchResult: (keyword: string) => void;
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
  const maxIndex = searchResult?.result
    ? searchResult.result.length - 1
    : DEFAULT_RESULT_LENGTH - 1;

  useEffect(() => {
    search(debouncedKeyword);
  }, [debouncedKeyword]);

  const changeInputText = (keyword: string) => {
    setInputText(keyword);
    setActiveIndex(START_ACTIVE_INDEX);
  };

  const changeSearchResult = (keyword: string) => {
    search(keyword);
  };

  const hoverAction = (itemIndex: number) => setActiveIndex(itemIndex);
  const inactivate = () => setActiveIndex(START_ACTIVE_INDEX);

  const controlKeyboard = (e: React.KeyboardEvent) => {
    const activeText: string = searchResult?.result[activeIndex]
      ? searchResult?.result[activeIndex]
      : '';
    if (e.nativeEvent.isComposing || searchResult?.result.length === 0) return;

    switch (e.key) {
      case KEYBOARD.ENTER:
        if (activeIndex < 0) break;
        changeInputText(activeText);
        break;

      case KEYBOARD.ARROW_DOWN:
        e.preventDefault();
        if (activeIndex === maxIndex) {
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => prev + 1);
        }
        break;

      case KEYBOARD.ARROW_UP:
        e.preventDefault();
        if (activeIndex === START_ACTIVE_INDEX || activeIndex === 0) {
          setActiveIndex(maxIndex);
        } else {
          setActiveIndex((prev) => prev - 1);
        }
        break;

      default:
        break;
    }
  };

  return (
    <SearchContext.Provider value={{ inputText, activeIndex, searchResult }}>
      <SearchDispatchContext.Provider
        value={{
          controlKeyboard,
          changeInputText,
          hoverAction,
          inactivate,
          changeSearchResult,
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
