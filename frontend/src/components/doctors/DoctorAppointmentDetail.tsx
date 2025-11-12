import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AppointmentService from "../../services/AppointmentService";

const DoctorAppointmentDetail = () => {
  const [doctorAppointment, setDoctorAppointment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    appointmentId: "",
    weight: "",
    height: "",
    tempeture: "",
    pulse: "",
    respiration: "",
    bloodPressure: "",
    problemDescription: "",
    tests: "",
    advice: "",
    habit: [""],
    prescription: {
      doctor: { id:  "" },
      patient: { id:  "" },
      advice: "",
      symptoms: [""],
      diagnosis: [""],
      medicines: [
        {
          sNo: "",
          name: "",
          dosage: "",
          medicineType: "",
          takenTime: "",
          schedule: "",
          totalDays: "",
          instructions: "",
        },
      ],
    },
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e, keyPath) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (opt) => (opt as HTMLOptionElement).value
    );

    if (keyPath.startsWith("prescription.")) {
      const field = keyPath.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        prescription: {
          ...prev.prescription,
          [field]: selectedValues,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [keyPath]: selectedValues,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setFormData({ ...formData, appointmentId: doctorAppointment.id
      });
      console.log(formData);
      console.log("Submitting treatment data...",doctorAppointment.id);
    } catch (err) {
      console.log("Error: ", err?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchDoctorAppointment = async () => {
      try {
        const response = await AppointmentService.getAppointmentDetailByDoctor(
          id
        );
        if (response.data.statusCode === 200) {
          setDoctorAppointment(response.data.data);
          setFormData((prev) => ({
            ...prev,
            appointmentId: response.data.data.id,
            prescription: {
              ...prev.prescription,
              doctor: { id: response.data.data.doctorId },
              patient: { id: response.data.data.patientId },
            },
          }));
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

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = [...prev.prescription.medicines];
      updated[index][name] = value;
      return {
        ...prev,
        prescription: {
          ...prev.prescription,
          medicines: updated,
        },
      };
    });
  };

  const addMedicine = (medicine) => {
    return medicine;
  };

  return (
    <motion.section
      className="container mx-auto py-10 px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
        Appointment Detail
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Vitals */}
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              onChange={handleOnChange}
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
            />
            <Input
              onChange={handleOnChange}
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
            />
            <Input
              onChange={handleOnChange}
              name="tempeture"
              placeholder="Temperature (°C)"
              value={formData.tempeture}
            />
            <Input
              onChange={handleOnChange}
              name="pulse"
              placeholder="Pulse (per min)"
              value={formData.pulse}
            />
            <Input
              onChange={handleOnChange}
              name="respiration"
              placeholder="Respiration (per min)"
              value={formData.respiration}
            />
            <Input
              onChange={handleOnChange}
              name="bloodPressure"
              placeholder="Blood Pressure"
              value={formData.bloodPressure}
            />

            {/* Habit */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Habit
              </label>
              <select
                multiple
                name="habit"
                value={formData.habit}
                onChange={(e) => handleMultiSelectChange(e, "habit")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Smoker">Smoker</option>
                <option value="Non-Smoker">Non-Smoker</option>
                <option value="Drinker">Drinker</option>
                <option value="Non-Drinker">Non-Drinker</option>
              </select>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Symptoms
              </label>
              <select
                multiple
                name="symptoms"
                value={formData.prescription.symptoms}
                onChange={(e) =>
                  handleMultiSelectChange(e, "prescription.symptoms")
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Fever">Fever</option>
                <option value="Cough">Cough</option>
                <option value="Headache">Headache</option>
                <option value="Body Pain">Body Pain</option>
              </select>
            </div>

            {/* Diagnosis */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Diagnosis
              </label>
              <select
                multiple
                name="diagnosis"
                value={formData.prescription.diagnosis}
                onChange={(e) =>
                  handleMultiSelectChange(e, "prescription.diagnosis")
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Common Cold">Common Cold</option>
                <option value="Flu">Flu</option>
                <option value="Migraine">Migraine</option>
              </select>
            </div>
          </div>

          {/* Problem */}
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleOnChange}
            placeholder="Problem Description (optional)"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows={3}
          ></textarea>

          {/* Prescriptions */}
          <div>
            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-3">
                💊 Medicines
              </h4>
              {formData.prescription.medicines.map((med, index) => (
                <div key={index} className="grid md:grid-cols-4 gap-3 mb-3">
                  <Input
                    name="name"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(index, e)}
                    placeholder="Medicine Name"
                  />
                  <Input
                    name="dosage"
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(index, e)}
                    placeholder="Dosage"
                  />
                  <Input
                    name="schedule"
                    value={med.schedule}
                    onChange={(e) => handleMedicineChange(index, e)}
                    placeholder="Schedule"
                  />
                  <Input
                    name="totalDays"
                    value={med.totalDays}
                    onChange={(e) => handleMedicineChange(index, e)}
                    placeholder="Days"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addMedicine}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                + Add another medicine
              </button>
            </div>
          </div>

          {/* Test & Advice */}
          <div className="grid md:grid-cols-2 gap-4">
            <Textarea
              name="tests"
              onChange={handleOnChange}
              placeholder="Test (if any)"
            />
            <Textarea
              name="advice"
              onChange={handleOnChange}
              placeholder="Advice"
            />
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

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
    rows={3}
  ></textarea>
);

export default DoctorAppointmentDetail;
