import { useAuth } from "../../hooks/useAuth";

const PatientDashboard = () => {
  const {user} = useAuth();
    return (
        <>
            <div className="profile-header mb-4">
                <h2>Welcome back, {user?.fullName}!</h2>
              </div>
              <div className="row mb-4">
                <div className="col-lg-6 col-md-6 mb-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <div className="stat-content">
                      <h3>0</h3>
                      <p>Upcoming Appointments</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-pills"></i>
                    </div>
                    <div className="stat-content">
                      <h3>0</h3>
                      <p>Past Appointments</p>
                    </div>
                  </div>
                </div>
              </div>
        </>
    )
}

export default PatientDashboard;