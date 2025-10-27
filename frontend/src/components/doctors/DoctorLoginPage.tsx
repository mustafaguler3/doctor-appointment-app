import { useState } from "react";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../types/CustomeJwtPayload";

const DoctorLoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    loginType: "DOCTOR",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(loginData);
      if (response.data.statusCode === 200) {
        const { accessToken, refreshToken } = response.data.data;
        const decoded = jwtDecode<CustomJwtPayload>(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setLoginData(response);
        setUser({
          email: decoded.email,
          imageUrl: decoded.imageUrl,
          role: decoded.role,
          id: decoded.id,
          status: decoded.status,
        });
        navigate("/doctor/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log("Error :", err.response?.data?.message);
      setError("Message :" + err.response?.data?.message);
    }
  };

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
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={handleOnChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </button>
                </form>
                {error && (
                  <div className="mb-3">
                    <span className="text-danger">{error}</span>
                  </div>
                )}
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
