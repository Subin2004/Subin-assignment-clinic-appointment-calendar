export const doctors = [
  { id: 1, name: 'Dr. Smith' },
  { id: 2, name: 'Dr. Johnson' }
];

export const patients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];

export const sampleAppointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    time: "09:00",
    date: new Date(2025, 6, 12).toISOString()
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Johnson",
    time: "14:30",
    date: new Date(2025, 6, 12).toISOString()
  }
];