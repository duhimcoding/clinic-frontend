import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, FileText, ChevronRight, AlertCircle, Bell } from 'lucide-react';

const dummyAppointments = [
  {
    id: '1',
    date: 'MAR 12 2023',
    startTime: '10:30 AM',
    endTime: '10:50 AM',
    doctorName: 'Dr. Robert Williams',
    location: 'Main Office, Room 102',
    type: 'Annual Physical Examination',
    status: 'confirmed'
  },
  {
    id: '2',
    date: 'JUL 03 2023',
    startTime: '2:00 PM',
    endTime: '2:45 PM',
    doctorName: 'Dr. Emily Chen',
    location: 'Cardiology Dept, Room 105',
    type: 'Cardiology Appointment',
    status: 'scheduled'
  }
];

const dummyDiagnoses = [
  {
    condition: 'Hypertension (Essential)',
    date: 'March 15, 2023',
    doctor: 'Dr. Robert Williams'
  },
  {
    condition: 'Seasonal Allergies',
    date: 'February 03, 2023',
    doctor: 'Dr. Lisa Thompson'
  }
];

const dummyMedications = [
  {
    name: 'Lisinopril 10mg',
    dosage: '1 tablet daily',
    refills: 3,
    prescribedBy: 'Dr. Robert Williams'
  },
  {
    name: 'Loratadine 10mg',
    dosage: '1 tablet daily as needed',
    refills: 5,
    prescribedBy: 'Dr. Lisa Thompson'
  }
];

const dummyTestResults = [
  {
    id: '1',
    test: 'Blood Pressure',
    date: 'Apr 10, 2023',
    result: '128/85 mmHg',
    status: 'Normal'
  },
  {
    id: '2',
    test: 'Complete Blood Count',
    date: 'Mar 23, 2023',
    result: 'WBC: 7.2 K/uL',
    status: 'Normal'
  }
];

const dummyNotifications = [
  {
    id: '1',
    type: 'Appointment Reminder',
    date: 'May 15, 2023',
    message: 'Hello! Your appointment with Dr. Robert Williams is scheduled for tomorrow at 10:30 AM. Reply Y to confirm or N to reschedule.'
  },
  {
    id: '2',
    type: 'Test Results Available',
    date: 'Apr 12, 2023',
    message: 'Good notification: Your recent blood pressure and blood count results are now available in your patient portal. Please review them at your earliest convenience.'
  },
  {
    id: '3',
    type: 'Prescription Refill',
    date: 'Mar 28, 2023',
    message: 'Hello! Your prescription for Lisinopril has been refilled and is ready for pickup at your preferred pharmacy.'
  }
];

const PatientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  
  const renderAppointments = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Appointments</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New Appointment
          </button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-3">Upcoming Appointments</h3>
          
          {dummyAppointments.map((appointment) => (
            <div key={appointment.id} className="mb-4 border rounded-lg overflow-hidden">
              <div className="flex border-b">
                <div className="w-20 bg-gray-100 flex flex-col items-center justify-center py-3 px-2 text-center">
                  <div className="text-xs font-semibold text-gray-500">{appointment.date.split(' ')[0]}</div>
                  <div className="text-xl font-bold">{appointment.date.split(' ')[1]}</div>
                  <div className="text-xs">{appointment.date.split(' ')[2]}</div>
                </div>
                
                <div className="flex-1 p-4">
                  <h4 className="font-medium text-lg">{appointment.type}</h4>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{appointment.startTime} - {appointment.endTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <span>{appointment.doctorName}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status === 'confirmed' ? 'Confirmed' : 'Scheduled'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800 text-sm">
                    Reschedule
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center mt-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center mx-auto">
              View all appointments
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderMedicalRecords = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Medical Records Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Recent Diagnoses</h3>
            {dummyDiagnoses.map((diagnosis, index) => (
              <div key={index} className="mb-3 border rounded-lg p-4">
                <div className="font-medium">{diagnosis.condition}</div>
                <div className="text-sm text-gray-600 mt-1">Diagnosed: {diagnosis.date}</div>
                <div className="text-sm text-gray-600">{diagnosis.doctor}</div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Current Medications</h3>
            {dummyMedications.map((medication, index) => (
              <div key={index} className="mb-3 border rounded-lg p-4">
                <div className="font-medium">{medication.name}</div>
                <div className="text-sm text-gray-600 mt-1">{medication.dosage}</div>
                <div className="text-sm text-gray-600">Refills: {medication.refills} remaining</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Recent Test Results</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyTestResults.map((result) => (
                  <tr key={result.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.test}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.result}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                      <button>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-right mt-4">
          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center ml-auto">
            View complete records
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  };
  
  const renderNotifications = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Notification History</h2>
        
        <div className="space-y-4">
          {dummyNotifications.map((notification) => (
            <div key={notification.id} className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className={`rounded-full p-2 mr-3 ${
                  notification.type === 'Appointment Reminder' 
                    ? 'bg-blue-100 text-blue-600' 
                    : notification.type === 'Test Results Available'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  {notification.type === 'Appointment Reminder' ? (
                    <Calendar className="w-5 h-5" />
                  ) : notification.type === 'Test Results Available' ? (
                    <FileText className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{notification.type}</h3>
                    <span className="text-sm text-gray-500">{notification.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4 py-2 rounded-md text-sm">
            Load More
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
            <div className="mb-4 text-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto">
                SJ
              </div>
              <h2 className="font-semibold mt-2">Sarah Johnson</h2>
              <p className="text-sm text-gray-600">Patient ID: #34756</p>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'appointments' 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className={`w-5 h-5 mr-3 ${activeTab === 'appointments' ? 'text-blue-500' : 'text-gray-400'}`} />
                My Appointments
              </button>
              
              <button
                onClick={() => setActiveTab('records')}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'records' 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className={`w-5 h-5 mr-3 ${activeTab === 'records' ? 'text-blue-500' : 'text-gray-400'}`} />
                Medical Records
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className={`w-5 h-5 mr-3 ${activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-400'}`} />
                Notifications
              </button>
            </nav>
            
            <div className="mt-6 border-t pt-4">
              <div className="text-sm text-gray-600 mb-2">Need assistance?</div>
              <a href="tel:123-456-7890" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                <Phone className="w-4 h-4 mr-2" />
                (123) 456-7890
              </a>
            </div>
          </div>
          
          <div className="flex-1">
            {activeTab === 'appointments' && renderAppointments()}
            {activeTab === 'records' && renderMedicalRecords()}
            {activeTab === 'notifications' && renderNotifications()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;