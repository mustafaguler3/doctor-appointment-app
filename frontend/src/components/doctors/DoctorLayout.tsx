import { Outlet } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";

const DoctorLayout = () => {
  return (
    <section className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 w-full">
          <DoctorSidebar />
        </div>
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DoctorLayout;