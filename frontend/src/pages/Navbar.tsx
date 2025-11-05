import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {}, [user, logout]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Üst navbar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex items-center text-xl font-semibold text-blue-600">
          <i className="fas fa-stethoscope mr-2"></i>HealthPro
        </Link>

        {!user ? (
          <div className="flex gap-3">
            <Link
              to="/patient-login"
              className="border border-blue-500 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
            >
              Patient Login
            </Link>
            <Link
              to="/doctor-login"
              className="border border-green-500 text-green-600 px-3 py-1 rounded-lg hover:bg-green-50 transition"
            >
              Doctor Login
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
            >
              {user?.email || "Profile"} <i className="fas fa-chevron-down ml-1"></i>
            </button>

            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
                <li>
                  <Link
                    to={
                      user.role === "DOCTOR"
                        ? "/doctor/dashboard"
                        : "/patient/dashboard"
                    }
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Alt navbar */}
      <nav className="bg-blue-300 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center items-center">
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/doctors" className="hover:text-gray-200 transition">
              Doctors
            </Link>
            <Link to="/departments" className="hover:text-gray-200 transition">
              Departments
            </Link>
            <Link to="/contact" className="hover:text-gray-200 transition">
              Contact
            </Link>
            <Link
              to="/patient-appointment-new"
              className="bg-white text-blue-600 px-3 py-1 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Make Appointment
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;