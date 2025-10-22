import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorService } from "../../services/DoctorService";
import type { Doctor } from "../../types/Doctor";
import ErrorPage from "../../pages/ErrorPage";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DoctorSchedule from "./DoctorSchedule";

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
              <Card sx={{ height: "100%", boxShadow: 3, borderRadius: 3 }}>
                <CardHeader
                  title={
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarMonthIcon />
                      <Typography variant="h6" fontWeight="bold">
                        Book Appointment
                      </Typography>
                    </Box>
                  }
                  sx={{
                    backgroundColor: "success.main",
                    color: "white",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    py: 1,
                  }}
                />

                <CardContent>
                  <DoctorSchedule doctor={doctor}  />
                </CardContent>
              </Card>
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
