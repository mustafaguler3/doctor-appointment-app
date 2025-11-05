import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DoctorSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/doctor/dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
    { path: "/doctor/profile", label: "My Profile", icon: "fas fa-user" },
    { path: "/doctor/appointment-today", label: "Today Appointment", icon: "fas fa-calendar-alt" },
    { path: "/doctor/appointment-all", label: "All Appointments", icon: "fas fa-list" },
    { path: "/doctor/setup-schedule", label: "Setup Schedule", icon: "fas fa-clock" },
    { path: "/doctor/setup-leave", label: "Setup Leave", icon: "fas fa-clipboard-list" },
  ];

  return (
    <aside className="w-full md:w-64 text-white rounded-2xl shadow-lg overflow-hidden">
      {/* Doctor Info */}
      <div className="flex flex-col items-center py-6 bg-blue-700">
        <img
          src={`http://localhost:8080${user?.imageUrl}`}
          alt={user?.fullName}
          className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow-md"
        />
        <h4 className="text-lg font-semibold">{user?.fullName}</h4>
        <p className="text-blue-100 text-sm mt-1">Doctor ID: #D004555</p>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${
                  location.pathname.includes(item.path)
                    ? "bg-blue-500 text-white"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
              >
                <i className={`${item.icon} w-5`}></i>
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={logout}
              className="w-full text-left flex items-center gap-3 px-6 py-3 text-blue-100 hover:bg-red-600 hover:text-white transition-colors"
            >
              <i className="fas fa-sign-out-alt w-5"></i>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DoctorSidebar;