export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
};

export type BookContextType = {
  books: Book[];
  setBooks: (books: Book[]) => void;
  toastIsVisible: boolean;
  setToastIsVisible: (isVisible: boolean) => void;
  toastMessage: string;
  setToastMessage: (message: string) => void;
  handleToast: (message: string) => void;
  visibleBooks: Book[];
  filter: string;
  handleChange: (e) => void;
  setVisibleBooks: (books: Book[]) => void;
};
