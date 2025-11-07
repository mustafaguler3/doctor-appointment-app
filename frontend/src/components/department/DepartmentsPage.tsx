import { useEffect, useState } from "react";
import type { Department } from "../../types/Department";
import DepartmentService from "../../services/DepartmentService";
import NoResultsPage from "../../pages/NoResults";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await DepartmentService.findAllDepartments();
        if (response.data.statusCode === 200) {
          setDepartments(response.data.data);
        } else {
          setError(response.message || "Failed to fetch departments");
        }
      } catch (err: any) {
        setError(err?.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (error) return <NoResultsPage message={error} />;
  if (!loading && departments.length === 0)
    return <NoResultsPage message="No departments available" />;

  return (
    <>
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">All Departments</h1>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-md text-center"
                >
                  <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {departments.map((department) => (
                <div
                  key={department.id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg text-center transition"
                >
                  <i
                    className={`fas ${department.icon} text-green-600 text-4xl mb-4`}
                  ></i>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {department.name}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {department.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DepartmentsPage;