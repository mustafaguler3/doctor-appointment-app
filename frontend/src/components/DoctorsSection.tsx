import { useEffect, useState } from "react";
import type { Doctor } from "../types/Doctor";
import { DoctorService } from "../services/DoctorService";
import NoResultsPage from "../pages/NoResults";

const DoctorsSection = () => {
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
          setError(response.message || "Unexpected error");
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (error) return <NoResultsPage message={error} />;

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Our Doctors
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden"
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
          <>
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
                      <a
                        href={`/doctors/${doctor.id}`}
                        className="hover:text-green-600 transition"
                      >
                        {doctor.user.fullName}
                      </a>
                    </h5>

                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {doctor.biography}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">MBBS, FCPS, FRCS</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="/doctors"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-3 transition"
              >
                View All Doctors <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;