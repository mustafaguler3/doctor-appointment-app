import { useEffect, useState } from "react";
import AppointmentService from "../../services/AppointmentService";
import type { DoctorAppointment } from "../../types/DoctorAppointment";

const DoctorAppointments = () => {
  const [doctorAppointments, setDoctorAppointments] = useState<DoctorAppointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const response = await AppointmentService.getAppointmentsByDoctor();
        if (response.data.statusCode === 200) {
          setDoctorAppointments(response.data.data);
        } else {
          setError(response.data.message || "Can not fetch doctor appointments");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 border-b pb-3">
        <h2 className="text-2xl font-semibold text-gray-800">All Appointments</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 border-b">Patient Name</th>
                <th className="px-6 py-3 border-b">Department</th>
                <th className="px-6 py-3 border-b">Date</th>
                <th className="px-6 py-3 border-b">Time</th>
                <th className="px-6 py-3 border-b">Notes</th>
                <th className="px-6 py-3 border-b">Status</th>
                <th className="px-6 py-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{appointment.patientName}</td>
                  <td className="px-6 py-3">{appointment.departmentName}</td>
                  <td className="px-6 py-3">{appointment.appointmentDate}</td>
                  <td className="px-6 py-3">{appointment.appointmentTime}</td>
                  <td className="px-6 py-3">{appointment.notes}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "PENDING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <a
                      href={`/doctor/appointment-all/${appointment.id}`}
                      className="inline-flex items-center px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition text-xs"
                    >
                      <i className="fas fa-eye mr-1"></i> View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;