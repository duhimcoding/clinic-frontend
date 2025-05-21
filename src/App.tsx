import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Sidebar from './components/shared/Sidebar';
import PatientPortal from './components/patient/PatientPortal';
import ReceptionistDashboard from './components/receptionist/ReceptionistDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const RoleBasedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userRole = localStorage.getItem('userRole') || 'patient';
  let userName = '';
  
  switch (userRole) {
    case 'patient':
      userName = 'Sarah Johnson';
      break;
    case 'doctor':
      userName = 'Dr. Smith';
      break;
    case 'receptionist':
      userName = 'Lisa Chen';
      break;
    case 'admin':
      userName = 'John Adams';
      break;
    default:
      userName = 'User';
  }
  
  return (
    <div className="flex">
      <Sidebar role={userRole as any} userName={userName} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Patient Routes */}
        <Route 
          path="/patient/dashboard" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <PatientPortal />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/patient/appointments" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <PatientPortal />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/patient/records" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <PatientPortal />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/patient/notifications" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <PatientPortal />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        
        {/* Doctor Routes */}
        <Route 
          path="/doctor/dashboard" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <DoctorDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/doctor/patients" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <DoctorDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/doctor/appointments" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <DoctorDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/doctor/prescriptions" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <DoctorDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        
        {/* Receptionist Routes */}
        <Route 
          path="/receptionist/dashboard" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <ReceptionistDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/receptionist/registration" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <ReceptionistDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/receptionist/appointments" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <ReceptionistDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/receptionist/notifications" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <ReceptionistDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <AdminDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <AdminDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/admin/schedule" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <AdminDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        <Route 
          path="/admin/rooms" 
          element={
            <AuthRoute>
              <RoleBasedLayout>
                <AdminDashboard />
              </RoleBasedLayout>
            </AuthRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;