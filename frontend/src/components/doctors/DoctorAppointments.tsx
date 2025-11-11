import { useEffect, useState } from "react";
import AppointmentService from "../../services/AppointmentService";
import type { DoctorAppointment } from "../../types/DoctorAppointment";
import dayjs from "dayjs";

const DoctorAppointments = () => {
  const [appointments, setDoctorAppointments] = useState<DoctorAppointment[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>();
  const [totalElements, setTotalElements] = useState<number>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("appointmentDate,desc");

  useEffect(() => {
    const fetchDoctorAppointments = async (
      p = page,
      s = size,
      sort = sortOption
    ) => {
      try {
        const response = await AppointmentService.getAppointmentsByDoctor(
          p,
          s,
          sort
        );
        if (response.data.statusCode === 200) {
          setDoctorAppointments(response.data.data.content);
          setTotalElements(response.data.data.totalElements);
          setTotalPages(response.data.data.totalPages);
          setPage(response.data.data.number);
          setSize(response.data.data.size);
        } else {
          setError(
            response.data.message || "Can not fetch doctor appointments"
          );
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, [page, size, sortOption]);

  const goToFirst = () => setPage(0);
  const goToPrev = () => setPage((p) => Math.max(0, p - 1));
  const goToNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));
  const goToLast = () => setPage(Math.max(0, totalPages - 1));

  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setSize(newSize);
    setPage(0);
  };

  const sortedAppointments = [...appointments].sort((a, b) =>
    dayjs(a.appointmentDate).isAfter(dayjs(b.appointmentDate)) ? -1 : 1
  );

  return (
    <div className="p-6">
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
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      {loading ? (
        <div className="p-6 text-center">Loading...</div>
      ) : appointments.length === 0 ? (
        <div className="p-6 text-center text-gray-600">
          No appointments found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-left text-sm text-gray-700">
              <tr>
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Notes</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedAppointments.map((a) => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{a.patientName}</td>
                  <td className="px-4 py-3">{a.departmentName}</td>
                  <td className="px-4 py-3">{a.appointmentDate}</td>
                  <td className="px-4 py-3">{a.appointmentTime}</td>
                  <td className="px-4 py-3">{a.notes || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        a.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : a.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/doctor/appointment-all/${a.id}`}
                      className="inline-block text-sm text-white bg-blue-600 px-3 py-1 rounded"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
    </div>
  );
};

export default DoctorAppointments;
