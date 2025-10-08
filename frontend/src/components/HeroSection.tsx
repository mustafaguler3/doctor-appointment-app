import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search) params.append("name", search);
    if (location) params.append("city", location);
    if (department) params.append("departmentName", department);

    navigate(`/search?${params.toString()}`)
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="search-card">
              <h2>Find Your Doctor</h2>
              <p className="mb-4">
                Book appointments with the best doctors in your area
              </p>

              <form onSubmit={handleSubmit} method="POST">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="form-control"
                      placeholder="Search by doctor name"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
                      <option value="">Select Location</option>
                      <option value="Istanbul">İstanbul</option>
                      <option value="Ankara">Ankara</option>
                      <option value="İzmir">İzmir</option>
                      <option value="Bursa">Bursa</option>
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} className="form-select">
                      <option value="">Select Department</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Neurodegenerative">Neurodegenerative</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  name="search"
                  className="btn btn-primary btn-lg w-100"
                >
                  <i className="fas fa-search me-2"></i>Search Doctors
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-image">
              <img
                src="/public/images/hero1.jpg"
                alt="Doctor"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
