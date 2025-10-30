import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorService } from "../../services/DoctorService";
import ErrorPage from "../../pages/ErrorPage";
import DoctorSchedule from "./DoctorSchedule";
import "./DoctorDetailPage.css";
import type { Doctor } from "../../types/Doctor";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor>(null);
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

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  if (error) return <ErrorPage message={error} />;

  return (
    <div className="doctor-page">
      {/* HEADER */}
      <div className="doctor-header">
        <img
          src={`http://localhost:8080${doctor.user?.imageUrl}`}
          alt={doctor.user?.fullName}
          className="doctor-photo"
        />
        <h1>{doctor.user?.fullName}</h1>
        <p className="specialization">{doctor.specialization}</p>
        <p className="location">
          <i className="fas fa-map-marker-alt"></i> {doctor.city},{" "}
          {doctor.country}
        </p>
      </div>

      {/* CONTENT */}
      <div className="doctor-content">
        <div className="left-section">
          <div className="card">
            <h2>About Dr. {doctor.user?.fullName}</h2>
            <p>
              {doctor.biography ||
                "This doctor has not provided a biography yet. More information will be available soon."}
            </p>
          </div>

          <div className="card">
            <h2>Contact & Experience</h2>
            <ul>
              <li>
                <i className="fas fa-phone"></i> {doctor.user?.phone}
              </li>
              <li>
                <i className="fas fa-envelope"></i> {doctor.user?.email}
              </li>
              <li>
                <i className="fas fa-briefcase"></i> {doctor.experience} years
                of experience
              </li>
            </ul>
          </div>

          <div className="card">
            <h2>Patient Reviews</h2>
            {doctor.reviews?.length > 0 ? (
              doctor.reviews.map((r) => (
                <div key={r.id} className="review">
                  <strong>{r.patientName}</strong>
                  <p>{r.comment}</p>
                  <div className="stars">
                    {[...Array(r.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>

        <div className="right-section">
          <div className="card schedule-card">
            <h2>
              <i className="fas fa-calendar-alt"></i> Book an Appointment
            </h2>
            <DoctorSchedule doctor={doctor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
