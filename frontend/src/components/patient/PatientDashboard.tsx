import { useAuth } from "../../hooks/useAuth";


const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome back, {user?.fullName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="text-3xl text-blue-500">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold">0</h3>
            <p className="text-gray-500">Upcoming Appointments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="text-3xl text-green-500">
            <i className="fas fa-pills"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold">0</h3>
            <p className="text-gray-500">Past Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;