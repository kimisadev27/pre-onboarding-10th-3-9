import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchContextProvider } from './contexts/SearchContext';
import Main from './pages/Main';
import Cache from './utils/cache';
import './App.css';

const SearchResultCache = new Cache();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SearchContextProvider cache={SearchResultCache}>
      <Main />
    </SearchContextProvider>
  </React.StrictMode>,
);
