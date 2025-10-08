import { useEffect, useState } from "react";
import type { Doctor } from "../../types/Doctor";
import { DoctorService } from "../../services/DoctorService";
import NoResultsPage from "../../pages/NoResults";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getDoctors();
        if (response.statusCode === 200) {
          setDoctors(response.data);
        } else {
          setError(response?.message);
        }
      } catch (err) {
        setError(err?.message);
      }
    };

    fetchDoctors();
  }, []);

  if (error) {
    return <NoResultsPage message={error} />;
  }

  if (doctors.length === 0) {
    return <NoResultsPage message="No doctors avaible" />;
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>All Doctors</h1>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row">
            {doctors.map((doctor) => (
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="doctor-card">
                  <div className="doctor-image">
                    <a href="doctor-detail.html">
                      <img
                        src={
                          `http://localhost:8080/images/doctor/` +
                          doctor.user.imageUrl
                        }
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="p-3">
                    <h5>
                      <a
                        href="doctor-detail.html"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {doctor.user.fullName}
                      </a>
                    </h5>
                    <p className="text-muted" style={{ marginBottom: 0 }}>
                      {doctor.biography}
                    </p>
                    <p className="text-muted">{doctor.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorsPage;
