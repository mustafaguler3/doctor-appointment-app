import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import HomePage from "./pages/Home";
import Layout from "./layout/Layout";
import SearchDoctorsPage from "./components/doctors/SearchDoctorsPage";
import ErrorPage from "./pages/ErrorPage";
import DepartmentsPage from "./components/department/DepartmentsPage";
import DoctorsPage from "./components/doctors/DoctorsPage";
import ContactPage from "./pages/ContactPage";
import PatientLoginPage from "./components/patient/PatientLoginPage";
import PatientDashboard from "./components/patient/PatientDashboard";
import PatientProfile from "./components/patient/PatientProfile";
import PatientLayout from "./components/patient/PatientLayout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route
              path="*"
              element={<ErrorPage message="This page doesn’t exist." />}
            />
            <Route path="/search" element={<SearchDoctorsPage />} />
            <Route path="/patient-login" element={<PatientLoginPage />} />

            {/*Patient router*/}
            <Route path="/patient" element={<PatientLayout />}>
              <Route index path="dashboard" element={<PatientDashboard />} />
              <Route path="profile" element={<PatientProfile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
