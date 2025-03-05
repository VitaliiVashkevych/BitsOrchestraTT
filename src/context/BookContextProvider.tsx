import { useEffect, useState } from "react";
import { Book } from "../types";
import { BookContext } from "./BookContext";

type Props = {
  children: React.ReactNode;
};

export const BookContextProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState("Show Active");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);

    switch (event.target.value) {
      case "Show All":
        setVisibleBooks(books);
        break;
      case "Show Deactivated":
        setVisibleBooks(books.filter((book) => book.status === "inactive"));
        break;
      case "Show Active":
      default:
        setVisibleBooks(books.filter((book) => book.status === "active"));
        break;
    }
  };

  const handleToast = (message: string) => {
    setToastMessage(message);

    document.getElementById("toast")?.classList.add("active");

    const timeoutId = setTimeout(() => {
      document.getElementById("toast")?.classList.remove("active");
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:3000/books");
      const data = await response.json();
      setBooks(data);
      setVisibleBooks(data.filter((book: Book) => book.status === "active"));
    };

    fetchBooks();
  }, []);

  const contextValue = {
    books,
    setBooks,
    toastIsVisible,
    setToastIsVisible,
    toastMessage,
    setToastMessage,
    handleToast,
    visibleBooks,
    filter,
    handleChange,
    setVisibleBooks,
  };
  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
};
