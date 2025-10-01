const Header = () => {
  return (
    <>
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <i className="fas fa-stethoscope me-2"></i>DokApp
          </a>
          <div className="ms-auto">
            <a
              href="patient-login.html"
              className="btn btn-outline-primary me-2"
            >
              Patient Login
            </a>
            <a href="doctor-login.html" className="btn btn-outline-success">
              Doctor Login
            </a>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg main-nav">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="index.html">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="doctors.html">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="departments.html">
                  Departments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="patient-appointment-new.html">
                  Make Appointment
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
