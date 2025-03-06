import { createdAt } from "../../functions/functions";
import { Book } from "../../types/types";
import { useBookContext } from "../../hooks/useBookContext";
import { useEffect } from "react";
import "./Dashboard.css";
import Filter from "../Filter/Filter";
import { DB_PORT } from "../../port";

const Dashboard = () => {
  const {
    books,
    setBooks,
    handleToast,
    filter,
    visibleBooks,
    setVisibleBooks,
  } = useBookContext();

  useEffect(() => {
    localStorage.setItem("selectedBook", "");
  });

  const userLocalStorage = (key: string, data: Book) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleStatus = async (id: string) => {
    const response = await fetch(`http://localhost:${DB_PORT}/books/${id}`);
    const data = await response.json();

    data.status = data.status === "active" ? "inactive" : "active";
    data.modifiedAt = createdAt();

    try {
      await fetch(`http://localhost:${DB_PORT}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setBooks(books.map((book) => (book.id === id ? data : book)));
      if (filter !== "Show All") {
        setVisibleBooks(visibleBooks.filter((book) => book.id !== id));
      } else {
        setVisibleBooks(books.map((book) => (book.id === id ? data : book)));
      }
      handleToast(`${data.status === "active" ? "activated" : "deactivated"}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await fetch(`http://localhost:${DB_PORT}/books/${id}`, {
        method: "DELETE",
      });
      setBooks(books.filter((book) => book.id !== id));
      setVisibleBooks(books.filter((book) => book.id !== id));
      handleToast("deleted");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Filter />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">ISBN</th>
              <th scope="col">Created at</th>
              <th scope="col">Modified at</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleBooks &&
              visibleBooks.map((book: Book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.isbn}</td>
                  <td>{book.createdAt}</td>
                  <td>{book.modifiedAt}</td>
                  <td className="actions">
                    <a href="/edit">
                      <button
                        onClick={() => userLocalStorage("selectedBook", book)}
                      >
                        Edit
                      </button>
                    </a>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                    <button onClick={() => handleStatus(book.id)}>
                      {book.status === "active" ? (
                        <>Deactivate</>
                      ) : (
                        <>Re-Activate</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
