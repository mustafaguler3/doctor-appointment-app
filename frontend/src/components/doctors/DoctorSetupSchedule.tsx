import { useState } from "react";
import ScheduleService from "../../services/ScheduleService";
import { toast } from "react-toastify";

const DoctorSetupSchedule = () => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    doctorId:"", 
    maxPatients: "",
    startTime: "",
    endTime: "",
    date: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ScheduleService.createSchedule(form);
      if (response.data.statusCode === 201) {
        toast.success("Doctor schedule created successfully");
        setForm(response.data.data)
        console.log("Response: ", response.data.data);
      }
    } catch (err) {
      toast.error(err.message);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Setup Schedule
        </h2>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" disabled value={form.doctorId}/>
            {error && <p className="text-red-600 text-sm">{error.substring(0,5)}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  onChange={handleOnChange}
                  value={form.date}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Capacity */}
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Capacity
                </label>
                <input
                  id="capacity"
                  type="number"
                  name="maxPatients"
                  min="1"
                  onChange={handleOnChange}
                  value={form.maxPatients}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Start Time */}
              <div>
                <label
                  htmlFor="starttime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Start Time
                </label>
                <input
                  id="starttime"
                  type="time"
                  name="startTime"
                  onChange={handleOnChange}
                  value={form.startTime}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* End Time */}
              <div>
                <label
                  htmlFor="endtime"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select End Time
                </label>
                <input
                  id="endtime"
                  type="time"
                  name="endTime"
                  onChange={handleOnChange}
                  value={form.endTime}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorSetupSchedule;
