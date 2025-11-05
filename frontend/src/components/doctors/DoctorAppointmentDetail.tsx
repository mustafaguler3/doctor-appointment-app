import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AppointmentService from "../../services/AppointmentService";

const DoctorAppointmentDetail = () => {
  const [doctorAppointment, setDoctorAppointment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDoctorAppointment = async () => {
      try {
        const response = await AppointmentService.getAppointmentDetailByDoctor(id);
        if (response.data.statusCode === 200) {
          setDoctorAppointment(response.data.data);
        } else {
          setError(response.data.message || "Unable to fetch appointment details");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "An error occurred");
      }
    };
    fetchDoctorAppointment();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (!doctorAppointment) {
    return <p className="text-gray-500 text-center mt-10">Loading appointment details...</p>;
  }

  return (
    <motion.section
      className="container mx-auto py-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Appointment Detail
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Patient Info */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            🧍 Patient Information
          </h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {doctorAppointment.patientName}</p>
            <p><strong>Phone:</strong> {doctorAppointment.phoneNumber ?? "—"}</p>
            <p><strong>Email:</strong> {doctorAppointment.patientEmail ?? "—"}</p>
            <p><strong>Gender:</strong> {doctorAppointment.gender ?? "—"}</p>
            <p><strong>Age:</strong> {doctorAppointment.age ?? "—"}</p>
            <p><strong>Blood Group:</strong> {doctorAppointment.bloodGroup ?? "—"}</p>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            🩺 Appointment Information
          </h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>Department:</strong> {doctorAppointment.departmentName}</p>
            <p><strong>Date:</strong> {doctorAppointment.appointmentDate}</p>
            <p><strong>Time:</strong> {doctorAppointment.appointmentTime}</p>
            <p><strong>Notes:</strong> {doctorAppointment.notes || "—"}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  doctorAppointment.status === "COMPLETED"
                    ? "bg-green-100" 
                    : doctorAppointment.status === "PENDING"
                    ? "bg-blue-600 text-white"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {doctorAppointment.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Treatment Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 mt-10">
        <h3 className="text-xl font-semibold text-blue-600 mb-6">
          🧾 Complete Treatment
        </h3>

        <form className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <input type="text" placeholder="Height (cm)" className="input" />
            <input type="text" placeholder="Weight (kg)" className="input" />
            <input type="text" placeholder="Temperature (°C)" className="input" />
            <input type="text" placeholder="Pulse (per min)" className="input" />
            <input type="text" placeholder="Respiration (per min)" className="input" />
            <input type="text" placeholder="Blood Pressure" className="input" />
          </div>

          <textarea
            placeholder="Problem Description (optional)"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <div>
            <h4 className="text-lg font-semibold text-blue-600 mb-2">💊 Prescriptions</h4>
            <div className="grid md:grid-cols-5 gap-3">
              <select className="input">
                <option>Tab</option>
                <option>Capsule</option>
                <option>Injection</option>
                <option>Ointment</option>
              </select>
              <select className="input">
                <option>Paracetamol</option>
                <option>Ibuprofen</option>
                <option>Amoxicillin</option>
              </select>
              <select className="input">
                <option>1-1-1</option>
                <option>1-0-1</option>
                <option>0-1-1</option>
              </select>
              <input type="number" min="1" max="365" placeholder="Days" className="input" />
              <select className="input">
                <option>After Meal</option>
                <option>Before Meal</option>
              </select>
            </div>
            <button type="button" className="mt-3 text-sm text-blue-600 font-medium hover:underline">
              + Add another medicine
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <textarea
              placeholder="Test (if any)"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <textarea
              placeholder="Advice"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Complete Treatment
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default DoctorAppointmentDetail;