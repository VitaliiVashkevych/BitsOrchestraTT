export const createdAt = () => {
  // 12 March 2022, 8:35AM
  const date = new Date();
  const [day, month, year, hours, minutes] = [
    date.getDate(),
    date.toLocaleString("en-UK", { month: "long" }),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
  ];
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12;

  return `${day} ${month} ${year}, ${hours12}:${minutes}${ampm}`;
};

export const validateForm = (
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
