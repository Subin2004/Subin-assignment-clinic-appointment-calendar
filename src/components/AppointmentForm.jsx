import { useState, useEffect } from 'react';

const AppointmentForm = ({ 
  date, 
  appointment, 
  doctors, 
  patients, 
  onSave, 
  onCancel 
}) => {
  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    time: ''
  });

  useEffect(() => {
    if (appointment) {
      setForm({
        patient: appointment.patient,
        doctor: appointment.doctor,
        time: appointment.time
      });
    } else {
      setForm({
        patient: '',
        doctor: '',
        time: ''
      });
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      date,
      id: appointment?.id
    });
  };

  return (
    <div className="form-modal">
      <div className="appointment-form">
        <h2>{appointment ? 'Edit Appointment' : 'Add Appointment'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient:</label>
            <select
              value={form.patient}
              onChange={(e) => setForm({...form, patient: e.target.value})}
              required
            >
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Doctor:</label>
            <select
              value={form.doctor}
              onChange={(e) => setForm({...form, doctor: e.target.value})}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({...form, time: e.target.value})}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;