const DoctorLoginPage = () => {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Doctor Login</h1>
        </div>
      </section>
      <section className="auth-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="auth-card mb-5">
                <form method="POST" action="doctor-dashboard.html">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </button>
                </form>
                <div className="auth-links">
                  <p>
                    <a href="doctor-forget-password.html">
                      Forgot your password?
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorLoginPage;
