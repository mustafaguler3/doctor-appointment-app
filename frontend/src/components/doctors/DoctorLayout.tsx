import { Outlet } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";

const DoctorLayout = () => {
    return (
        <section className="py-5">
        <div className="container">
          <div className="row">
            <DoctorSidebar />
            <div className="col-lg-9">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    )
}

export default DoctorLayout;

