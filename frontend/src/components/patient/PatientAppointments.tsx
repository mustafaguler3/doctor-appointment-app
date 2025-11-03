import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import type { Appointment } from "../../types/Appointment";
import AppointmentService from "../../services/AppointmentService";

declare global {
  interface Window {
    bootstrap: any;
  }
}
const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AppointmentService.getPatientAppointments();
        console.log(response.data);
        if (response.data.statusCode === 200) {
          setAppointments(response.data.data);
          console.log("appointmetns : ",response.data.data)
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.log(err?.message);
        setError(err?.response.message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="profile-header mb-4">
          <h2>All Appointments</h2>
          {error ? <h1 className="alert alert-danger">{error}</h1> : ""}
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Department</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center">
                            No appointments found.
                          </td>
                        </tr>
                      )}

                      {appointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                          <td>{index + 1}</td>
                          <td>
                            {dayjs(appointment.appointmentDate).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td>
                            {appointment.appointmentTime} (
                            {dayjs(appointment.appointmentTime)
                              .add(1, "hour")
                              .format("HH:mm")}
                            )
                          </td>
                          <td>{appointment.departmentName}</td>
                          <td>{appointment.fullName}</td>

                          <td>
                            <span
                              className={`badge ${
                                appointment.status === "PENDING"
                                  ? "bg-primary"
                                  : appointment.status === "COMPLETED"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td>
                            <>
                              <a
                                className="btn btn-sm btn-warning me-1"
                                href={`/patient/appointments/${appointment.id}`}
                              >
                                <i className="fas fa-eye"></i>
                              </a>
                            </>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientAppointments;
