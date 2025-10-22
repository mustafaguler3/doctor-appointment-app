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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
            const response = await AppointmentService.getPatientAppointments()
            console.log(response.data)
            if (response.data.statusCode === 200) {
                setAppointments(response.data.data)
            }else {
                setError(response.data.message)
            }
        }catch(err) {
            console.log(err?.message)
            setError(err?.response.message)
        }
    }

    fetchAppointments()
  }, []);

  const openModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    const modal = new window.bootstrap.Modal(
      document.getElementById("appointmentModal")!
    );
    modal.show();
  };

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
                          <td>{dayjs(appointment.appointmentDate).format("DD/MM/YYYY")}</td>
                          <td>
                            {appointment.appointmentTime} (
                            {dayjs(appointment.appointmentDate)
                              .add(1, "hour")
                              .format("HH:mm")}
                            )
                          </td>
                          <td>{appointment.doctor.department.name}</td>
                          <td>{appointment.doctor.user.fullName}</td>
                          
                          <td>
                            <span
                              className={`badge ${
                                appointment.status === "SCHEDULED"
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
                            <button
                              className="btn btn-sm btn-warning me-1"
                              onClick={() => openModal(appointment)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-primary">
                              <i className="fas fa-prescription"></i>
                            </button>
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

      {/* Appointment Detail Modal */}
      <div
        className="modal fade"
        id="appointmentModal"
        tabIndex={-1}
        aria-labelledby="appointmentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="appointmentModalLabel">
                Appointment Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedAppointment ? (
                <>
                  <p>
                    <b>Order No:</b> {selectedAppointment.id}
                  </p>
                  <p>
                    <b>Date:</b>{" "}
                    {dayjs(selectedAppointment.appointmentDate).format(
                      "DD/MM/YYYY"
                    )}
                  </p>
                  <p>
                    <b>Time:</b> {selectedAppointment.appointmentTime}
                  </p>
                  <p>
                    <b>Department:</b>{" "}
                    {selectedAppointment.doctor.specialization}
                  </p>
                  <p>
                    <b>Doctor:</b> {selectedAppointment.doctor.user.fullName}
                  </p>
                  <p>
                    <b>Status:</b> {selectedAppointment.status}
                  </p>
                  <p>
                    <b>Notes:</b> {selectedAppointment.notes || "-"}
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientAppointments;