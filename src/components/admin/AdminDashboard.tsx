import React, { useState } from 'react';
import { User, Edit, Trash2, Plus, BarChart } from 'lucide-react';

// Mock data for user management
const users = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Doctor", department: "Cardiology", status: "active" },
  { id: 2, name: "Michael Brown", role: "Nurse", department: "Emergency", status: "active" },
  { id: 3, name: "Lisa Chen", role: "Receptionist", department: "Front Desk", status: "inactive" }
];

// Mock data for room management
const rooms = [
  { id: "101", type: "Exam Room", status: "occupied" },
  { id: "102", type: "Exam Room", status: "available" },
  { id: "103", type: "Procedure Room", status: "occupied" },
  { id: "104", type: "Exam Room", status: "available" }
];

// Mock data for scheduling
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const scheduleData = [
  { day: 'Mon', doctors: ['Dr. Johnson (8-5)', 'Dr. Smith (9-6)'] },
  { day: 'Tue', doctors: ['Dr. Smith (8-5)', 'Dr. Johnson (9-6)'] },
  { day: 'Wed', doctors: ['Dr. Brown (8-5)', 'Dr. Johnson (9-6)'] },
  { day: 'Thu', doctors: ['Dr. Smith (8-5)', 'Dr. Lee (9-6)'] },
  { day: 'Fri', doctors: ['Dr. Johnson (8-5)', 'Dr. Lee (9-6)'] },
  { day: 'Sat', doctors: ['Dr. Wilson (8-2)'] },
  { day: 'Sun', doctors: ['Dr. Wilson (8-2)'] }
];

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'users' | 'scheduling' | 'rooms' | 'reports'>('users');
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('week');
  const [selectedReport, setSelectedReport] = useState<'patient-visits' | 'staff-performance'>('patient-visits');
  
  const renderUserManagement = () => {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">User Management</h2>
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm">
            <Plus className="w-4 h-4 mr-1" />
            Add User
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderShiftScheduling = () => {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Shift Scheduling View</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded ${selectedView === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedView('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${selectedView === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedView('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${selectedView === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedView('month')}
            >
              Month
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {scheduleData.map((day, index) => (
              <div key={index} className="border rounded-md p-2">
                <div className="font-medium text-center mb-2">{day.day}</div>
                {day.doctors.map((doctor, idx) => (
                  <div key={idx} className="text-xs p-1.5 mb-1 bg-blue-50 rounded border border-blue-100">
                    {doctor}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderRoomManagement = () => {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Room Management</h2>
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Room
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {room.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      room.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : room.status === 'occupied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  const renderReports = () => {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Reports</h2>
          <div className="flex items-center">
            <select 
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value as any)}
            >
              <option value="patient-visits">This Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
            </select>
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base font-medium mb-2">Patient Visits</h3>
            <div className="bg-gray-700 p-4 rounded-md text-white">
              <div className="text-center mb-2">Bar Chart: Patient Visits by Department</div>
              <div className="h-40 flex items-end justify-around space-x-2">
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '70%' }}></div>
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '80%' }}></div>
                <div className="w-8 bg-blue-500 rounded-t" style={{ height: '40%' }}></div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-2">Staff Performance</h3>
            <div className="bg-gray-700 p-4 rounded-md text-white">
              <div className="text-center mb-2">Line Chart: Staff Performance Metrics</div>
              <div className="h-40 flex items-center justify-center">
                <svg viewBox="0 0 200 100" width="100%" height="100%" className="text-blue-500">
                  <polyline
                    points="0,80 40,70 80,80 120,40 160,50 200,30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <button className="p-1.5 bg-gray-200 rounded-full">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <button className="p-1.5 bg-gray-200 rounded-full">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-3">
            <div className="flex space-x-1">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium ${
                  activeSection === 'users' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection('users')}
              >
                <User className="w-5 h-5 mx-auto mb-1" />
                User Management
              </button>
              
              <button
                className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium ${
                  activeSection === 'scheduling' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection('scheduling')}
              >
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Staff Scheduling
              </button>
              
              <button
                className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium ${
                  activeSection === 'rooms' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection('rooms')}
              >
                <Notebook className="w-5 h-5 mx-auto mb-1" />
                Room Management
              </button>
              
              <button
                className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium ${
                  activeSection === 'reports' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection('reports')}
              >
                <BarChart className="w-5 h-5 mx-auto mb-1" />
                Reports
              </button>
            </div>
          </div>
        </div>
        
        {activeSection === 'users' && renderUserManagement()}
        {activeSection === 'scheduling' && renderShiftScheduling()}
        {activeSection === 'rooms' && renderRoomManagement()}
        {activeSection === 'reports' && renderReports()}
      </div>
    </div>
  );
};

// These components are not imported from lucide-react, so I'm defining them here for the example
const Calendar = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Notebook = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const Bell = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

export default AdminDashboard;