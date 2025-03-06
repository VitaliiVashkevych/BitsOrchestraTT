import { useBookContext } from "../../hooks/useBookContext";
import "./Toast.css";

export const Toast = () => {
  const { toastMessage } = useBookContext();
  return (
    <div className="toast" id="toast">
      <div className="toast-body">
        <p>Book {toastMessage} successfully!</p>
      </div>
    </div>
  );
};
