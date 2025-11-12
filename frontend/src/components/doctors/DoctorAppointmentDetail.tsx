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
        const response = await AppointmentService.getAppointmentDetailByDoctor(
          id
        );
        if (response.data.statusCode === 200) {
          setDoctorAppointment(response.data.data);
        } else {
          setError(
            response.data.message || "Unable to fetch appointment details"
          );
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
    return (
      <p className="text-gray-500 text-center mt-10">
        Loading appointment details...
      </p>
    );
  }

  return (
    <motion.section
      className="container mx-auto py-10 px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Başlık */}
      <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
        Appointment Detail
      </h2>

      {/* Üst Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Patient Info */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
            🧍 Patient Information
          </h3>
          <div className="space-y-2 text-gray-700">
            <Info label="Name" value={doctorAppointment.patientName} />
            <Info label="Phone" value={doctorAppointment.phoneNumber} />
            <Info label="Email" value={doctorAppointment.patientEmail} />
            <Info label="Gender" value={doctorAppointment.gender} />
            <Info label="Age" value={doctorAppointment.age} />
            <Info label="Blood Group" value={doctorAppointment.bloodGroup} />
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
            🩺 Appointment Information
          </h3>
          <div className="space-y-2 text-gray-700">
            <Info label="Department" value={doctorAppointment.departmentName} />
            <Info label="Date" value={doctorAppointment.appointmentDate} />
            <Info label="Time" value={doctorAppointment.appointmentTime} />
            <Info label="Notes" value={doctorAppointment.notes || "—"} />
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  doctorAppointment.status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : doctorAppointment.status === "PENDING"
                    ? "bg-blue-600 text-white"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {doctorAppointment.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Treatment Form */}
      <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 mt-10">
        <h3 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center gap-2">
          🧾 Complete Treatment
        </h3>

        <form className="space-y-8">
          {/* Vitals */}
          <div className="grid md:grid-cols-3 gap-4">
            <Input placeholder="Height (cm)" />
            <Input placeholder="Weight (kg)" />
            <Input placeholder="Temperature (°C)" />
            <Input placeholder="Pulse (per min)" />
            <Input placeholder="Respiration (per min)" />
            <Input placeholder="Blood Pressure" />
          </div>

          {/* Problem */}
          <textarea
            placeholder="Problem Description (optional)"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows={3}
          ></textarea>

          {/* Prescriptions */}
          <div>
            <h4 className="text-lg font-semibold text-blue-600 mb-3">
              💊 Prescriptions
            </h4>
            <div className="grid md:grid-cols-5 gap-3">
              <Select options={["Tab", "Capsule", "Injection", "Ointment"]} />
              <Select options={["Paracetamol", "Ibuprofen", "Amoxicillin"]} />
              <Select options={["1-1-1", "1-0-1", "0-1-1"]} />
              <Input type="number" min="1" max="365" placeholder="Days" />
              <Select options={["After Meal", "Before Meal", "Anytime"]} />
            </div>
            <button
              type="button"
              className="mt-3 text-sm text-blue-600 font-medium hover:underline"
            >
              + Add another medicine
            </button>
          </div>

          {/* Test & Advice */}
          <div className="grid md:grid-cols-2 gap-4">
            <Textarea placeholder="Test (if any)" />
            <Textarea placeholder="Advice" />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Complete Treatment
            </button>
          </div>
        </form>
      </div>
    </motion.section>
  );
};
const Info = ({ label, value }) => (
  <p>
    <strong>{label}:</strong> {value ?? "—"}
  </p>
);

const Input = (props) => (
  <input
    {...props}
    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
  />
);

const Textarea = ({ placeholder }) => (
  <textarea
    placeholder={placeholder}
    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
    rows={3}
  ></textarea>
);

const Select = ({ options }) => (
  <select className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full">
    {options.map((opt) => (
      <option key={opt}>{opt}</option>
    ))}
  </select>
);
export default DoctorAppointmentDetail;
