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
