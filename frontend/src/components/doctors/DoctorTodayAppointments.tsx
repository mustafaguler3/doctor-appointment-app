import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { DoctorAppointment } from "../../types/DoctorAppointment";
import AppointmentService from "../../services/AppointmentService";
import EmptyState from "../../common/EmptyState";

const DoctorTodayAppointments = () => {
  const [error, setError] = useState<string | null>(null);
  const [todayAppointments, setTodayAppointment] = useState<DoctorAppointment[]>([]);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const response = await AppointmentService.getTodayAppointmentsByDoctor();
        if (response.data.statusCode === 200) {
          setTodayAppointment(response.data.data || []);
        } else {
          setError(response.data.message || "Could not fetch today's appointments");
        }
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Server error";
        setError(msg);
        console.error(err);
      }
    };
    fetchTodayAppointments();
  }, []);

  if (todayAppointments.length === 0) {
    return <EmptyState/>
  }

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        description={error}
        actionLabel="Try Again"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="col-span-1 lg:col-span-3">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Today Appointments{" "}
          <span className="text-sm text-gray-500 font-normal">
            ({new Date().toLocaleString()})
          </span>
        </h2>
      </div>

      <div className="space-y-6">
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <form className="flex gap-3">
              <div className="flex-1">
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  id="time_slot"
                  name="time_slot"
                  defaultValue=""
                >
                  <option value="">Select Time Slot</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                </select>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => toast.error("Filter not implemented")}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm"
                  aria-label="Search time slot"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Patient Name</th>
                  <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Department</th>
                  <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Date</th>
                  <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Time</th>
                  <th className="text-left text-sm font-medium text-gray-600 px-4 py-3">Status</th>
                  <th className="text-center text-sm font-medium text-gray-600 px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {todayAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      No appointments for today.
                    </td>
                  </tr>
                ) : (
                  todayAppointments.map((today) => (
                    <tr key={today.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">{today.patientName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{today.departmentName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(today.appointmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{today.appointmentTime}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            today.status === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : today.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {today.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <a
                          href={`/doctor/appointment-all/${today.id}`}
                          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          View
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t text-right">
            <span className="text-sm text-gray-500">
              Showing {todayAppointments.length} appointment{todayAppointments.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorTodayAppointments;