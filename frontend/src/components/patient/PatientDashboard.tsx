import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Patient } from "../../types/Patient";
import patientService from "../../services/PatientService";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const patientId = user?.patientId;
    console.log("Patient ID:", patientId);
    if (!patientId) return;
    const fetchPatientData = async () => {
      try {
        const response = await patientService.getPatientById(patientId);
        setPatient(response.data.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (user) {
      fetchPatientData();
    }
  }, [user]);

  const upcomingAppointments = useMemo(() => {
    if (!patient?.appointments) return [];
    return patient.appointments.filter(
      (appointment) =>
        appointment.status === "PENDING" &&
        new Date(appointment.appointmentDate) >= new Date()
    );
  }, [patient]);

  const passedAppointments = useMemo(() => {
    if (!patient?.appointments) return [];
    return patient.appointments.filter(
      (appointment) =>
        appointment.status !== "PENDING" &&
        new Date(appointment.appointmentDate) < new Date()
    );
  }, [patient]);


  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome back, {user?.fullName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="text-3xl text-blue-500">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {upcomingAppointments.length}
            </h3>
            <p className="text-gray-500">Upcoming Appointments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="text-3xl text-green-500">
            <i className="fas fa-pills"></i>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {passedAppointments.length}
            </h3>
            <p className="text-gray-500">Past Appointments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
