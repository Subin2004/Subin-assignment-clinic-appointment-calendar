import { useState, useEffect } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isSameMonth,
  addMonths,
  subMonths,
  getYear,
  setYear,
  setMonth
} from 'date-fns';
import DayView from './DayView';
import AppointmentForm from './AppointmentForm';
import ConfirmDialog from './ConfirmDialog';
import { doctors, patients, sampleAppointments } from '../data';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    setAppointments(stored ? JSON.parse(stored) : sampleAppointments);
  }, []);

  // Navigation functions
  const navigateMonth = (direction) => {
    setCurrentDate(direction === 'next' 
      ? addMonths(currentDate, 1) 
      : subMonths(currentDate, 1)
    );
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    if (!isNaN(newYear)) {
      setCurrentDate(setYear(new Date(currentDate), newYear));
    }
  };

  const handleMonthChange = (e) => {
    const monthIndex = e.target.selectedIndex;
    setCurrentDate(setMonth(new Date(currentDate), monthIndex));
  };

  // Existing appointment functions
  const saveAppointment = (appointment) => {
    let updatedAppointments;
    if (appointment.id) {
      updatedAppointments = appointments.map(a => 
        a.id === appointment.id ? appointment : a
      );
    } else {
      updatedAppointments = [
        ...appointments,
        { ...appointment, id: Date.now() }
      ];
    }
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setShowForm(false);
  };

  const handleDeleteClick = (id) => {
    setAppointmentToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    const updatedAppointments = appointments.filter(a => a.id !== appointmentToDelete);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setShowConfirmDialog(false);
  };

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="calendar-container">
      {/* Month Navigation Header */}
      <div className="calendar-header">
        <div className="desktop-navigation">
          <button 
            className="nav-button"
            onClick={() => navigateMonth('prev')}
          >
            &lt;
          </button>
          
          <div className="month-year-controls">
            <select
              value={format(currentDate, 'MMMM')}
              onChange={handleMonthChange}
              className="month-select"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={format(new Date(0, i), 'MMMM')}>
                  {format(new Date(0, i), 'MMMM')}
                </option>
              ))}
            </select>
            
            <input
              type="number"
              value={getYear(currentDate)}
              onChange={handleYearChange}
              min="2000"
              max="2100"
              className="year-input"
            />
          </div>
          
          <button 
            className="nav-button"
            onClick={() => navigateMonth('next')}
          >
            &gt;
          </button>
        </div>

        <div className="mobile-navigation">
          <button onClick={() => navigateMonth('prev')}>&lt; Prev</button>
          <span>{format(currentDate, 'MMMM yyyy')}</span>
          <button onClick={() => navigateMonth('next')}>Next &gt;</button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="month-view">
        <div className="days-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday-header">{day}</div>
          ))}
          
          {monthDays.map(day => (
            <div
              key={day.toString()}
              className={`day-cell ${!isSameMonth(day, currentDate) ? 'other-month' : ''}`}
              onClick={() => {
                setCurrentDate(day);
                setShowForm(true);
              }}
            >
              <div className="day-number">{format(day, 'd')}</div>
              <div className="appointments-container">
                {appointments
                  .filter(a => isSameDay(new Date(a.date), day))
                  .map(a => (
                    <div 
                      key={a.id} 
                      className="appointment-badge"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="appointment-content">
                        <span className="patient-short">{a.patient.split(' ')[0]}</span>
                        <span className="appointment-time">{a.time}</span>
                      </div>
                      <button 
                        className="delete-btn-small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(a.id);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other components remain the same */}
      <DayView
        date={currentDate}
        appointments={appointments.filter(a => 
          isSameDay(new Date(a.date), currentDate)
        )}
        onDateChange={setCurrentDate}
        onAddAppointment={() => {
          setSelectedAppointment(null);
          setShowForm(true);
        }}
        onEditAppointment={setSelectedAppointment}
        onDeleteAppointment={handleDeleteClick}
      />

      {showForm && (
        <AppointmentForm
          date={currentDate}
          appointment={selectedAppointment}
          doctors={doctors}
          patients={patients}
          onSave={saveAppointment}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this appointment?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );
};

export default CalendarView;