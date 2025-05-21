import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Check, X, RefreshCw, Bell, Search, UserPlus } from 'lucide-react';

// Mock data for calendar
const calendarEvents = [
  { id: 1, day: 'Mon 1', time: '9:00 AM', patient: 'James Williams', doctor: 'Dr. Wilson' },
  { id: 2, day: 'Mon 1', time: '10:00 AM', patient: 'Sarah Johnson', doctor: 'Dr. Parker' },
  { id: 3, day: 'Mon 1', time: '11:30 AM', patient: 'John Davis', doctor: 'Dr. Williams' },
  { id: 4, day: 'Mon 1', time: '1:00 PM', patient: 'Emily Davis', doctor: 'Dr. Williams' },
  { id: 5, day: 'Mon 1', time: '2:30 PM', patient: 'Robert Lee', doctor: 'Dr. Wilson' },
  
  { id: 6, day: 'Tue 2', time: '9:00 AM', patient: 'Sarah Johnson', doctor: 'Dr. Parker' },
  { id: 7, day: 'Tue 2', time: '10:30 AM', patient: 'Thomas Johnson', doctor: 'Dr. Wilson' },
  { id: 8, day: 'Tue 2', time: '11:30 AM', patient: 'Jane Wong', doctor: 'Dr. Miller' },
  { id: 9, day: 'Tue 2', time: '1:00 PM', patient: 'Robert Lee', doctor: 'Dr. Wilson' },
  
  { id: 10, day: 'Wed 3', time: '9:00 AM', patient: 'Thomas Johnson', doctor: 'Dr. Wilson' },
  { id: 11, day: 'Wed 3', time: '10:30 AM', patient: 'Jennifer Garcia', doctor: 'Dr. Miller' },
  { id: 12, day: 'Wed 3', time: '12:00 PM', patient: 'David Miller', doctor: 'Dr. Wilson' },
  { id: 13, day: 'Wed 3', time: '1:30 PM', patient: 'Lisa Wong', doctor: 'Dr. Williams' },
  
  { id: 14, day: 'Thu 4', time: '9:00 AM', patient: 'Jennifer Garcia', doctor: 'Dr. Miller' },
  { id: 15, day: 'Thu 4', time: '11:00 AM', patient: 'John Anderson', doctor: 'Dr. Williams' },
  { id: 16, day: 'Thu 4', time: '1:00 PM', patient: 'James Wilson', doctor: 'Dr. Parker' },
  { id: 17, day: 'Thu 4', time: '3:00 PM', patient: 'Lisa Wong', doctor: 'Dr. Williams' },
  
  { id: 18, day: 'Fri 5', time: '9:00 AM', patient: 'Elizabeth Parker', doctor: 'Dr. Parker' },
  { id: 19, day: 'Fri 5', time: '10:30 AM', patient: 'Daniel Rodriguez', doctor: 'Dr. Wilson' },
  { id: 20, day: 'Fri 5', time: '12:00 PM', patient: 'James Wilson', doctor: 'Dr. Parker' },
  { id: 21, day: 'Fri 5', time: '1:30 PM', patient: 'Jennifer Garcia', doctor: 'Dr. Miller' },
  
  { id: 22, day: 'Sat 6', time: '9:00 AM', patient: 'Weekend - Closed', doctor: '' },
  { id: 23, day: 'Sun 7', time: '9:00 AM', patient: 'Weekend - Closed', doctor: '' },
];

// Mock data for notifications
const notificationData = [
  { id: 1, patient: 'John Smith', type: 'Appointment Reminder', date: 'May 2, 2023', time: '9:00 AM', status: 'Sent' },
  { id: 2, patient: 'Emily Chen', type: 'Appointment Reminder', date: 'May 2, 2023', time: '10:00 AM', status: 'Sent' },
  { id: 3, patient: 'Sarah Johnson', type: 'Appointment Reminder', date: 'May 3, 2023', time: '10:00 AM', status: 'Sent' },
  { id: 4, patient: 'Robert Lee', type: 'Appointment Reminder', date: 'May 3, 2023', time: '11:00 AM', status: 'Sent' },
  { id: 5, patient: 'Lisa Wong', type: 'Appointment Reminder', date: 'May 3, 2023', time: '2:30 PM', status: 'Sent' },
];

const ReceptionistDashboard: React.FC = () => {
  const days = ['Mon 1', 'Tue 2', 'Wed 3', 'Thu 4', 'Fri 5', 'Sat 6', 'Sun 7'];
  const [currentView, setCurrentView] = useState<'form' | 'calendar' | 'notifications'>('form');
  
  // Form state
  const [patientForm, setPatientForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    insurance: '',
    insuranceId: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientForm({
      ...patientForm,
      [name]: value
    });
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to the server
    alert('Patient registration form submitted!');
    // Clear the form
    setPatientForm({
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      phone: '',
      email: '',
      insurance: '',
      insuranceId: ''
    });
  };
  
  const renderRegistrationForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Patient Registration Form</h2>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 border border-gray-300 rounded text-sm"
              onClick={() => setPatientForm({
                firstName: '',
                lastName: '',
                dob: '',
                gender: '',
                phone: '',
                email: '',
                insurance: '',
                insuranceId: ''
              })}
            >
              Clear Form
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              Save Patient
            </button>
          </div>
        </div>
        
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={patientForm.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={patientForm.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={patientForm.phone}
                onChange={handleInputChange}
                placeholder="(000) 000-0000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientForm.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth*
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={patientForm.dob}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={patientForm.gender}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Provider*
              </label>
              <input
                type="text"
                id="insurance"
                name="insurance"
                value={patientForm.insurance}
                onChange={handleInputChange}
                placeholder="Enter insurance provider"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="insuranceId" className="block text-sm font-medium text-gray-700 mb-1">
                Insurance ID*
              </label>
              <input
                type="text"
                id="insuranceId"
                name="insuranceId"
                value={patientForm.insuranceId}
                onChange={handleInputChange}
                placeholder="Enter insurance ID"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Register Patient
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  const renderAppointmentCalendar = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Appointment Booking Calendar</h2>
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-1">
              <Calendar className="w-4 h-4 mr-1" />
              List View
            </button>
            <button className="flex items-center text-sm bg-blue-600 text-white rounded px-3 py-1">
              <UserPlus className="w-4 h-4 mr-1" />
              New Appointment
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium mx-2">
              May 1 - 7, 2023
            </h3>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button className="text-sm px-3 py-1 bg-gray-100 rounded-md">
            Today
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 min-w-max">
            {days.map((day) => (
              <div key={day} className="border-r last:border-r-0 border-t border-l first:border-l-0">
                <div className="py-2 px-3 bg-gray-50 border-b text-center">
                  <div className="font-medium">{day.split(' ')[0]}</div>
                  <div className="text-sm text-gray-500">{day.split(' ')[1]}</div>
                </div>
                
                <div className="min-h-[600px] relative">
                  {calendarEvents
                    .filter(event => event.day === day)
                    .map(event => (
                      <div 
                        key={event.id} 
                        className={`m-1 p-2 rounded border ${
                          event.patient.includes('Weekend') 
                            ? 'bg-gray-100 text-gray-500 border-gray-200' 
                            : 'bg-white border-blue-200 hover:bg-blue-50 cursor-pointer'
                        }`}
                      >
                        <div className="text-xs text-gray-500">{event.time}</div>
                        <div className="text-sm font-medium truncate">{event.patient}</div>
                        {event.doctor && (
                          <div className="text-xs text-gray-500 truncate">{event.doctor}</div>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderNotificationLog = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Notification Log</h2>
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-1">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
            <button className="flex items-center text-sm bg-blue-600 text-white rounded px-3 py-1">
              <Bell className="w-4 h-4 mr-1" />
              Send New
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notificationData.map((notification) => (
                <tr key={notification.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {notification.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.date} - {notification.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {notification.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>Showing 5 of 24 notifications</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Receptionist Dashboard</h1>
          <div className="text-sm text-gray-600">
            Today: May 1, 2023
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-2 mb-6">
          <div className="flex">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium ${
                currentView === 'form' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setCurrentView('form')}
            >
              Patient Registration Form
            </button>
            
            <button
              className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium ${
                currentView === 'calendar' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setCurrentView('calendar')}
            >
              Appointment Booking Calendar
            </button>
            
            <button
              className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium ${
                currentView === 'notifications' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setCurrentView('notifications')}
            >
              Notification Log
            </button>
          </div>
        </div>
        
        {currentView === 'form' && renderRegistrationForm()}
        {currentView === 'calendar' && renderAppointmentCalendar()}
        {currentView === 'notifications' && renderNotificationLog()}
      </div>
    </div>
  );
};

export default ReceptionistDashboard;