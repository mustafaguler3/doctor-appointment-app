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
        setError(
          err?.response?.message || err?.message || "Something went wrong"
        );
      }
    };

    fetchAppointments();
  }, []);

  return (
    <section className="py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Appointments
        </h2>

        {error && (
          <p className="mt-3 text-red-700 font-medium bg-red-100 border border-red-300 p-3 rounded-lg">
            {error}
          </p>
        )}
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-800 text-white uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 bg-gray-50 rounded-b-lg"
                >
                  No appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {dayjs(appointment.appointmentDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-3">
                    {appointment.appointmentTime} -{" "}
                    {dayjs(appointment.appointmentTime)
                      .add(1, "hour")
                      .format("HH:mm")}
                  </td>
                  <td className="px-4 py-3">{appointment.departmentName}</td>
                  <td className="px-4 py-3">{appointment.fullName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
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
                  <td className="px-4 py-3 text-center">
                    <a
                      href={`/patient/appointments/${appointment.id}`}
                      className="inline-flex items-center justify-center px-3 py-1.5 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors duration-150"
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
