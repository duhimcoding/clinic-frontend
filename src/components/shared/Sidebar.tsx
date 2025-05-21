import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Users, 
  Clipboard, 
  BarChart, 
  User
} from 'lucide-react';

interface SidebarProps {
  role: 'patient' | 'doctor' | 'receptionist' | 'admin';
  userName: string;
  userImage?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role, userName, userImage }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };
  
  const renderMenuItems = () => {
    switch (role) {
      case 'patient':
        return (
          <>
            <SidebarItem to="/patient/dashboard" icon={<Home />} text="Dashboard" active={isActive('/patient/dashboard')} />
            <SidebarItem to="/patient/appointments" icon={<Calendar />} text="My Appointments" active={isActive('/patient/appointments')} />
            <SidebarItem to="/patient/records" icon={<FileText />} text="Medical Records" active={isActive('/patient/records')} />
            <SidebarItem to="/patient/notifications" icon={<Bell />} text="Notifications" active={isActive('/patient/notifications')} />
          </>
        );
      
      case 'doctor':
        return (
          <>
            <SidebarItem to="/doctor/dashboard" icon={<Home />} text="Dashboard" active={isActive('/doctor/dashboard')} />
            <SidebarItem to="/doctor/patients" icon={<Users />} text="Patients" active={isActive('/doctor/patients')} />
            <SidebarItem to="/doctor/appointments" icon={<Calendar />} text="Appointments" active={isActive('/doctor/appointments')} />
            <SidebarItem to="/doctor/prescriptions" icon={<Clipboard />} text="Prescriptions" active={isActive('/doctor/prescriptions')} />
            <SidebarItem to="/doctor/reports" icon={<BarChart />} text="Reports" active={isActive('/doctor/reports')} />
          </>
        );
        
      case 'receptionist':
        return (
          <>
            <SidebarItem to="/receptionist/dashboard" icon={<Home />} text="Dashboard" active={isActive('/receptionist/dashboard')} />
            <SidebarItem to="/receptionist/registration" icon={<User />} text="Registration" active={isActive('/receptionist/registration')} />
            <SidebarItem to="/receptionist/appointments" icon={<Calendar />} text="Appointments" active={isActive('/receptionist/appointments')} />
            <SidebarItem to="/receptionist/notifications" icon={<Bell />} text="Notifications" active={isActive('/receptionist/notifications')} badge={3} />
            <SidebarItem to="/receptionist/reports" icon={<BarChart />} text="Reports" active={isActive('/receptionist/reports')} />
          </>
        );
        
      case 'admin':
        return (
          <>
            <SidebarItem to="/admin/dashboard" icon={<Home />} text="Dashboard" active={isActive('/admin/dashboard')} />
            <SidebarItem to="/admin/users" icon={<Users />} text="Staff Management" active={isActive('/admin/users')} />
            <SidebarItem to="/admin/schedule" icon={<Calendar />} text="Staff Scheduling" active={isActive('/admin/schedule')} />
            <SidebarItem to="/admin/rooms" icon={<FileText />} text="Room Management" active={isActive('/admin/rooms')} />
            <SidebarItem to="/admin/reports" icon={<BarChart />} text="Reports" active={isActive('/admin/reports')} />
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800 mb-4">
        <h1 className="text-xl font-bold">MediClinic</h1>
        {role === 'admin' && <div className="text-sm text-gray-400">Admin</div>}
        {role === 'doctor' && <div className="text-sm text-gray-400">Doctor Portal</div>}
      </div>
      
      <div className="px-4 py-2 border-b border-gray-800 mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-600 mr-3 overflow-hidden">
            {userImage ? (
              <img src={userImage} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-medium">
                {userName.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{userName}</div>
            <div className="text-sm text-gray-400 capitalize">{role}</div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-2">
        {renderMenuItems()}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <SidebarItem to="/settings" icon={<Settings />} text="Settings" active={isActive('/settings')} />
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white mt-2 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text, active, badge }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-md mb-1 transition-colors ${
        active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <div className="w-5 h-5 mr-3">{icon}</div>
      <span>{text}</span>
      {badge && (
        <div className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </div>
      )}
    </Link>
  );
};

export default Sidebar;