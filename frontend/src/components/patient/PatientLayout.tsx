import { Outlet } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";

const PatientLayout = () => {
  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <PatientSidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default PatientLayout;
