import { createContext } from "react";
import { BookContextType } from "../types/types";

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);
