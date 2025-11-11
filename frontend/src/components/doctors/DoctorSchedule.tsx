import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import type { Schedule, TimeSlot } from "../../types/Schedule";
import type { Doctor } from "../../types/Doctor";
import ScheduleService from "../../services/ScheduleService";
import AppointmentService from "../../services/AppointmentService";
import { toast } from "react-toastify";

interface DoctorScheduleProps {
  doctor: Doctor;
}

export default function DoctorSchedule({ doctor }: DoctorScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<string>();
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;
    ScheduleService.findSchedulesByDoctor(doctor.id, selectedDate)
      .then((res) => {
        const formattedSlots = res.data.data.map((slot: any) => ({
          id: slot.id,
          time: slot.time,
          available: slot.available,
        }));

        setSlots(formattedSlots);
      })
      .catch((err) => console.error(err));
  }, [selectedDate, doctor.id]);

  const handleSubmit = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    const selectedSchedule = doctor.schedules.find(
      (item) => item.date === selectedDate
    );
    try {
      const payload = {
        scheduleId: selectedSchedule.id,
        timeSlotId: selectedSlot.id,
        notes: "Appointment created from UI",
      };
      const response = await AppointmentService.createAppointment(payload);
      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        toast.success("Appointment created!");
        setSelectedSlot(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Select Date</h3>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "15px",
          overflowX: "auto",
        }}
      >
        {doctor.schedules?.filter(s => new Date(s.date) >= new Date()).map((s: Schedule) => (
          <Button
            key={s.id}
            variant={selectedDate === s.date ? "contained" : "outlined"}
            onClick={() => setSelectedDate(s.date)}
          >
            {new Date(s.date).toLocaleDateString("tr-TR", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </Button>
        ))}
      </div>

      {slots.length > 0 && (
        <>
          <h4>Available Time Slots</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {slots?.map((slot) => (
                <Button
                  key={slot.id}
                  variant={
                    selectedSlot?.id === slot.id ? "contained" : "outlined"
                  }
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedSlot && (
        <div style={{ marginTop: "10px" }}>
          <p>
            Selected: {selectedDate} {selectedSlot.time}
          </p>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Appointment"}
          </Button>
        </div>
      )}
    </div>
  );
}
