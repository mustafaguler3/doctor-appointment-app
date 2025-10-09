import ContactService from "../services/ContactService";
import { useState } from "react";
import NoResultsPage from "./NoResults";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [error, setError] = useState(null);

  const [contactMessage, setContactMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setContactMessage({
      ...contactMessage,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await ContactService.saveMessage(contactMessage);
      if (response.statusCode === 200) {
        toast.success(response.message);
        console.log("gönderildi", response.data);
        setContactMessage({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response.message);
        setError(response.message);
      }
    } catch (err) {
      toast.error(err?.message);
      setError(err?.message);
    }
  };

  if (error) return <NoResultsPage message={error} />;

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
        </div>
      </section>
      <section className="py-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5">
              <div className="contact-form-card">
                <h2 className="section-title mb-4">Send Us A Message</h2>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name *
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={contactMessage.firstName}
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={contactMessage.lastName}
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={contactMessage.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={contactMessage.phoneNumber}
                        onChange={handleChange}
                        name="phoneNumber"
                        placeholder="(555) ***-***"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <select
                      className="form-select"
                      id="subject"
                      name="subject"
                      value={contactMessage.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Schedule Appointment</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="emergency">Emergency</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      value={contactMessage.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Please describe your inquiry or concern..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="fas fa-paper-plane me-2"></i>Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="contact-info-card mb-4">
                <div className="info-header">
                  <i className="fas fa-hospital"></i>
                  <h4>Hospital Information</h4>
                </div>
                <div className="contact-info-content">
                  <div className="contact-info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <div>
                      <strong>Address</strong>
                      <p>
                        123 Medical Center Drive Healthcare City, HC 12345
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <strong>Phone</strong>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fas fa-ambulance"></i>
                    <div>
                      <strong>Emergency</strong>
                      <p>+1 (555) 911-0000</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <strong>Email</strong>
                      <p>info@healthpro.com appointments@healthpro.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
