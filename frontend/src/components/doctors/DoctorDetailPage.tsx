import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { DoctorService } from "../../services/DoctorService";
import ErrorPage from "../../pages/ErrorPage";
import DoctorSchedule from "./DoctorSchedule";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>();
  const [error, setError] = useState<string | null>(null);
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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <CircularProgress color="success" size={50} />
      </div>
    );

  if (error) return <ErrorPage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <section className="relative h-72 bg-gradient-to-r from-green-600 to-emerald-400 flex justify-center items-end pb-12">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/hospital-bg.jpg')] bg-cover bg-center"></div>

        <div className="relative z-10 text-center text-white">
          <Avatar
            src={`http://localhost:8080${doctor.user?.imageUrl}`}
            alt={doctor.user?.fullName}
            sx={{
              width: 130,
              height: 130,
              margin: "0 auto",
              border: "4px solid white",
            }}
          />
          <Typography variant="h4" fontWeight="bold" className="mt-3">
            {doctor.user?.fullName}
          </Typography>
          <Typography variant="subtitle1" className="opacity-90">
            {doctor.specialization}
          </Typography>
          <Typography variant="body2" className="flex justify-center items-center gap-1 mt-1">
            <LocationOnIcon fontSize="small" />
            {doctor.city}, {doctor.country}
          </Typography>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-2 space-y-6">
          {/* Biography */}
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader
              title={<Typography variant="h6" fontWeight="bold">Biography</Typography>}
              sx={{ backgroundColor: "primary.main", color: "white" }}
            />
            <CardContent>
              <Typography variant="body1">
                {doctor.biography || "This doctor has not provided a biography yet."}
              </Typography>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader
              title={<Typography variant="h6" fontWeight="bold">Contact Information</Typography>}
              sx={{ backgroundColor: "info.main", color: "white" }}
            />
            <CardContent>
              <Box className="space-y-2 text-gray-700">
                <Typography>
                  <PhoneIcon className="text-success mr-2" />
                  {doctor.user?.phone}
                </Typography>
                <Typography>
                  <EmailIcon className="text-success mr-2" />
                  {doctor.user?.email}
                </Typography>
                <Typography>
                  <i className="fas fa-graduation-cap mr-2 text-success"></i>
                  {doctor.experience} years of experience
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader
              title={<Typography variant="h6" fontWeight="bold">Patient Reviews</Typography>}
              sx={{ backgroundColor: "warning.main", color: "white" }}
            />
            <CardContent>
              {doctor.reviews?.length > 0 ? (
                doctor.reviews.map((r: any) => (
                  <Box key={r.id} className="py-3 border-b border-gray-200">
                    <Typography fontWeight="bold">{r.patientName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {r.comment}
                    </Typography>
                    <Box className="flex items-center mt-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <StarIcon key={i} color="warning" fontSize="small" />
                      ))}
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography>No reviews yet.</Typography>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - Appointment Booking */}
        <div className="sticky top-24">
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
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
              }}
            />
            <CardContent>
              <DoctorSchedule doctor={doctor} />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DoctorDetailPage;