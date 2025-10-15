import { Outlet } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";

const PatientLayout = () => {
  return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <PatientSidebar />
            <div className="col-lg-9">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
  );
};

export default PatientLayout;
