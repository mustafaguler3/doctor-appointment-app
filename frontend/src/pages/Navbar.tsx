import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  useEffect(() => {}, [user, logout]);
  return (
    <>
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fas fa-stethoscope me-2"></i>HealthPro
          </a>
          {!user ? (
            <div className="ms-auto">
              <a href="/patient-login" className="btn btn-outline-primary me-2">
                Patient Login
              </a>
              <a href="/doctor-login" className="btn btn-outline-success">
                Doctor Login
              </a>
            </div>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                {user?.email || "Profile"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href={
                    user.role === "DOCTOR" ? "/doctor/dashboard" :"/patient/dashboard"}>
                    Dashboard
                  </a>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg main-nav">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/doctors">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/departments">
                  Departments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="patient-appointment-new">
                  Make Appointment
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
