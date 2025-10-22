import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import type { TimeSlot } from "../../types/Schedule";
import type { Doctor } from "../../types/Doctor";
import AppointmentService from "../../services/AppointmentService";
import { toast } from "react-toastify";

const generateTimeSlots = (start: string, end: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const time = new Date(`1970-01-01T${start}`);
  const endTime = new Date(`1970-01-01T${end}`);

  while (time < endTime) {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    slots.push({ time: `${hours}:${minutes}`, available: true });
    time.setMinutes(time.getMinutes() + 10);
  }

  return slots;
};

export default function DoctorSchedule({ doctor }: { doctor: Doctor }) {

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedDay = doctor.schedules.find((s) => s.date === selectedDate);
  const scheduleId = doctor.schedules.find((i) => i.id === doctor.id);

  const data = {
    doctor: { id: doctor.id },
    schedule: { id: scheduleId.id },
    notes: "Appointment try",
  };
  console.log("sechedule ID ",scheduleId)

  const timeSlots: TimeSlot[] = selectedDay
    ? generateTimeSlots(selectedDay.startTime, selectedDay.endTime)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AppointmentService.createAppointment(data);
      if (response.data.statusCode === 200) {
        toast.success("Appointment created successfully")
      } else {
        console.log("error ", response.data.message);
      }
    } catch (err) {
      console.log("tr error", err?.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Create Appointment
        </Typography>

        <Typography align="center" color="text.secondary" gutterBottom>
          Doctor:{" "}
          <strong style={{ color: "#1976d2" }}>{doctor.user.fullName}</strong>
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          {doctor.specialization} / {doctor.biography}
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          📅 Select Date
        </Typography>
        <ToggleButtonGroup
          value={selectedDate}
          exclusive
          onChange={(_, newDate) => {
            setSelectedDate(newDate);
            setSelectedTime(null);
          }}
          fullWidth
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          {doctor.schedules.map((s) => (
            <ToggleButton
              key={s.id}
              value={s.date}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                flex: "1 1 30%",
              }}
            >
              {new Date(s.date).toLocaleDateString("tr-TR", {
                weekday: "short",
                day: "2-digit",
                month: "2-digit",
              })}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {timeSlots.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle2" gutterBottom>
              ⏰ Available hours
            </Typography>
            <Grid container spacing={1}>
              {timeSlots.map((slot, i) => (
                <Grid item xs={4} key={i} component={"div" as any}>
                  <Button
                    variant={
                      selectedTime === slot.time ? "contained" : "outlined"
                    }
                    color="primary"
                    disabled={!slot.available}
                    fullWidth
                    onClick={() => setSelectedTime(slot.time)}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                  >
                    {slot.time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {(selectedDate || selectedTime) && (
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#f8f9fa",
              p: 2,
              mt: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" gutterBottom>
              📅 Date:{" "}
              <strong>
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("tr-TR")
                  : "-"}
              </strong>
            </Typography>
            <Typography variant="body2">
              ⏰ Hour: <strong>{selectedTime || "-"}</strong>
            </Typography>
          </Paper>
        )}

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 3, py: 1.3, borderRadius: 2, textTransform: "none" }}
          startIcon={<CheckCircleOutlineIcon />}
          disabled={!selectedDate || !selectedTime}
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
}
