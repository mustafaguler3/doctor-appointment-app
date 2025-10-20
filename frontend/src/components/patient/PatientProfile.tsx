import { useState } from "react";
import patientService from "../../services/PatientService";
import { toast } from "react-toastify";
import ErrorPage from "../../pages/ErrorPage";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState<File | null>(null);

  const { user,setUser } = useAuth();
  const navigate = useNavigate();

  const formData = new FormData();
  const [form, setForm] = useState({
    gender: "",
    zip: "",
    state: "",
    address: "",
    city: "",
    bloodGroup: "",
    imageFile: "",
    user: {
      fullName: "",
      phone: "",
      email: "",
      username: "",
      imageUrl: "",
    },
  });

  

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (!value) {
      newErrors[name] = "This field is required";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //setForm({ ...form, [name]: value });

    if (name.startsWith("user.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        user: {
          ...form.user,
          [key]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hasta bilgilerini tek tek ekle
  formData.append("gender", form.gender);
  formData.append("zip", form.zip);
  formData.append("state", form.state);
  formData.append("address", form.address);
  formData.append("city", form.city);
  formData.append("bloodGroup", form.bloodGroup);

  // User bilgilerini ekle (nested object için field name kullanıyoruz)
  formData.append("user.fullName", form.user.fullName);
  formData.append("user.phone", form.user.phone);
  formData.append("user.username", form.user.username);
  formData.append("user.email", form.user.email);
  formData.append("user.imageUrl", form.user.imageUrl);
  // Dosya varsa ekle
  if (file) {
    formData.append("imageFile", file);
  }
    try {
      const response = await patientService.update(formData);
      if (response.data.statusCode === 200) {
        console.log("Response :", response.data)
        setUser({
          ...user,
          imageUrl: response.data.user?.imageUrl 
        })
        toast.success("Updated successfully");
        navigate("/patient/profile");
        setErrors({});
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        toast.error(err.message);
        setError(err.message);
      }
    }
  };

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <div className="profile-header mb-4">
        <h2>Update Profile</h2>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="dashboard-card">
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Patient ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="patientID"
                      name=""
                      value="P001234"
                      disabled
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["user.fullName"] ? "is-invalid" : ""
                      }`}
                      id="fullName"
                      name="user.fullName"
                      onBlur={handleBlur}
                      value={form.user.fullName}
                      onChange={handleOnChange}
                      placeholder="Enter your name"
                      required
                    />
                    <div className="invalid-feedback">
                      {errors["user.fullName"]}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["user.email"] ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={form.user.email}
                      placeholder={user?.email}
                      onBlur={handleBlur}
                      disabled
                    />
                    <div className="invalid-feedback">
                      {errors["user.email"]}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="imageFile" className="form-label">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="imageFile"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["user.phone"] ? "is-invalid" : ""
                      }`}
                      id="phone"
                      name="user.phone"
                      onBlur={handleBlur}
                      value={form.user.phone}
                      onChange={handleOnChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                    <div className="invalid-feedback">
                      {errors["user.phone"]}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender *
                    </label>
                    <select
                      className={`form-select ${
                        errors["gender"] ? "is-invalid" : ""
                      }`}
                      id="gender"
                      name="gender"
                      value={form.gender}
                      onBlur={handleBlur}
                      onChange={handleOnChange}
                      required
                    >
                      <div className="invalid-feedback">{errors["gender"]}</div>
                      <option value="">Select Gender</option>
                      <option value="male" selected>
                        Male
                      </option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="bloodGroup" className="form-label">
                      Blood Group *
                    </label>
                    <select
                      className={`form-select ${
                        errors["bloodGroup"] ? "is-invalid" : ""
                      }`}
                      id="bloodGroup"
                      name="bloodGroup"
                      onBlur={handleBlur}
                      value={form.bloodGroup}
                      onChange={handleOnChange}
                      required
                    >
                      <div className="invalid-feedback">
                        {errors["bloodGroup"]}
                      </div>
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["address"] ? "is-invalid" : ""
                      }`}
                      id="address"
                      name="address"
                      onBlur={handleBlur}
                      value={form.address}
                      onChange={handleOnChange}
                      placeholder={user?.patient?.address}
                    />
                    <div className="invalid-feedback">{errors["address"]}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["city"] ? "is-invalid" : ""
                      }`}
                      id="city"
                      name="city"
                      onBlur={handleBlur}
                      value={form.city}
                      onChange={handleOnChange}
                      placeholder={user?.patient?.city}
                    />
                    <div className="invalid-feedback">{errors["city"]}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["state"] ? "is-invalid" : ""
                      }`}
                      id="state"
                      name="state"
                      onBlur={handleBlur}
                      value={form.state}
                      onChange={handleOnChange}
                      placeholder={user?.patient?.state}
                    />
                    <div className="invalid-feedback">{errors["state"]}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="zipCode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["zip"] ? "is-invalid" : ""
                      }`}
                      id="zipCode"
                      name="zip"
                      value={form.zip}
                      onBlur={handleBlur}
                      onChange={handleOnChange}
                      placeholder={user?.patient?.zip}
                    />
                    <div className="invalid-feedback">{errors["zip"]}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors["user.username"] ? "is-invalid" : ""
                      }`}
                      id="username"
                      name="user.username"
                      value={form.user.username}
                      onBlur={handleBlur}
                      onChange={handleOnChange}
                      required
                    />
                    <div className="invalid-feedback">{errors["username"]}</div>
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
export default PatientProfile;
