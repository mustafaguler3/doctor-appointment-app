import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const PatientSidebar = () => {
  const { user,logout } = useAuth();
  const location = useLocation();
  useEffect(() => {},[user,logout])
  return (
    <div className="col-lg-3 mb-4">
      <div className="dashboard-sidebar">
        <div className="patient-info-card">
          <div className="patient-avatar mb-0">
            <img
              src={`http://localhost:8080${
                user?.imageUrl || "default.png"
              }`}
              alt="Doctor"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                border: "2px solid #ccc",
              }}
            />
          </div>
          <h4>{user?.fullName}</h4>
          <p className="text-white">Patient ID: #</p>
        </div>
        <nav className="dashboard-nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className={location.pathname.includes("/patient/dashboard") ? "nav-link active" : "nav-link"} 
              href="/patient/dashboard">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
              className={location.pathname.includes("/patient/profile") ? "nav-link active" : "nav-link"} 
              href="/patient/profile">
                <i className="fas fa-user"></i> My Profile
              </a>
            </li>
            <li className="nav-item">
              <a className={location.pathname.includes("/patient/appointment-new") ? "nav-link active" : "nav-link"}  href="/patient/appointment-new">
                <i className="fas fa-plus"></i> Make Appointment
              </a>
            </li>
            <li className="nav-item">
              <a className={location.pathname.includes("/patient/appointments") ? "nav-link active" : "nav-link"}  href="/patient/appointments">
                <i className="fas fa-list"></i> Appointments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default PatientSidebar;
