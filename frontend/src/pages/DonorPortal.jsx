import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Heart,
  MapPin,
  Calendar,
  Phone,
  User,
  Droplet,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { DonorCard } from '../components/DonorCard';
import { Toaster, toast } from 'sonner';
import { BLOOD_TYPES, cityZones } from '../data/mockData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DonorPortal = () => {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donorCard, setDonorCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    bloodType: '',
    preferredDate: '',
    preferredTime: '',
  });

  const getZoneColor = (status) => {
    switch (status) {
      case 'critical':
        return { color: '#ff304f', fillColor: '#ff304f' };
      case 'low':
        return { color: '#f59e0b', fillColor: '#f59e0b' };
      default:
        return { color: '#1dd1a1', fillColor: '#1dd1a1' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/donors/register`, form);
      setDonorCard(response.data);
      setDonateModalOpen(false);
      toast.success('Appointment scheduled successfully!');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to schedule appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hemo-bg pt-20" data-testid="donor-portal-page">
      <Toaster position="top-right" theme="dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-hemo-red text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Donor Portal
          </p>
          <h1 className="font-outfit font-bold text-3xl md:text-4xl text-white mb-4">
            Every Drop Counts
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Join our network of life-savers. Find donation centers near you and schedule your
            appointment today.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-outfit font-semibold text-lg text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-hemo-red" />
                    City Blood Demand Map
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Color-coded zones showing current blood demand
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-hemo-green" />
                    Stable
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    Low
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-hemo-red" />
                    Critical
                  </span>
                </div>
              </div>

              <div className="h-[400px] rounded-lg overflow-hidden" data-testid="city-map">
                <MapContainer
                  center={[40.7128, -74.006]}
                  zoom={11}
                  style={{ height: '100%', width: '100%' }}
                  attributionControl={false}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  {cityZones.map((zone) => (
                    <CircleMarker
                      key={zone.id}
                      center={[zone.lat, zone.lng]}
                      radius={30}
                      pathOptions={{
                        ...getZoneColor(zone.status),
                        fillOpacity: 0.3,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h4 className="font-semibold">{zone.name}</h4>
                          <p className="text-sm capitalize">Status: {zone.status}</p>
                          {zone.donorsNeeded > 0 && (
                            <p className="text-sm text-red-600">
                              {zone.donorsNeeded} donors needed
                            </p>
                          )}
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Donate CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-hemo-red/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-hemo-red" />
              </div>
              <h3 className="font-outfit font-semibold text-xl text-white mb-2">
                Ready to Save Lives?
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Your donation can save up to 3 lives. Schedule your appointment now.
              </p>
              <Button
                onClick={() => setDonateModalOpen(true)}
                data-testid="donate-now-btn"
                className="w-full bg-hemo-red hover:bg-hemo-red/90 text-white py-6 shadow-[0_0_20px_rgba(255,48,79,0.4)] hover:shadow-[0_0_30px_rgba(255,48,79,0.6)] transition-all"
              >
                <Droplet className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
            </motion.div>

            {/* Donation Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="font-outfit font-semibold text-white mb-4">Donation Info</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-hemo-cyan flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Duration</p>
                    <p className="text-slate-400">About 10-15 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-hemo-green flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Eligibility</p>
                    <p className="text-slate-400">Every 3 months (12 weeks)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-hemo-red flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Requirements</p>
                    <p className="text-slate-400">Age 18-65, healthy, 50kg+ weight</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Urgent Needs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 border-hemo-red/30"
            >
              <h3 className="font-outfit font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-hemo-red animate-pulse" />
                Urgent Needs
              </h3>
              <div className="space-y-2">
                {['O-', 'AB-', 'B-'].map((type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 rounded-lg bg-hemo-red/10"
                  >
                    <span className="font-mono text-white">{type}</span>
                    <span className="text-xs text-hemo-red">High demand</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Donor Card Display */}
        <AnimatePresence>
          {donorCard && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mt-12"
            >
              <div className="text-center mb-6">
                <h2 className="font-outfit font-semibold text-2xl text-white">
                  Your Digital Donor Card
                </h2>
                <p className="text-slate-400">Present this at any HemoLink partner location</p>
              </div>
              <DonorCard donor={donorCard} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Donate Modal */}
      <Dialog open={donateModalOpen} onOpenChange={setDonateModalOpen}>
        <DialogContent className="bg-hemo-paper border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="font-outfit text-xl">Schedule Donation</DialogTitle>
            <DialogDescription className="text-slate-400">
              Fill in your details to book an appointment
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  data-testid="donor-name-input"
                  className="pl-10 bg-hemo-bg border-white/10 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="555-0100"
                  data-testid="donor-phone-input"
                  className="pl-10 bg-hemo-bg border-white/10 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Blood Type</Label>
              <Select
                value={form.bloodType}
                onValueChange={(v) => setForm({ ...form, bloodType: v })}
              >
                <SelectTrigger
                  data-testid="donor-blood-type-select"
                  className="bg-hemo-bg border-white/10 text-white"
                >
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent className="bg-hemo-paper border-white/10">
                  {BLOOD_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Preferred Date</Label>
                <Input
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  data-testid="donor-date-input"
                  className="bg-hemo-bg border-white/10 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Time</Label>
                <Select
                  value={form.preferredTime}
                  onValueChange={(v) => setForm({ ...form, preferredTime: v })}
                >
                  <SelectTrigger
                    data-testid="donor-time-select"
                    className="bg-hemo-bg border-white/10 text-white"
                  >
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-hemo-paper border-white/10">
                    {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                      <SelectItem key={time} value={time} className="text-white hover:bg-white/10">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              data-testid="submit-donation-btn"
              className="w-full bg-hemo-red hover:bg-hemo-red/90 text-white py-6 mt-4"
            >
              {loading ? 'Scheduling...' : 'Schedule Appointment'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonorPortal;
