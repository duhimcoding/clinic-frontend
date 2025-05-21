import React, { useState } from 'react';
import { FileText, Calendar, ChevronLeft, ChevronRight, User, Clipboard, Search, Clock } from 'lucide-react';

// Mock appointments data
const dummyAppointments = [
  {
    id: 1,
    time: '8:00 AM',
    patient: 'John Doe',
    reason: 'Annual Checkup',
    status: 'checked-in'
  },
  {
    id: 2,
    time: '9:30 AM',
    patient: 'Sarah Johnson',
    reason: 'Follow-up',
    status: 'scheduled'
  },
  {
    id: 3,
    time: '11:00 AM',
    patient: 'Mike Wilson',
    reason: 'Prescription Refill',
    status: 'scheduled'
  },
  {
    id: 4,
    time: '1:30 PM',
    patient: 'Emily Parker',
    reason: 'Consultation',
    status: 'scheduled'
  },
  {
    id: 5,
    time: '3:00 PM',
    patient: 'Robert Brown',
    reason: 'Lab Results Review',
    status: 'scheduled'
  }
];

// Mock patient data
const patientData = {
  id: '123456',
  name: 'Sarah Johnson',
  dob: '05/12/1983',
  gender: 'Female',
  phone: '(555) 123-4567',
  patientNumber: '#123456',
  medicalHistory: [
    { condition: 'Allergies: Penicillin, Peanuts' },
    { condition: 'Chronic Condition: Hypertension, Type 2 Diabetes' },
    { condition: 'Previous Surgeries: Appendectomy (2015)' }
  ],
  recentVisits: [
    { date: '04/15/2023', reason: 'Follow-up for Hypertension' },
    { date: '03/10/2023', reason: 'Annual Physical Examination' },
    { date: '02/22/2023', reason: 'Medication Review' }
  ]
};

const DoctorDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePatient, setActivePatient] = useState<string | null>('Sarah Johnson');
  const [activeTab, setActiveTab] = useState('daily');
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: '',
    dosage: '',
    frequency: 'once-daily',
    duration: '',
    quantity: '',
    instructions: '',
    notes: ''
  });
  
  const handlePrescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPrescriptionForm({
      ...prescriptionForm,
      [name]: value
    });
  };
  
  const handlePrescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Prescription submitted');
    // Reset form
    setPrescriptionForm({
      medication: '',
      dosage: '',
      frequency: 'once-daily',
      duration: '',
      quantity: '',
      instructions: '',
      notes: ''
    });
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, Dr. Smith</h1>
            <p className="text-gray-600">Thursday, May 4, 2023</p>
          </div>
          
          <div className="flex space-x-2">
            <button className={`px-3 py-1 text-sm rounded ${activeTab === 'daily' ? 'bg-blue-600 text-white' : 'bg-white border'}`} onClick={() => setActiveTab('daily')}>
              Today
            </button>
            <button className={`px-3 py-1 text-sm rounded ${activeTab === 'tomorrow' ? 'bg-blue-600 text-white' : 'bg-white border'}`} onClick={() => setActiveTab('tomorrow')}>
              Next
            </button>
            <button className={`px-3 py-1 text-sm rounded ${activeTab === 'previous' ? 'bg-blue-600 text-white' : 'bg-white border'}`} onClick={() => setActiveTab('previous')}>
              Previous
            </button>
          </div>
        </div>
        
        {/* Daily Schedule */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Daily Schedule View</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${appointment.status === 'checked-in' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'}`}>
                        {appointment.status === 'checked-in' ? 'Checked In' : 'Scheduled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Search */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Patient Search</h2>
            </div>
            
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">RECENT PATIENTS</h3>
                <div className="space-y-2">
                  <div 
                    className={`p-2 rounded-md flex items-center cursor-pointer ${
                      activePatient === 'Sarah Johnson' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePatient('Sarah Johnson')}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-600">
                      SJ
                    </div>
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-xs text-gray-500">ID #123456 • 42 yrs</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-2 rounded-md flex items-center cursor-pointer ${
                      activePatient === 'John Doe' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePatient('John Doe')}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-600">
                      JD
                    </div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-xs text-gray-500">ID #123458 • 56 yrs</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-2 rounded-md flex items-center cursor-pointer ${
                      activePatient === 'Emily Parker' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePatient('Emily Parker')}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-600">
                      EP
                    </div>
                    <div>
                      <div className="font-medium">Emily Parker</div>
                      <div className="text-xs text-gray-500">ID #123467 • 27 yrs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Patient EMR Access */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">EMR Access - Sarah Johnson</h2>
            </div>
            
            <div className="p-4">
              <div className="flex mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-600">
                  SJ
                </div>
                <div>
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">DOB: 05/12/1983 • Gender: Female</div>
                  <div className="text-sm text-gray-500">Phone: (555) 123-4567 • ID: #123456</div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Medical History</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  {patientData.medicalHistory.map((item, index) => (
                    <li key={index}>{item.condition}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Visits</h3>
                <div className="space-y-2">
                  {patientData.recentVisits.map((visit, index) => (
                    <div key={index} className="flex justify-between text-sm border-b pb-2">
                      <div>{visit.date}</div>
                      <div className="text-gray-700">{visit.reason}</div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="bg-gray-900 text-white px-3 py-1.5 rounded text-sm flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Full EMR
                </button>
                <button className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Lab Results
                </button>
                <button className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded text-sm flex items-center">
                  <Clipboard className="w-4 h-4 mr-1" />
                  Prescriptions
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Prescription Entry */}
        <div className="bg-white rounded-lg shadow-md mt-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Prescription Entry</h2>
          </div>
          
          <form onSubmit={handlePrescriptionSubmit} className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-600">
                SJ
              </div>
              <div>
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-xs text-gray-500">ID #123456</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="medication" className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  id="medication"
                  name="medication"
                  placeholder="Search medication..."
                  value={prescriptionForm.medication}
                  onChange={handlePrescriptionChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  placeholder="e.g., 10mg"
                  value={prescriptionForm.dosage}
                  onChange={handlePrescriptionChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={prescriptionForm.frequency}
                  onChange={handlePrescriptionChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="once-daily">Once daily</option>
                  <option value="twice-daily">Twice daily</option>
                  <option value="three-times-daily">Three times daily</option>
                  <option value="as-needed">As needed</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    placeholder="e.g., 14"
                    value={prescriptionForm.duration}
                    onChange={handlePrescriptionChange}
                    className="w-full border border-gray-300 rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md text-gray-500">
                    Days
                  </span>
                </div>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    placeholder="e.g., 30"
                    value={prescriptionForm.quantity}
                    onChange={handlePrescriptionChange}
                    className="w-full border border-gray-300 rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md text-gray-500">
                    Units
                  </span>
                </div>
              </div>
              
              <div className="flex items-end pb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">Allow generic substitution</span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions for Patient
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  placeholder="Specific instructions..."
                  value={prescriptionForm.instructions}
                  onChange={handlePrescriptionChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (not visible to patient)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Doctor's notes..."
                  value={prescriptionForm.notes}
                  onChange={handlePrescriptionChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Prescription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;