import React from 'react';
import { Calendar, Clock, UserCheck } from 'lucide-react';

const AppointmentHistory = ({ appointments = [] }) => {
  return (
    <div className="appointment-history">
      <div className="appointment-history-header">
        <h2>Your Appointments</h2>
      </div>
      


      <div className="appointment-history-content">
        {appointments.length === 0 ? (
          <div className="appointment-history-empty">
            <p>No appointments yet</p>
          </div>
        ) : (
          appointments.map((appointment, index) => (
            <div key={index} className="appointment-card">
              <div className="appointment-advisor">
                
                <UserCheck className="appointment-advisor-icon" />
                <span className="appointment-advisor-name">{appointment.advisorName}</span>
              </div>
              


              <div className="appointment-detail">
                <Calendar className="appointment-detail-icon" />
                <span className="appointment-detail-text">{appointment.date}</span>
              </div>



              <div className="appointment-detail">
                <Clock className="appointment-detail-icon" />
                <span className="appointment-detail-text">{appointment.slot}</span>
              </div>
              


              <div className="appointment-type">
                {appointment.type}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;