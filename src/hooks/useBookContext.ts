import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

export const useBookContext = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error('useBookContext must be used within a BookContextProvider');
  }

  return context;
};