import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Doctor } from "../../types/Doctor";
import { DoctorService } from "../../services/DoctorService";
import NoResults from "../../pages/NoResults";

const SearchDoctorsPage = () => {
  const [searchParam] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState(null);

  const city = searchParam.get("city");
  const departmentName = searchParam.get("departmentName");

  useEffect(() => {
    const fetchDoctorsByQuery = async () => {
      try {
        const response = await DoctorService.searchDoctors(city, departmentName);
        if (response.statusCode === 200) {
          setDoctors(response.data);
        } else {
          setError(response?.message);
        }
      } catch (err) {
        setError(err?.message);
      }
    };
    console.log("City:", city);
console.log("Department:", departmentName);

    fetchDoctorsByQuery();
  }, [city,departmentName]);


  if (error) {
    return <NoResults message={error}/>
  }

  if (doctors.length === 0) {
    return <NoResults message="No doctors avaible"/>
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Search Doctors</h1>
        </div>
      </section>

      <section className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="fas fa-search me-2"></i>Find Your Doctor
                  </h5>
                  <form method="GET" action="doctors.html">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Doctor Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="doctor_name"
                          name="doctor_name"
                          placeholder="Enter doctor name"
                          value="<?php echo isset($_GET['doctor_name']) ? htmlspecialchars($_GET['doctor_name']) : ''; ?>"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Department</label>
                        <select
                          className="form-select"
                          id="department"
                          name="department"
                        >
                          <option value="">All Departments</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Location</label>
                        <select
                          className="form-select"
                          id="location"
                          name="location"
                        >
                          <option value="">All Locations</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary me-2">
                          <i className="fas fa-search me-1"></i>Search Doctors
                        </button>
                        <a
                          href="doctors.html"
                          className="btn btn-outline-secondary"
                        >
                          <i className="fas fa-redo me-1"></i>Clear Filters
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
                    <img src="dist/images/doctor-1.jpg" alt="" />
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
                  <p className="text-muted" style={{ marginBottom: "0" }}>
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

export default SearchDoctorsPage;
