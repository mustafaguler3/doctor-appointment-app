import { useEffect, useState } from "react";
import type { Doctor } from "../types/Doctor";
import { DoctorService } from "../services/doctorService";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getDoctors();

        if (response.statusCode === 200) {
          setDoctors(response.data);
        } else {
          setError(response.message || "Unexpected error");
        }
      } catch (err) {
        setError(err?.message);
      }
    };

    fetchDoctors();
  },[]);

  if (error) {
    return <h1 className="alert alert-danger">{error}</h1>;
  }

  return (
    <section className="featured-doctor py-5 bg-light">
      <div className="container">
        <h2 className="text-center section-title">Our Doctors</h2>
        <div className="row">
          {doctors.map((doctor) => (
            <div className="col-lg-3 col-md-6">
            <div className="doctor-card">
              <div className="doctor-image">
                <a href="doctor-detail.html">
                  <img src="dist/images/doctor-1.jpg" alt="" />
                </a>
              </div>
              <div className="p-3">
                <h5>
                  <a
                    href="doctor-detail.html"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {doctor.id}
                  </a>
                </h5>
                <p className="text-muted" style={{ marginBottom: 0 }}>
                  {doctor.designation}
                </p>
                <p className="text-muted">MBBS, FCPS, FRCS</p>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <a href="doctors.html" className="btn btn-success btn-lg">
            View All Doctors <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
