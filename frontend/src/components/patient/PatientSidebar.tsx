import { useAuth } from "../../hooks/useAuth";

const PatientSidebar = () => {
  const {user} = useAuth();
  return (
    <div className="col-lg-3 mb-4">
      <div className="dashboard-sidebar">
        <div className="patient-info-card">
          <div className="patient-avatar mb-0">
            <i className="fas fa-user-circle"></i>
          </div>
          <h4>{user?.fullName}</h4>
          <p className="text-white">Patient ID: #</p>
        </div>
        <nav className="dashboard-nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="/patient/dashboard">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/patient/profile">
                <i className="fas fa-user"></i> My Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/patient/appointment-new">
                <i className="fas fa-plus"></i> Make Appointment
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/patient/appointments">
                <i className="fas fa-list"></i> Appointments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/patient-login">
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
