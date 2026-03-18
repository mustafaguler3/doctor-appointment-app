import { useState } from "react";

const PatientMakeAppointment = () => {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    scheduleId: "",
    notes: "",
    timeSlotId: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Data:", formData);
  }

  return (
    <>
      <div className="profile-header mb-4">
        <h2>Make Appointment</h2>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="dashboard-card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="" className="form-label">
                      Select Department
                    </label>
                    <select name="" className="form-select">
                      <option value="">Select Department</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Orthopedics</option>
                      <option>Pediatrics</option>
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="" className="form-label">
                      Select Doctor
                    </label>
                    <select name="" className="form-select">
                      <option>Select Doctor</option>
                      <option>Dr. John Smith</option>
                      <option>Dr. George Steven</option>
                      <option>Dr. Michael Williams</option>
                      <option>Dr. Rex Davis</option>
                    </select>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="" className="form-label">
                      Select Date
                    </label>
                    <input
                      id="date"
                      type="text"
                      name=""
                      onChange={handleChange}
                      className="form-control"
                      value="2025-01-01"
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="" className="form-label">
                      Select Schedule
                    </label>
                    <input
                      type="text"
                      name=""
                      className="form-control"
                      value="10:00 AM to 11:00 PM"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientMakeAppointment;
