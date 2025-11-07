import { useEffect, useState } from "react";
import type { Department } from "../types/Department";
import DepartmentService from "../services/DepartmentService";

const DepartmentsSection = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await DepartmentService.findAllDepartments();
        if (response.data.statusCode === 200) {
          setDepartments(response.data.data);
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Our Departments
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md animate-pulse p-6 text-center"
              >
                <div className="mx-auto bg-gray-200 h-12 w-12 rounded-full mb-4" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-3" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {departments.map((department) => (
                <div
                  key={department.id}
                  className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
                >
                  <i className="fas fa-heartbeat text-green-600 text-4xl mb-4"></i>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    <a
                      href="#"
                      className="hover:text-green-600 transition"
                    >
                      {department.name}
                    </a>
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {department.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="/departments"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-3 transition"
              >
                View All Departments <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DepartmentsSection;