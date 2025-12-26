// Blood types
export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Mock blood inventory data
export const bloodInventory = [
  { id: 'BB001', bloodType: 'A+', collectionDate: '2024-12-01', expiryDate: '2024-12-20', daysToExpiry: 3, temperature: 4.2, status: 'available', hospital: 'City General Hospital' },
  { id: 'BB002', bloodType: 'O-', collectionDate: '2024-12-05', expiryDate: '2024-12-22', daysToExpiry: 5, temperature: 3.8, status: 'available', hospital: 'City General Hospital' },
  { id: 'BB003', bloodType: 'B+', collectionDate: '2024-12-10', expiryDate: '2024-12-28', daysToExpiry: 11, temperature: 4.0, status: 'available', hospital: 'Metro Hospital' },
  { id: 'BB004', bloodType: 'AB+', collectionDate: '2024-11-28', expiryDate: '2024-12-18', daysToExpiry: 1, temperature: 3.5, status: 'critical', hospital: 'City General Hospital' },
  { id: 'BB005', bloodType: 'A-', collectionDate: '2024-12-08', expiryDate: '2024-12-26', daysToExpiry: 9, temperature: 4.1, status: 'available', hospital: 'St. Mary Medical' },
  { id: 'BB006', bloodType: 'O+', collectionDate: '2024-12-12', expiryDate: '2025-01-01', daysToExpiry: 15, temperature: 12.5, status: 'breach', hospital: 'Metro Hospital' },
  { id: 'BB007', bloodType: 'B-', collectionDate: '2024-12-03', expiryDate: '2024-12-21', daysToExpiry: 4, temperature: 3.9, status: 'available', hospital: 'Regional Medical Center' },
  { id: 'BB008', bloodType: 'AB-', collectionDate: '2024-12-11', expiryDate: '2024-12-29', daysToExpiry: 12, temperature: 4.3, status: 'available', hospital: 'City General Hospital' },
];

// Mock hospitals data
export const hospitals = [
  {
    id: 'H001',
    name: 'City General Hospital',
    lat: 40.7128,
    lng: -74.006,
    stock: { 'A+': 15, 'A-': 8, 'B+': 12, 'B-': 5, 'AB+': 4, 'AB-': 2, 'O+': 20, 'O-': 10 },
    totalUnits: 76,
    status: 'stable'
  },
  {
    id: 'H002',
    name: 'Metro Hospital',
    lat: 40.7282,
    lng: -73.9942,
    stock: { 'A+': 8, 'A-': 3, 'B+': 6, 'B-': 2, 'AB+': 1, 'AB-': 0, 'O+': 12, 'O-': 4 },
    totalUnits: 36,
    status: 'low'
  },
  {
    id: 'H003',
    name: 'St. Mary Medical',
    lat: 40.6892,
    lng: -74.0445,
    stock: { 'A+': 20, 'A-': 12, 'B+': 15, 'B-': 8, 'AB+': 6, 'AB-': 4, 'O+': 25, 'O-': 15 },
    totalUnits: 105,
    status: 'stable'
  },
  {
    id: 'H004',
    name: 'Regional Medical Center',
    lat: 40.7484,
    lng: -73.9857,
    stock: { 'A+': 5, 'A-': 2, 'B+': 3, 'B-': 1, 'AB+': 0, 'AB-': 0, 'O+': 8, 'O-': 2 },
    totalUnits: 21,
    status: 'critical'
  },
];

// Mock city zones for donor map
export const cityZones = [
  { id: 'Z001', name: 'Downtown', lat: 40.7128, lng: -74.006, status: 'stable', donorsNeeded: 0 },
  { id: 'Z002', name: 'Midtown', lat: 40.7549, lng: -73.984, status: 'low', donorsNeeded: 15 },
  { id: 'Z003', name: 'Uptown', lat: 40.7831, lng: -73.9712, status: 'critical', donorsNeeded: 30 },
  { id: 'Z004', name: 'Brooklyn', lat: 40.6782, lng: -73.9442, status: 'stable', donorsNeeded: 5 },
  { id: 'Z005', name: 'Queens', lat: 40.7282, lng: -73.7949, status: 'low', donorsNeeded: 20 },
];

// Mock users for role-based access
export const mockUsers = [
  { id: 'U001', email: 'receptionist@hemolink.com', password: 'demo123', role: 'receptionist', name: 'Sarah Johnson' },
  { id: 'U002', email: 'labtech@hemolink.com', password: 'demo123', role: 'lab_tech', name: 'Michael Chen' },
  { id: 'U003', email: 'doctor@hemolink.com', password: 'demo123', role: 'doctor', name: 'Dr. Emily Williams' },
  { id: 'U004', email: 'admin@hemolink.com', password: 'demo123', role: 'admin', name: 'Admin User' },
];

// Mock donor appointments
export const donorAppointments = [
  { id: 'D001', name: 'John Smith', bloodType: 'A+', date: '2024-12-20', time: '09:00', status: 'scheduled', phone: '555-0101' },
  { id: 'D002', name: 'Emma Davis', bloodType: 'O-', date: '2024-12-20', time: '10:30', status: 'scheduled', phone: '555-0102' },
  { id: 'D003', name: 'James Wilson', bloodType: 'B+', date: '2024-12-21', time: '14:00', status: 'scheduled', phone: '555-0103' },
];

// Stats for dashboard
export const dashboardStats = {
  totalUnits: 238,
  expiringUnits: 12,
  criticalAlerts: 3,
  activeTransfers: 5,
  donorsToday: 24,
  temperaturesNormal: 95,
};
