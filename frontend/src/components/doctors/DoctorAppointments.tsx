import { useEffect, useState } from "react";
import type { DoctorAppointment } from "../../types/DoctorAppointment";
import AppointmentService from "../../services/AppointmentService";

const DoctorAppointments = () => {
  const [doctorAppointments,setDoctorAppointments] = useState<DoctorAppointment[]>([])
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
        try {
            const response = await AppointmentService.getAppointmentsByDoctor();
            if (response.data.statusCode === 200) {
                setDoctorAppointments(response.data.data)
            }else {
                setError(response.data.message || "can not fetch doctor appointments")
            }
        }catch(err) {
            setError(err?.response.data.message)
        }
    }

    fetchDoctorAppointments()
  },[])

  return (
    <>
      <div className="profile-header mb-4">
        <h2>All Appointments</h2>
      </div>
      <div className="row">
        {error ? <h1 className="text-danger">{error}</h1> : ""}
        <div className="col-lg-12">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered dtable">
                <thead>
                  <tr>
                    <th>Patient No</th>
                    <th>Patient Name</th>
                    <th>Department Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorAppointments.map((doctorAppointment) => (
                    <tr key={doctorAppointment.id}>
                    <td>{doctorAppointment.patientNo}</td>
                    <td>{doctorAppointment.patientName}</td>
                    <td>{doctorAppointment.departmentName}</td>
                    <td>{doctorAppointment.appointmentDate}</td>
                    <td>
                        {doctorAppointment.appointmentTime}
                    </td>
                    <td>{doctorAppointment.notes}</td>
                    <td>
                      <span className={`badge ${
                        doctorAppointment.status === 
                        "COMPLETED" 
                        ? 
                        "bg-success" 
                        : 
                        doctorAppointment.status === "PENDING" 
                        ? 
                         "bg-primary" : "bg-danger"}`}>
                            {doctorAppointment.status}</span>
                    </td>
                    <td>
                      <a
                        href={`/doctor/appointment-all/${doctorAppointment.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorAppointments;
