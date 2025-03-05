import { Book } from "./types";

export const createId = async () => {
  const response = await fetch("http://localhost:3000/books");
  const data = await response.json();

  const ids = data.map((book: Book) => Number(book.id));
  const newId = Math.max(...ids) + 1;

  return newId.toString();
};
