import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorService } from "../../services/DoctorService";
import type { Doctor } from "../../types/Doctor";
import ErrorPage from "../../pages/ErrorPage";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await DoctorService.getDoctorById(+id);

        if (response.data.statusCode === 200) {
          setDoctor(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading doctor details...</div>;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      {/* Doctor Header */}
      <section className="page-banner text-center py-5 bg-light">
        <div className="container">
          <img
            src={`http://localhost:8080${doctor.user?.imageUrl}`}
            alt={doctor.user?.fullName}
            className="img-fluid rounded-circle mb-3"
            style={{
              width: "160px",
              height: "160px",
              objectFit: "cover",
            }}
          />
          <h1 className="fw-bold">{doctor.user?.fullName}</h1>
          <p className="text-muted">{doctor.specialization}</p>
          <p>
            <i className="fas fa-map-marker-alt text-primary me-2"></i>
            {doctor.city}, {doctor.country}
          </p>
        </div>
      </section>

      {/* Doctor Details */}
      <section className="doctor-detail py-5">
        <div className="container">
          <div className="row g-4">
            {/* Doctor Info */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h4 className="card-title text-primary fw-bold">
                    {doctor.user?.fullName}
                  </h4>
                  <p className="text-muted mb-1">
                    <strong>{doctor.specialization}</strong>
                  </p>
                  <p>
                    <i className="fas fa-phone me-2 text-primary"></i>
                    {doctor.user?.phone}
                  </p>
                  <p>
                    <i className="fas fa-envelope me-2 text-primary"></i>
                    {doctor.user?.email}
                  </p>
                  <p className="text-muted small">
                    <i className="fas fa-graduation-cap me-2"></i>
                    {doctor.experience} years of experience
                  </p>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-user-md me-2"></i>Biography
                  </h5>
                </div>
                <div className="card-body">
                  <p>{doctor.biography || "No biography provided."}</p>
                </div>
              </div>
            </div>

            {/* Appointment Booking */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-calendar-alt me-2"></i>Book Appointment
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Select Date</label>
                      <input type="date" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Select Time</label>
                      <select className="form-select">
                        <option>10:00 AM - 11:00 AM</option>
                        <option>01:00 PM - 02:00 PM</option>
                        <option>04:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Payment Method</label>
                      <select className="form-select">
                        <option>Credit Card</option>
                        <option>Stripe</option>
                        <option>PayPal</option>
                      </select>
                    </div>
                    <button className="btn btn-success w-100">
                      Confirm Appointment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="mt-5">
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h4 className="mb-0">
                  <i className="fas fa-clock me-2"></i>Available Schedule
                </h4>
              </div>
              <div className="card-body">
                {doctor.schedules && doctor.schedules.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                      <thead className="table-light">
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Max Patients</th>
                          <th>Booked</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* 
                     
                     {doctor.schedules.map((schedule) => ( 
                          <tr key={schedule.id}>
                            <td>{schedule.date}</td>
                            <td>{schedule.timeSlot}</td>
                            <td>{schedule.maxPatients}</td>
                            <td>{schedule.booked}</td>
                            <td>
                              <span
                                className={`badge ${
                                  schedule.booked >= schedule.maxPatients
                                    ? "bg-danger"
                                    : "bg-success"
                                }`}
                              >
                                {schedule.booked >= schedule.maxPatients
                                  ? "Full"
                                  : "Available"}
                              </span>
                            </td>
                          </tr>
                        ))}
                     */}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No schedules available</p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-5">
            <div className="card shadow-sm">
              <div className="card-header bg-warning">
                <h4 className="mb-0">
                  <i className="fas fa-star text-dark me-2"></i>Patient Reviews
                </h4>
              </div>
              <div className="card-body">
                {doctor.reviews && doctor.reviews.length > 0 ? (
                  doctor.reviews.map((r) => (
                    <div key={r.id} className="border-bottom py-3">
                      <strong>{r.patientName}</strong>
                      <p className="mb-1">{r.comment}</p>
                      <small className="text-muted">
                        Rating: {r.rating} / 5
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorDetailPage;
