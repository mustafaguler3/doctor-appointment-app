import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (search) params.append("name", search);
    if (location) params.append("city", location);
    if (department) params.append("departmentName", department);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
       
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Find Your Doctor
          </h2>
          <p className="text-gray-600 mb-6">
            Book appointments with the best doctors in your area.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Location</option>
              <option value="Istanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
              <option value="Bursa">Bursa</option>
            </select>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Surgery">Surgery</option>
              <option value="Neurodegenerative">Neurodegenerative</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i> Search Doctors
            </button>
          </form>
        </div>

        <div className="flex justify-center">
          <img
            src="/images/hero1.jpg"
            alt="Doctor"
            className="rounded-2xl shadow-lg w-full max-w-md lg:max-w-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;