import { useEffect, useState } from "react";
import type { Doctor } from "../../types/Doctor";
import { DoctorService } from "../../services/DoctorService";
import NoResultsPage from "../../pages/NoResults";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getDoctors();
        if (response.data.statusCode === 200) {
          setDoctors(response.data.data);
        } else {
          setError(response?.message || "Failed to fetch doctors");
        }
      } catch (err: any) {
        setError(err?.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (error) return <NoResultsPage message={error} />;
  if (!loading && doctors.length === 0)
    return <NoResultsPage message="No doctors available" />;

  return (
    <>
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">All Doctors</h1>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="h-60 bg-gray-200" />
                  <div className="p-5 text-center space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                    <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <a href={`/doctors/${doctor.id}`}>
                    <img
                      src={`http://localhost:8080${doctor.user.imageUrl}`}
                      alt={doctor.user.fullName}
                      className="w-full h-60 object-cover"
                    />
                  </a>

                  <div className="p-5 text-center">
                    <h5 className="text-lg font-semibold text-gray-800">
                      {doctor.user.fullName}
                    </h5>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {doctor.biography}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {doctor.designation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorsPage;