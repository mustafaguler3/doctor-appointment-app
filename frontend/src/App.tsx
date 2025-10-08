
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Layout from "./layout/Layout";
import SearchDoctorsPage from "./components/doctors/SearchDoctorsPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage message="This page doesn’t exist." />} />
          <Route path="/search" element={<SearchDoctorsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
