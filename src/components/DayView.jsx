import { format, addDays, subDays } from 'date-fns';

const DayView = ({ 
  date, 
  appointments, 
  onDateChange, 
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment
}) => {
  const handleDateChange = (e) => {
    onDateChange(new Date(e.target.value));
  };

  return (
    <div className="day-view">
      <div className="day-navigation">
        <button onClick={() => onDateChange(subDays(date, 1))}>←</button>
        <input
          type="date"
          value={format(date, 'yyyy-MM-dd')}
          onChange={handleDateChange}
        />
        <button onClick={() => onDateChange(addDays(date, 1))}>→</button>
      </div>
      <button className="add-appointment-btn" onClick={onAddAppointment}>
        + Add Appointment
      </button>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map(appt => (
            <div key={appt.id} className="appointment-item">
              <div 
                className="appointment-details"
                onClick={() => onEditAppointment(appt)}
              >
                <div>
                  <strong>{appt.patient}</strong> with {appt.doctor}
                </div>
                <div>Time: {appt.time}</div>
              </div>
              <button 
                className="delete-btn"
                onClick={() => onDeleteAppointment(appt.id)}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p>No appointments scheduled for this day.</p>
        )}
      </div>
    </div>
  );
};

export default DayView;