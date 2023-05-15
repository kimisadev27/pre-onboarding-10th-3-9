export interface SearchProp {
  q: string;
  page?: number;
  limit?: number;
}

export interface SearchResultProp {
  q: string;
  page: number;
  limit: number;
  result: string[];
  qty: number;
  total: number;
}

export interface Suggestion {
  name: string;
  id: number;
}

export interface DropdownProps {
  isOpen: boolean;
  isScrollEnd: boolean;
}

export interface SearchInputProps {
  onFocus: React.FocusEventHandler<HTMLInputElement>;
}
