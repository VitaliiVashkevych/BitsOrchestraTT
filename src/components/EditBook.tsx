import { useEffect, useState } from "react";
import { createId } from "../api";
import { createdAt } from "../func";
import { Book } from "../types";
import { useBookContext } from "../hooks/useBookContext";

const EditBook = () => {
  const { handleToast } = useBookContext();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();

  useEffect(() => {
    const book = localStorage.getItem("selectedBook");
    if (book) {
      setSelectedBook(JSON.parse(book));
    }
  }, []);

  const validateForm = (
    title: string,
    author: string,
    category: string,
    isbn: string
  ) => {
    if (!title.trim()) {
      alert("Title is required");
      return false;
    }
    if (!author.trim()) {
      alert("Author is required");
      return false;
    }
    if (!category) {
      alert("Category is required");
      return false;
    }
    if (isNaN(Number(isbn)) || Number(isbn) <= 0) {
      alert("Please enter a valid ISBN number.");
      return false;
    }

    return true;
  };

  const createNewBook = async (data) => {
    const id = await createId();

    const [title, author, category, isbn] = [
      data.get("title"),
      data.get("author"),
      data.get("category"),
      data.get("ISBN"),
    ];

    if (!validateForm(title, author, category, isbn)) {
      return;
    }

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
      console.log("fuck you");

      fetch("http://localhost:3000/books", {
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

  const editSelectedBook = async (data) => {
    const [title, author, category, isbn] = [
      data.get("title"),
      data.get("author"),
      data.get("category"),
      data.get("ISBN"),
    ];

    if (!validateForm(title, author, category, isbn)) {
      return;
    }

    const editedBook = {
      ...selectedBook,
      title,
      author,
      category,
      isbn,
      modifiedAt: createdAt(),
    };

    try {
      fetch(`http://localhost:3000/books/${selectedBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedBook),
      });
      handleToast("edited");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    if (!selectedBook) {
      createNewBook(data);
    } else {
      editSelectedBook(data);
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

        <button type="submit" className="submitBtn">Submit changes</button>
      </form>
    </>
  );
};

export default EditBook;
