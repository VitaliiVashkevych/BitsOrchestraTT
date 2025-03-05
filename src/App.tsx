import NavBar from "./components/NavBar";
import Routes from "./components/Routes";
import { Toast } from "./components/Toast";
import { BookContextProvider } from "./context/BookContextProvider";

const App = () => {
  return (
    <BookContextProvider>
      <div className="container">
        <NavBar />

        <Routes />
      </div>
      <footer className="footer">
        <a
          href="https://github.com/VitaliiVashkevych"
          target="__blank"
          className="footer-link"
        >
          Vitalii Vashkevych, GitHub
        </a>
      </footer>
      <Toast />
    </BookContextProvider>
  );
};

export default App;
