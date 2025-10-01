
import "./App.css";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Header />
        <div>
          <HomePage/>
        </div>
      <Footer />
    </div>
  );
}

export default App;
