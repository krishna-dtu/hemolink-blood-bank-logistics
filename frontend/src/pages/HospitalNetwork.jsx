import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  Building2,
  ArrowRightLeft,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { HospitalMatrix } from '../components/HospitalMatrix';
import { GeoMap } from '../components/GeoMap';
import { Toaster, toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HospitalNetwork = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or map

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${API}/hospitals`);
      setHospitals(response.data);
    } catch (err) {
      toast.error('Failed to fetch hospital data');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferRequest = async (request) => {
    try {
      await axios.post(`${API}/transfers`, request);
      toast.success('Transfer request submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit transfer request');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hemo-bg pt-20 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-hemo-red animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hemo-bg pt-20" data-testid="hospital-network-page">
      <Toaster position="top-right" theme="dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-hemo-green text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Hospital Network
            </p>
            <h1 className="font-outfit font-bold text-3xl text-white">Network Overview</h1>
            <p className="text-slate-400 mt-1">
              Monitor blood stock across {hospitals.length} partner hospitals
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              data-testid="grid-view-btn"
              className={viewMode === 'grid' ? 'bg-hemo-red hover:bg-hemo-red/90' : 'border-white/10 text-slate-400 hover:bg-white/5'}
            >
              <Building2 className="w-4 h-4 mr-2" />
              Grid View
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
              data-testid="map-view-btn"
              className={viewMode === 'map' ? 'bg-hemo-red hover:bg-hemo-red/90' : 'border-white/10 text-slate-400 hover:bg-white/5'}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-xl p-6">
                <HospitalMatrix
                  hospitals={hospitals}
                  onTransferRequest={handleTransferRequest}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-outfit font-semibold text-lg text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-hemo-green" />
                    Geo Routing Map
                  </h2>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-hemo-green" />
                      Stable
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      Low
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-hemo-red" />
                      Critical
                    </span>
                  </div>
                </div>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  <GeoMap onHospitalSelect={setSelectedHospital} />
                </div>
              </div>

              {/* Selected Hospital Info */}
              <AnimatePresence>
                {selectedHospital && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="glass-card rounded-xl p-6 mt-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-outfit font-semibold text-lg text-white">
                          {selectedHospital.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {selectedHospital.totalUnits} units available
                        </p>
                      </div>
                      <Button
                        className="bg-hemo-red hover:bg-hemo-red/90"
                        data-testid="request-from-map-btn"
                      >
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        Request Transfer
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HospitalNetwork;
