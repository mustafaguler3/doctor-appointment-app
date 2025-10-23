import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import type { Appointment } from "../../types/Appointment";
import AppointmentService from "../../services/AppointmentService";


const AppointmentHistory = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState<string>("");
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await AppointmentService.getAppointmentById(id);
        if (response.data.statusCode === 200) {
          setAppointment(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || "An unexpected error occurred");
      }
    };

    fetchAppointment();
  }, [id]);

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );

  if (!appointment)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading appointment details...</p>
      </div>
    );

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">
            <i className="fas fa-calendar-check me-2 text-primary"></i>
            Appointment Detail
          </h2>
        </div>

        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-hashtag text-secondary me-3 fs-5"></i>
                  <div>
                    <h6 className="mb-0 text-muted">Appointment ID</h6>
                    <p className="fw-semibold mb-0">{appointment.id}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-calendar-alt text-secondary me-3 fs-5"></i>
                  <div>
                    <h6 className="mb-0 text-muted">Date</h6>
                    <p className="fw-semibold mb-0">
                      {dayjs(appointment.appointmentDate).format("DD MMMM YYYY")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-clock text-secondary me-3 fs-5"></i>
                  <div>
                    <h6 className="mb-0 text-muted">Time</h6>
                    <p className="fw-semibold mb-0">
                      {appointment.appointmentTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-stethoscope text-secondary me-3 fs-5"></i>
                  <div>
                    <h6 className="mb-0 text-muted">Department</h6>
                    <p className="fw-semibold mb-0">
                      {appointment.doctor.department.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-user-md text-secondary me-3 fs-5"></i>
                  <div>
                    <h6 className="mb-0 text-muted">Doctor</h6>
                    <p className="fw-semibold mb-0">
                      {appointment.doctor.user.fullName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-info-circle text-secondary me-3 fs-5"></i>
                  <div>
                    <h6 className="mb-0 text-muted">Status</h6>
                    <span
                      className={`badge px-3 py-2 ${
                        appointment.status === "SCHEDULED"
                          ? "bg-primary"
                          : appointment.status === "COMPLETED"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="d-flex align-items-start">
                  <i className="fas fa-sticky-note text-secondary me-3 fs-5 mt-1"></i>
                  <div>
                    <h6 className="mb-0 text-muted">Notes</h6>
                    <p className="fw-semibold mb-0">
                      {appointment.notes || "No additional notes."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end mt-4">
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => window.history.back()}
              >
                <i className="fas fa-arrow-left me-2"></i> Back to Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentHistory;