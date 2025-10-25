const DoctorProfile = () => {
  return (
    <>
      <div className="profile-header mb-4">
        <h2>Update Profile</h2>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="dashboard-card">
            <div className="card-body">
              <form method="POST" action="" encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="photo" className="form-label">
                      Photo
                    </label>
                    <div>
                      <input type="file" name="photo" />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name=""
                      value="Dr. Peter Smith"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name=""
                      value="peter@example.com"
                      placeholder="peter@example.com"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name=""
                      value="(555) 123-4567"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="designation" className="form-label">
                      Designation *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="designation"
                      name=""
                      value="MBBS, FRCS"
                      placeholder="MBBS, FRCS"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name=""
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="retypePassword" className="form-label">
                      Retype Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="retypePassword"
                      name=""
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
