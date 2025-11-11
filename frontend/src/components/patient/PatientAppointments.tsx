import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { Appointment } from "../../types/Appointment";
import AppointmentService from "../../services/AppointmentService";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>();
  const [totalElements, setTotalElements] = useState<number>();
  const [sortOption, setSortOption] = useState<string>("appointmentDate,desc");

  useEffect(() => {
    const fetchAppointments = async (p = page, s = size, sort = sortOption) => {
      try {
        const response = await AppointmentService.getPatientAppointments(
          p,
          s,
          sort
        );
        if (response.data.statusCode === 200) {
          setAppointments(response.data.data.content);
          setTotalElements(response.data.data.totalElements);
          setTotalPages(response.data.data.totalPages);
          setPage(response.data.data.number);
          setSize(response.data.data.size);
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
  }, [page, size, sortOption]);

  const goToFirst = () => setPage(0);
  const goToLast = () => setPage(Math.max(0, totalPages - 1));
  const goToPrev = () => setPage((p) => Math.max(0, p - 1));
  const goToNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setSize(newSize);
    setPage(0);
  };

  return (
    <section className="py-10">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Appointments</h2>
        <div className="text-sm text-gray-600">
          {totalElements} result{totalElements !== 1 ? "s" : ""} • Page{" "}
          {page + 1} / {totalPages || 1}
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded px-2 py-1 ml-2"
        >
          <option value="appointmentDate,desc">Newest First</option>
          <option value="appointmentDate,asc">Oldest First</option>
        </select>
      </div>
      {error && (
        <p className="mt-3 text-red-700 font-medium bg-red-100 border border-red-300 p-3 rounded-lg">
          {error}
        </p>
      )}
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

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={goToFirst}
            disabled={page === 0}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={goToPrev}
            disabled={page === 0}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex items-center gap-1 ml-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isCurrent = idx === page;
              if (totalPages > 15) {
                if (
                  Math.abs(idx - page) > 3 &&
                  idx !== 0 &&
                  idx !== totalPages - 1
                )
                  return null;
              }
              return (
                <button
                  key={idx}
                  onClick={() => setPage(idx)}
                  className={`px-2 py-1 rounded ${
                    isCurrent ? "bg-emerald-600 text-white" : "bg-white border"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={goToNext}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={goToLast}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Last
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rows:</label>
          <select
            value={size}
            onChange={handleSizeChange}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default PatientAppointments;
