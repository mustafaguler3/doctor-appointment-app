import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";


const DoctorDashboard = () => {
  const { user, logout } = useAuth();

  useEffect(() => {}, [user, logout]);

  const stats = [
    {
      title: "Today Pending Appointments",
      value: 0,
      icon: "fas fa-calendar-check",
      color: "text-yellow-500",
    },
    {
      title: "Today Completed Appointments",
      value: 0,
      icon: "fas fa-calendar-check",
      color: "text-green-500",
    },
    {
      title: "Total Earning (Today)",
      value: "$0",
      icon: "fas fa-pills",
      color: "text-blue-500",
    },
    {
      title: "Total Earning (Lifetime)",
      value: "$0",
      icon: "fas fa-file-medical-alt",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome back, <span className="text-blue-600">{user?.fullName}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
          >
            <div
              className={`text-4xl ${item.color} bg-gray-50 p-4 rounded-full mr-4`}
            >
              <i className={item.icon}></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
              <p className="text-gray-600">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;