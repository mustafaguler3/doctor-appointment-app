
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Layout from "./layout/Layout";
import SearchDoctorsPage from "./components/doctors/SearchDoctorsPage";
import ErrorPage from "./pages/ErrorPage";
import DepartmentsPage from "./components/department/DepartmentsPage";
import DoctorsPage from "./components/doctors/DoctorsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/departments" element={<DepartmentsPage />}/>
          <Route path="/doctors" element={<DoctorsPage/>}/>
          <Route path="*" element={<ErrorPage message="This page doesn’t exist." />} />
          <Route path="/search" element={<SearchDoctorsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
