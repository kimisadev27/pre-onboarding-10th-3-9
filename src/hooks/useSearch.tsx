import { useState } from 'react';
import { SearchResultProp } from '../@types/Search';
import Cache from '../utils/cache';
import { doSearch } from '../api/search';

type UseSearchOutput = [SearchResultProp | null, (keyword: string) => Promise<void>];

const useSearch = (cache: Cache): UseSearchOutput => {
  const [searchResult, setSearchResult] = useState<SearchResultProp | null>(null);

  const clearResult = () => setSearchResult(null);
  const changeKeyword = async (keyword: string) => {
    if (keyword === '') {
      clearResult();
    } else {
      const cachedData = cache.get<SearchResultProp>(keyword);
      if (cachedData) {
        setSearchResult(cachedData);
      } else {
        const searchData = await doSearch(keyword);
        setSearchResult(searchData);
        cache.set(keyword, searchData);
      }
    }
  };

  return [searchResult, changeKeyword];
};

export default useSearch;
