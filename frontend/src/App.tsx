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
import DoctorDetailPage from "./components/doctors/DoctorDetailPage";
import PatientAppointments from "./components/patient/PatientAppointments";
import AppointmentHistory from "./components/patient/AppointmentHistory";
import DoctorLoginPage from "./components/doctors/DoctorLoginPage";
import DoctorLayout from "./components/doctors/DoctorLayout";
import DoctorDashboard from "./components/doctors/DoctorDashboard";
import DoctorProfile from "./components/doctors/DoctorProfile";
import PatientRegisterPage from "./components/patient/PatientRegisterPage";
import DoctorAppointments from "./components/doctors/DoctorAppointments";
import DoctorAppointmentDetail from "./components/doctors/DoctorAppointmentDetail";

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
            <Route path="/doctors/:id" element={<DoctorDetailPage />} />
            <Route
              path="*"
              element={<ErrorPage message="This page doesn’t exist." />}
            />
            <Route path="/search" element={<SearchDoctorsPage />} />

            {/*Doctor router */}
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route index path="dashboard" element={<DoctorDashboard />} />
              <Route path="profile" element={<DoctorProfile />} />
              <Route path="appointment-all" element={<DoctorAppointments />}/>
              <Route path="appointment-all/:id" element={<DoctorAppointmentDetail/>}/>
            </Route>

            <Route path="/doctor-login" element={<DoctorLoginPage />} />
            <Route path="/patient-login" element={<PatientLoginPage />} />
            <Route path="/patient-register" element={<PatientRegisterPage />} />
            {/*Patient router*/}
            <Route path="/patient" element={<PatientLayout />}>
              <Route index path="dashboard" element={<PatientDashboard />} />
              <Route path="profile" element={<PatientProfile />} />
              
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="appointments/:id" element={<AppointmentHistory />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
