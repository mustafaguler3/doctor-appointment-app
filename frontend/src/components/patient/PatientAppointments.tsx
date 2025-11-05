import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { Appointment } from "../../types/Appointment";
import AppointmentService from "../../services/AppointmentService";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AppointmentService.getPatientAppointments();
        if (response.data.statusCode === 200) {
          setAppointments(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err?.response?.message || err?.message || "Something went wrong");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <section className="py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Appointments</h2>
        {error && (
          <p className="mt-2 text-red-600 font-medium bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Doctor</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {dayjs(appointment.appointmentDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-2">
                    {appointment.appointmentTime} (
                    {dayjs(appointment.appointmentTime).add(1, "hour").format("HH:mm")})
                  </td>
                  <td className="px-4 py-2">{appointment.departmentName}</td>
                  <td className="px-4 py-2">{appointment.fullName}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm ${
                        appointment.status === "PENDING"
                          ? "bg-blue-500"
                          : appointment.status === "COMPLETED"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`/patient/appointments/${appointment.id}`}
                      className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      <i className="fas fa-eye"></i>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PatientAppointments;