import { useEffect, useState } from "react";
import { createId } from "../api";
import { createdAt, validateForm } from "../func";
import { Book } from "../types";
import { useBookContext } from "../hooks/useBookContext";
import { SERVER_PORT } from "../port";

const EditBook = () => {
  const { handleToast } = useBookContext();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  useEffect(() => {
    const book = localStorage.getItem("selectedBook");
    if (book) {
      setSelectedBook(JSON.parse(book));
    }
  }, []);

  const createNewBook = async (
    title: string,
    author: string,
    category: string,
    isbn: string
  ) => {
    const id = await createId();

    const newBook = {
      id,
      title,
      author,
      category,
      isbn,
      status: "active",
      createdAt: createdAt(),
      modifiedAt: "--",
    };

    try {
      fetch(`http://localhost:${SERVER_PORT}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      handleToast("created");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editSelectedBook = async (
    title: string,
    author: string,
    category: string,
    isbn: string
  ) => {
    const editedBook = {
      ...selectedBook,
      title,
      author,
      category,
      isbn,
      modifiedAt: createdAt(),
    };

    try {
      if (selectedBook) {
        fetch(`http://localhost:${SERVER_PORT}/books/${selectedBook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedBook),
        });
      }
      handleToast("edited");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    const [title, author, category, isbn] = [
      data.get("title") as string,
      data.get("author") as string,
      data.get("category") as string,
      data.get("ISBN") as string,
    ];

    if (!validateForm(title, author, category, isbn)) {
      return;
    }

    if (!selectedBook) {
      createNewBook(title, author, category, isbn);
    } else {
      editSelectedBook(title, author, category, isbn);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Book title:
          <input
            className="input"
            type="text"
            name="title"
            defaultValue={selectedBook?.title}
          />
        </label>
        <label>
          Author name:
          <input
            className="input"
            type="text"
            name="author"
            defaultValue={selectedBook?.author}
          />
        </label>

        {selectedBook && (
          <label>
            Category:
            <label>
              Horror
              <input
                type="radio"
                name="category"
                id="Horror"
                value="Horror"
                defaultChecked={selectedBook?.category === "Horror"}
              />
            </label>
            <label>
              Mystery
              <input
                type="radio"
                name="category"
                id="Mystery"
                value="Mystery"
                defaultChecked={selectedBook?.category === "Mystery"}
              />
            </label>
            <label>
              Science Fiction
              <input
                type="radio"
                name="category"
                id="Science Fiction"
                value="Science Fiction"
                defaultChecked={selectedBook?.category === "Science Fiction"}
              />
            </label>
          </label>
        )}
        {!selectedBook && (
          <label className="radio">
            Category:
            <label>
              <input type="radio" name="category" id="Horror" value="Horror" />
              Horror
            </label>
            <label>
              <input
                type="radio"
                name="category"
                id="Mystery"
                value="Mystery"
              />
              Mystery
            </label>
            <label>
              <input
                type="radio"
                name="category"
                id="Science Fiction"
                value="Science Fiction"
              />
              Science Fiction
            </label>
          </label>
        )}

        <label>
          International Standard Book Number (ISBN):
          <input
            className="input"
            type="number"
            name="ISBN"
            defaultValue={selectedBook?.isbn}
          />
        </label>

        <button type="submit" className="submitBtn">
          Submit changes
        </button>
      </form>
    </>
  );
};

export default EditBook;
