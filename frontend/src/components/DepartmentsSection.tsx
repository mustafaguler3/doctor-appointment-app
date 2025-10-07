import { useEffect, useState } from "react";
import type { Department } from "../types/Department";
import DepartmentService from "../services/DepartmentService";

const DepartmentsSection = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await DepartmentService.findAllDepartments();

        if (response.statusCode === 200) {
          setDepartments(response.data);
        }
      } catch (err) {
        setError(err?.message);
      }
    };

    fetchDepartments();
  }, []);

  if (error) {
    return <h1 className="alert alert-danger">{error}</h1>;
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center section-title">Our Departments</h2>
        <div className="row">
          {departments.map((department) => (
            <div className="col-lg-3 col-md-6">
              <div className="department-card">
                <i
                  className="fas fa-heartbeat"
                  style={{ fontSize: "3rem", marginBottom: "20px" }}
                ></i>
                <h4>
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {department.name}
                  </a>
                </h4>
                <p>{department.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <a href="departments.html" className="btn btn-success btn-lg">
            View All Departments <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
