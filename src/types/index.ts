export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'receptionist' | 'admin';
  department?: string;
  profileImage?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address?: string;
  insuranceProvider?: string;
  insuranceId?: string;
  patientNumber: string;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  room?: string;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'checked-in' | 'no-show';
  room?: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  recordType: string;
  date: string;
  description: string;
  doctorId: string;
  doctorName: string;
}

export interface Diagnosis {
  condition: string;
  diagnosedDate: string;
  diagnosedBy: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  refills: number;
  instructions: string;
}

export interface TestResult {
  id: string;
  testName: string;
  date: string;
  result: string;
  status: string;
  normalRange?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment-reminder' | 'test-results' | 'prescription-refill' | 'general';
  message: string;
  date: string;
  time: string;
  isRead: boolean;
  data?: any;
}

export interface Room {
  id: string;
  number: string;
  type: string;
  status: 'occupied' | 'available' | 'cleaning' | 'maintenance';
}