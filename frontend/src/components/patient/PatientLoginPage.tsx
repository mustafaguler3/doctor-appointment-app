import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../../types/CustomeJwtPayload";

const PatientLoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { setUser } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    loginType: "PATIENT",
  });

  const handleChange = (e) => {
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
        console.log("Decoded : ", decoded);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setLoginData(response);
        setUser({
          email: decoded.email,
          role: decoded.role,
          id: decoded.id,
          username: decoded.sub,
          fullName: decoded.fullName,
        });
        navigate("/patient/dashboard");
      } else {
        setError(response.data.message);
        console.log("Error :", response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message);
      console.error("Error : ", err);
    }
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Patient Login</h1>
        </div>
      </section>

      <section className="auth-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="auth-card mb-5">
                <form method="POST" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={loginData.email}
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={handleChange}
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
                {error && (
                  <div className="mb-3">
                    <span className="text-danger">{error}</span>
                  </div>
                )}

                <div className="auth-links">
                  <p>
                    <a href="/patient-forget-password">Forgot your password?</a>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <a href="/patient-register">Register here</a>
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

export default PatientLoginPage;
