import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Routes from "./components/Routes";
import { Toast } from "./components/Toast/Toast";
import { BookContextProvider } from "./context/BookContextProvider";

const App = () => {
  return (
    <BookContextProvider>
      <div className="container">
        <NavBar />

        <Routes />
      </div>

      <Footer />

      <Toast />
    </BookContextProvider>
  );
};

export default App;
