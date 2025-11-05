import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import type { Appointment } from "../../types/Appointment";
import AppointmentService from "../../services/AppointmentService";
import { toast } from "react-toastify";

const AppointmentHistory = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await AppointmentService.getPatientAppointmentById(id);
        if (response.data.statusCode === 200) {
          setAppointment(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "An unexpected error occurred");
      }
    };
    fetchAppointment();
  }, [id]);

  const cancelAppointment = async () => {
    if (!appointment) return;
    try {
      await AppointmentService.cancelAppointment(appointment.id);
      toast.success("Appointment cancelled successfully");
      const refreshed = await AppointmentService.getPatientAppointmentById(appointment.id);
      if (refreshed.data.statusCode === 200) {
        setAppointment(refreshed.data.data);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error)
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-red-600 font-medium">{error}</p>
      </div>
    );

  if (!appointment)
    return (
      <div className="container mx-auto py-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mx-auto"></div>
        <p className="mt-3 text-gray-600">Loading appointment details...</p>
      </div>
    );

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <i className="fas fa-calendar-check text-blue-500"></i> Appointment Detail
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem
              icon="fas fa-hashtag"
              label="Appointment ID"
              value={appointment.id}
            />
            <DetailItem
              icon="fas fa-calendar-alt"
              label="Date"
              value={dayjs(appointment.appointmentDate).format("DD MMMM YYYY")}
            />
            <DetailItem
              icon="fas fa-clock"
              label="Time"
              value={appointment.appointmentTime}
            />
            <DetailItem
              icon="fas fa-stethoscope"
              label="Department"
              value={appointment.departmentName}
            />
            <DetailItem
              icon="fas fa-user-md"
              label="Doctor"
              value={appointment.fullName}
            />
            <DetailItem
              icon="fas fa-info-circle"
              label="Status"
              value={
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    appointment.status === "PENDING"
                      ? "bg-blue-500"
                      : appointment.status === "COMPLETED"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {appointment.status}
                </span>
              }
            />
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-start gap-3">
                <i className="fas fa-sticky-note text-gray-400 mt-1"></i>
                <div>
                  <h6 className="text-gray-500 mb-1">Notes</h6>
                  <p className="font-medium">{appointment.notes || "No additional notes."}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <i className="fas fa-arrow-left"></i> Back to Appointments
            </button>
            <button
              onClick={cancelAppointment}
              disabled={appointment.status === "CANCELLED"}
              className={`px-4 py-2 rounded-full flex items-center gap-2 text-white ${
                appointment.status === "CANCELLED"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              <i className="fas fa-times"></i>{" "}
              {appointment.status === "CANCELLED" ? "Cancelled" : "Cancel Appointment"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component
const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-3">
    <i className={`${icon} text-gray-400 text-lg`}></i>
    <div>
      <h6 className="text-gray-500 mb-1">{label}</h6>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default AppointmentHistory;