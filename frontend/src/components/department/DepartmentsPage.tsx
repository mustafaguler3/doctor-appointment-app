import { useEffect, useState } from "react";
import type { Department } from "../../types/Department";
import DepartmentService from "../../services/DepartmentService";
import NoResultsPage from "../../pages/NoResults";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
        try {
            const response = await DepartmentService.findAllDepartments();
            if (response.statusCode === 200) {
                setDepartments(response.data)
            }else {
                setError(response.message)
            }
        }catch(err) {
            setError(err?.message)
        }
    }
    fetchDepartments()

  },[])

  if (error) return <NoResultsPage message={error}/>

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>All Departments</h1>
        </div>
      </section>

      <section className="py-2">
        <div className="container">
          <div className="row">
            {departments.map((department) => (
                <div className="col-lg-3 col-md-6 mb-4">
              <div className="department-card">
                <i
                  className={`fas ${department.icon}`}
                  style={{ fontSize: "3rem", marginBottom: "20px" }}
                ></i>
                <h4>
                  <a
                    href=""
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {department.name}
                  </a>
                </h4>
                <p>
                  {department.description}
                </p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DepartmentsPage;
