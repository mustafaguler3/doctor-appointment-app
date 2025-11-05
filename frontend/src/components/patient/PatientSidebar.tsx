import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PatientSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const linkClass = (path: string) =>
    location.pathname.includes(path)
      ? "flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium"
      : "flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100";

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src={`http://localhost:8080${user?.imageUrl}`}
          alt="Patient Avatar"
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mb-3"
        />
        <h4 className="text-lg font-semibold text-gray-800">{user?.fullName}</h4>
        <p className="text-sm text-gray-500">Patient ID: #</p>
      </div>

      <nav className="flex flex-col gap-2">
        <a href="/patient/dashboard" className={linkClass("/patient/dashboard")}>
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </a>
        <a href="/patient/profile" className={linkClass("/patient/profile")}>
          <i className="fas fa-user"></i> My Profile
        </a>
        <a href="/patient/appointment-new" className={linkClass("/patient/appointment-new")}>
          <i className="fas fa-plus"></i> Make Appointment
        </a>
        <a href="/patient/appointments" className={linkClass("/patient/appointments")}>
          <i className="fas fa-list"></i> Appointments
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 font-medium"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </nav>
    </aside>
  );
};

export default PatientSidebar;