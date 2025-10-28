import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DoctorSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation();
  return (
    <div className="col-lg-3 mb-4">
      <div className="dashboard-sidebar">
        <div className="patient-info-card">
          <div className="patient-avatar">
            <img
              src={`http://localhost:8080${user?.imageUrl}`}
              alt="Dr. Robin Smith"
              className="img-fluid rounded-circle"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>
          <h4>{user?.fullName}</h4>
          <p className="text-white">Doctor ID: #D004555</p>
        </div>
        <nav className="dashboard-nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className={location.pathname.includes("/doctor/dashboard") ? "nav-link active" : "nav-link"}
               href="/doctor/dashboard">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className={location.pathname.includes("/doctor/profile") ? "nav-link active" : "nav-link"} 
              href="/doctor/profile">
                <i className="fas fa-user"></i> My Profile
              </a>
            </li>
            <li className="nav-item">
              <a className={location.pathname.includes("/doctor/appointment-today") ? "nav-link active" : "nav-link"}
              href="/doctor/appointment-today">
                <i className="fas fa-calendar-alt"></i> Today Appointment
              </a>
            </li>
            <li className="nav-item">
              <a className={location.pathname.includes("/doctor/appointment-all") ? "nav-link active" : "nav-link"}
              href="/doctor/appointment-all">
                <i className="fas fa-list"></i> All Appointments
              </a>
            </li>
            <li className="nav-item">
              <a className={location.pathname.includes("/doctor/setup-schedule") ? "nav-link active" : "nav-link"} href="/doctor/setup-schedule">
                <i className="fas fa-clock"></i> Setup Schedule
              </a>
            </li>
            <li className="nav-item">
              <a className={location.pathname.includes("/doctor/setup-leave") ? "nav-link active" : "nav-link"} href="doctor-setup-leave">
                <i className="fas fa-clipboard-list"></i> Setup Leave
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

export default DoctorSidebar;
