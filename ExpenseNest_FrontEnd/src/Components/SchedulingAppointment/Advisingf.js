import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Calendar, User, DollarSign, FileText, UserCheck, Check, Mail } from 'lucide-react';
import './Advisingf.css';
import Sidebar from '../Sidebar.js';
import AppointmentHistory from './Advhistory.js';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState(null);
  // const [appointments, setAppointments] = useState([]);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    date: '',
    time: '',
    consultationType: '',
    incomeRange: '',
    investmentRange: '',
    goals: '',
    selectedAdvisor: '',
  });

  // useEffect(() => {
  //   getAllAdvisors();
  //   });

  const getAllAdvisors = () => {
    // setLoading(true);
    fetch('http://localhost:8080/getAllAdvisors').
    then(response => response.json()).
    then(
        data => {setAdvisors(data);
        // setLoading(false);
    })
    .catch(error => {
        console.log(error);
        // setLoading(false);
    });
    console.log(advisors);

    fetch(`http://localhost:8080/getAllAppointments`).
      then(response => response.json()).
      then(data => setAppointments(data));
}

const getAvailableDates = (advisorId) => {
  fetch(`http://localhost:8080/${advisorId}/getAllAvailability`)
    .then(response => response.json())
    .then(data => {
      setAvailableDates(data); 
    })
    .catch(error => {
      console.log(error);
    });
};

  useEffect(() => {

getAllAdvisors(); 
  }, []);


const fetchSlotsForAvailability = (availabilityId) => {
  fetch(`http://localhost:8080/${availabilityId}/getAllSlots`)
    .then(response => response.json())
    .then(data => {
      setSlots(data); 
    })
    .catch(error => {
      console.error('Error fetching slots:', error);
    });
};

  // const advisors = [
  //   {
  //     id: '1',
  //     name: 'Sarah Thomson',
  //     specialization: 'Financial Health Checkup',
  //     experience: '15+ years',
  //     certifications: 'CFP, CFA',
      
  //   },
  //   {
  //     id: '2',
  //     name: 'Raghava ',
  //     specialization: 'Debt Management',
  //     experience: '12+ years',
  //     certifications: 'CFP, ChFC',
      
  //   },
  //   {
  //     id: '3',
  //     name: 'Lisa Thomas',
  //     specialization: 'Saving Stratergies',
  //     experience: '10+ years',
  //     certifications: 'CFP, CIMA',
      
  //   }
  // ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const consultationTypes = [
    'Financial Health Checkup',
    'Asset Planning',
    'Debt management',
    'Budgeting Advice',
    'Saving stratergies'
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // const selectedAdvisor = advisors.find(a => a.id === formData.selectedAdvisor);
    console.log(selectedAdvisor);
    console.log(selectedSlotId);
    
    // Create new appointment
    const newAppointment = {
      // appointmentId: Math.floor(Math.random() * 10000), // Just a placeholder for frontend; backend may generate this ID
      advisorName: selectedAdvisor?.name || '',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      slot: formData.time,
      type: formData.consultationType,
      incomeRange: formData.incomeRange,
      savingsRange: formData.investmentRange,
      goals: formData.goals,
    };

    console.log(newAppointment);
  
    
    fetch(`http://localhost:8080/${selectedSlotId}/createAppointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    })
      // .then(response => {
      //   if (response.ok) {
      //     return response.json();
      //   }
      //   // throw new Error('Failed to save appointment');
      // })
      .then(data => {
        // Add the saved appointment to the state
        // setAppointments(newAppointment);
        setStep(6); // Move to the confirmation step
        console.log('Appointment saved successfully:', data);
      })
      .catch(error => {
        console.error('Error saving appointment:', error);
        // alert('Failed to save the appointment. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });

  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("updating:",name,value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleAdvisorSelect = (advisorId) => {
    setFormData(prev => ({
      ...prev,
      selectedAdvisor: advisorId
    }));
    getAvailableDates(advisorId);
  };



//progress tracking bar (1,2,3,4,5)
  const ProgressBar = React.memo(() => (
    <div className="progress-bar">
      {[1, 2, 3,4, 5].map((num) => (
        <div key={num} className="progress-step">
          <button
            className={`step-button ${step >= num ? 'active' : ''}`}
            onClick={() => step > num && setStep(num)}
            disabled={step < num}
          >
            {num}
          </button>
          {num < 5 && (
            <div className="step-line-container">
              <div className={`step-line ${step > num ? 'active' : ''}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  ));

  const FormInput = React.memo(({ label, type = "text", name, value, options = [] }) => (
    <div className="form-group">
      <label>{label}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={handleChange}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          rows="4"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
    </div>
  ));

  const renderStep = () => {
    if (step === 6) {
      return (
        <div className="step-content">
          <div className="confirmation-message">
            <div className="confirmation-icon">
              <Check size={48} className="text-green-500" />
            </div>
            <h2>Booking Confirmed!</h2>
            <div className="confirmation-details">
              <h3>Appointment Details</h3>
              <div className="confirmation-grid">
                <div className="confirmation-item">
                  <p className="confirmation-label">Advisor</p>
                  <p>{advisors.find(a => a.id === formData.selectedAdvisor)?.name}</p>
                </div>
                <div className="confirmation-item">
                  <p className="confirmation-label">Date & Time</p>
                  <p>{formatDate(formData.date)} at {formData.time}</p>
                </div>
                <div className="confirmation-item">
                  <p className="confirmation-label">Consultation Type</p>
                  <p>{formData.consultationType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <UserCheck className="step-icon" />
              <h2>Select Your Advisor</h2>
            </div>
            <div className="advisors-grid">
              {advisors.map((advisor) => (
                <div 
                  key={advisor.advisorId}
                  className={`advisor-card ${formData.selectedAdvisor === advisor.advisorId ? 'selected' : ''}`}
                  onClick={() => { 
                    setSelectedAdvisor(advisor);
                    handleAdvisorSelect(advisor.advisorId)}}
                >
                  <h3>{advisor.name}</h3>
                  <div className="advisor-details">
                    <p><strong>Specialization:</strong> {advisor.specialization}</p>
                    <p><strong>Experience:</strong> {advisor.experience}</p>
                    <p><strong>Qualification:</strong> {advisor.qualification}</p>
                    {/* <p><strong>Availability:</strong> {advisor.availability}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <User className="step-icon" />
              <h2>Personal Information</h2>
            </div>
            <div className="two-columns">
              <FormInput label="First Name" name="firstName"  value={formData.firstName} type="text" />
              <FormInput label="Last Name" name="lastName" value={formData.lastName} />
            </div>
            <FormInput label="Email" type="text" name="email" value={formData.email} />
            <FormInput label="Phone" type="tel" name="phone" value={formData.phone} />
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <Calendar className="step-icon" />
              <h2>Schedule Appointment</h2>
            </div>
            <FormInput label="Preferred Date" type="date" name="date" value={formData.date} />
            <div className="calendar-container">
              <ReactCalendar
                onChange={(date) => {
                  const dateStr = date.toISOString().split('T')[0];
                  handleChange({ target: { name: 'date', value: dateStr } });
                  
                  // Find the selected availability ID for the chosen date
                  const availability = availableDates.find(avail => avail.date === dateStr);
                  
                  if (availability) {
                    setSelectedAvailabilityId(availability.availabilityIdid); // Set the availability ID
                    fetchSlotsForAvailability(availability.availabilityId); // Fetch slots for the selected availability ID
                  } else {
                    setSlots([]); // Clear slots if no availability matches
                  }
                  console.log(slots);
                }}
                tileClassName={({ date }) => {
                  const dateStr = date.toISOString().split('T')[0];
                  return availableDates.some(avail => avail.date === dateStr) ? 'highlight' : null;
                }}
              />
            </div>
             <div className="slots-container">
              <h3>Available Slots for {selectedAvailabilityId ? `Availability ID: ${selectedAvailabilityId}` : 'the selected date'}</h3>
              {slots.length > 0 ? (
                <ul className="slots-list">
                  {slots.map(slot => (
                    <li
                      key={slot.id}
                      className={`slot-item ${slot.isBooked ? 'booked' : ''}`}
                      onClick={() => {
                        setSelectedSlotId(slot.slotId);
                        handleChange({ target: { name: 'time', value: slot.startTime } })}}
                    >
                      {slot.startTime} {slot.isBooked ? '(Booked)' : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
              
                <p>No slots available for this date.</p>
                </div>
              )}
            </div> 

            

            
            

            <FormInput 
              label="Consultation Type" 
              type="select" 
              name="consultationType" 
              value={formData.consultationType}
              options={consultationTypes}
            />
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <DollarSign className="step-icon" />
              <h2>Financial Information</h2>
            </div>
            <FormInput 
              label="Annual Income Range" 
              type="select" 
              name="incomeRange" 
              value={formData.incomeRange}
              options={['$0 - $50,000', '$50,000 - $100,000', '$100,000 - $250,000', '$250,000+']}
            />
            <FormInput 
              label="Current Savings and Investments" 
              type="select" 
              name="investmentRange" 
              value={formData.investmentRange}
              options={['No investments', '$0 - $50,000', '$50,000 - $250,000', '$250,000+']}
            />
            <FormInput 
              label="Financial Goals" 
              type="textarea" 
              name="goals" 
              value={formData.goals}
            />
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <FileText className="step-icon" />
              <h2>Review & Confirm</h2>
            </div>
            <div className="review-section">
              <div className="review-block">
                <h3>Selected Advisor</h3>
                <div className="review-grid">
                  <div className="review-item">
                    <p>Advisor</p>
                    <p>{advisors.find(a => a.advisorId === formData.selectedAdvisor)?.name}</p>
                  </div>
                </div>
              </div>

              <div className="review-block">
                <h3>Personal Details</h3>
                <div className="review-grid">
                  <div className="review-item">
                    <p>Name</p>
                    <p>{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div className="review-item">
                    <p>Email</p>
                    <p>{formData.email}</p>
                  </div>
                  <div className="review-item">
                    <p>Phone</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>
              </div>

              <div className="review-block">
                <h3>Appointment Details</h3>
                <div className="review-grid">
                  <div className="review-item">
                    <p>Date</p>
                    <p>{formatDate(formData.date)}</p>
                  </div>
                  <div className="review-item">
                    <p>Time</p>
                    <p>{formData.time}</p>
                  </div>
                  <div className="review-item">
                    <p>Consultation Type</p>
                    <p>{formData.consultationType}</p>
                  </div>
                </div>
              </div>

              <div className="review-block">
                <h3>Financial Details</h3>
                <div className="review-grid">
                  <div className="review-item">
                    <p>Income Range</p>
                    <p>{formData.incomeRange}</p>
                  </div>
                  <div className="review-item">
                    <p>Investment Range</p>
                    <p>{formData.investmentRange}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '80px', width: 'calc(100% - 80px)' }}>
        <div className="wizard-container">
          <div className="wizard-content">
            {/* {step <= 5 && <ProgressBar />} */}
            <form onSubmit={(e) => e.preventDefault()}>
              {renderStep()}
              <div className="button-group">
                {step > 1 && step < 6 && (
                  <button type="button" className="back-button" onClick={prevStep}>
                    <ArrowLeft />
                    Back
                  </button>
                )}
                {step < 6 && (
                  <button
                    type="button"
                    className={`next-button ${step === 5 ? 'submit' : ''}`}
                    onClick={step === 5 ? handleSubmit : nextStep}
                    disabled={isSubmitting}
                  >
                    {step === 5 ? (
                      isSubmitting ? 'Confirming...' : 'Confirm Booking'
                    ) : (
                      <>
                        Next
                        <ArrowRight />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <AppointmentHistory appointments={appointments} />
    </div>
  );
};

export default BookingWizard;