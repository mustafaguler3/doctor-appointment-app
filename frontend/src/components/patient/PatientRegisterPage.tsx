import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const PatientRegisterPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string()
      .matches(/^\d{5}$/, "Zip code must be 5 digits")
      .required("Zip code is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Phone must be between 10 and 15 digits")
      .required("Phone is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    role: "PATIENT",
    terms: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await AuthService.register(values);
      if (response.data.statusCode === 201) {
        toast.success("Patient account created successfully");
        navigate("/patient-login")
        setServerError(null);
        resetForm();
      } else {
        toast.error(response.data.message);
        setServerError(response.data.message);
      }
    } catch (err: any) {
      console.error(err);
      setServerError(err?.response?.data?.message || "Something went wrong");
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Patient Registration</h1>
        </div>
      </section>

      <section className="auth-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="auth-card mb-5">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* Full Name */}
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <Field
                          type="text"
                          name="fullName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Password */}
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Address */}
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <Field
                          type="text"
                          name="address"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <Field
                          as="select"
                          name="gender"
                          className="form-select"
                        >
                          <option value="">Select...</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Field>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* City */}
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <Field
                          type="text"
                          name="city"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* State */}
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <Field
                          type="text"
                          name="state"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Zip */}
                      <div className="form-group">
                        <label htmlFor="zip">Zip Code</label>
                        <Field
                          type="text"
                          name="zip"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Blood Group */}
                      <div className="form-group">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <Field
                          as="select"
                          name="bloodGroup"
                          className="form-select"
                        >
                          <option value="">Select...</option>
                          <option value="A+">A+</option>
                          <option value="B+">B+</option>
                          <option value="O+">O+</option>
                          <option value="AB+">AB+</option>
                        </Field>
                        <ErrorMessage
                          name="bloodGroup"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Terms */}
                      <div className="form-group form-check mt-3">
                        <Field
                          type="checkbox"
                          name="terms"
                          id="terms"
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="terms"
                        >
                          I agree to the{" "}
                          <a href="/terms.html">Terms and Conditions</a>
                        </label>
                        <ErrorMessage
                          name="terms"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mt-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                      </button>
                    </Form>
                  )}
                </Formik>

                {serverError && (
                  <div className="mt-3">
                    <p className="text-danger">{serverError}</p>
                  </div>
                )}

                <div className="auth-links mt-3">
                  <p>
                    Already have an account?{" "}
                    <a href="/patient-login">Login here</a>
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

export default PatientRegisterPage;