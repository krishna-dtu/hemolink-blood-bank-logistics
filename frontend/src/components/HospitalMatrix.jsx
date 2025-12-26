import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Droplet,
  Eye,
  EyeOff,
  ArrowRightLeft,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { BLOOD_TYPES } from '../data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const HospitalMatrix = ({ hospitals, onTransferRequest }) => {
  const { hasPrivacyAccess, setPrivacyAccess, privacyKey } = useAuth();
  const [hoveredHospital, setHoveredHospital] = useState(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [transferForm, setTransferForm] = useState({
    bloodType: '',
    units: 1,
    urgency: 'normal',
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'border-hemo-red/50 bg-hemo-red/5';
      case 'low':
        return 'border-yellow-500/50 bg-yellow-500/5';
      default:
        return 'border-hemo-green/50 bg-hemo-green/5';
    }
  };

  const getStockColor = (units) => {
    if (units === 0) return 'text-slate-600';
    if (units <= 3) return 'text-hemo-red';
    if (units <= 8) return 'text-yellow-500';
    return 'text-hemo-green';
  };

  const handleTransferClick = (hospital) => {
    setSelectedHospital(hospital);
    setTransferModalOpen(true);
  };

  const handleTransferSubmit = () => {
    onTransferRequest?.({
      hospitalId: selectedHospital.id,
      ...transferForm,
    });
    setTransferModalOpen(false);
    setTransferForm({ bloodType: '', units: 1, urgency: 'normal' });
  };

  const handlePrivacySubmit = () => {
    setPrivacyAccess(keyInput);
    setPrivacyModalOpen(false);
    setKeyInput('');
  };

  const canSeeDetails = hasPrivacyAccess();

  return (
    <div data-testid="hospital-matrix">
      {/* Privacy Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-outfit font-semibold text-lg text-white">Hospital Network</h2>
          <p className="text-xs text-slate-500">Zero-knowledge privacy enabled</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPrivacyModalOpen(true)}
          data-testid="privacy-toggle-btn"
          className={`border-white/10 ${
            canSeeDetails ? 'text-hemo-green' : 'text-slate-400'
          } hover:bg-white/5`}
        >
          {canSeeDetails ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Privacy Unlocked
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Privacy Protected
            </>
          )}
        </Button>
      </div>

      {/* Hospital Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {hospitals.map((hospital) => (
          <motion.div
            key={hospital.id}
            layout
            onMouseEnter={() => setHoveredHospital(hospital.id)}
            onMouseLeave={() => setHoveredHospital(null)}
            data-testid={`hospital-card-${hospital.id}`}
            className={`glass-card rounded-xl p-4 transition-all duration-300 ${
              getStatusColor(hospital.status)
            } ${hoveredHospital === hospital.id ? 'scale-[1.02]' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-hemo-paper flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{hospital.name}</h3>
                  <p className="text-xs text-slate-500 capitalize">
                    Status: <span className={`font-medium ${
                      hospital.status === 'critical' ? 'text-hemo-red' :
                      hospital.status === 'low' ? 'text-yellow-500' : 'text-hemo-green'
                    }`}>{hospital.status}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg text-white">{hospital.totalUnits}</p>
                <p className="text-xs text-slate-500">Total Units</p>
              </div>
            </div>

            {/* Blood Type Grid */}
            <AnimatePresence>
              {(hoveredHospital === hospital.id || canSeeDetails) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_TYPES.map((type) => (
                      <div
                        key={type}
                        className="bg-hemo-bg/50 rounded-lg p-2 text-center"
                      >
                        <p className="text-xs text-slate-400">{type}</p>
                        <p className={`font-mono text-sm ${getStockColor(hospital.stock[type])}`}>
                          {canSeeDetails ? hospital.stock[type] : (
                            <span className="blur-sm select-none">{hospital.stock[type]}</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleTransferClick(hospital)}
                data-testid={`request-transfer-${hospital.id}`}
                className="flex-1 bg-hemo-red/20 hover:bg-hemo-red/30 text-hemo-red text-xs"
              >
                <ArrowRightLeft className="w-3 h-3 mr-1" />
                Request Transfer
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transfer Modal */}
      <Dialog open={transferModalOpen} onOpenChange={setTransferModalOpen}>
        <DialogContent className="bg-hemo-paper border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-outfit">Request Blood Transfer</DialogTitle>
            <DialogDescription className="text-slate-400">
              Request blood units from {selectedHospital?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Blood Type</Label>
              <Select
                value={transferForm.bloodType}
                onValueChange={(v) => setTransferForm({ ...transferForm, bloodType: v })}
              >
                <SelectTrigger
                  data-testid="blood-type-select"
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
            <div className="space-y-2">
              <Label className="text-slate-300">Number of Units</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={transferForm.units}
                onChange={(e) =>
                  setTransferForm({ ...transferForm, units: parseInt(e.target.value) })
                }
                data-testid="units-input"
                className="bg-hemo-bg border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Urgency</Label>
              <Select
                value={transferForm.urgency}
                onValueChange={(v) => setTransferForm({ ...transferForm, urgency: v })}
              >
                <SelectTrigger
                  data-testid="urgency-select"
                  className="bg-hemo-bg border-white/10 text-white"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-hemo-paper border-white/10">
                  <SelectItem value="normal" className="text-white hover:bg-white/10">
                    Normal
                  </SelectItem>
                  <SelectItem value="urgent" className="text-white hover:bg-white/10">
                    Urgent
                  </SelectItem>
                  <SelectItem value="critical" className="text-white hover:bg-white/10">
                    Critical
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setTransferModalOpen(false)}
              className="flex-1 border-white/10 text-slate-400 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleTransferSubmit}
              disabled={!transferForm.bloodType}
              data-testid="submit-transfer-btn"
              className="flex-1 bg-hemo-red hover:bg-hemo-red/90 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Key Modal */}
      <Dialog open={privacyModalOpen} onOpenChange={setPrivacyModalOpen}>
        <DialogContent className="bg-hemo-paper border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-outfit">Privacy Access</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your authorization key to view detailed stock information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Authorization Key</Label>
              <Input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter key..."
                data-testid="privacy-key-input"
                className="bg-hemo-bg border-white/10 text-white"
              />
              <p className="text-xs text-slate-600">Hint: HEMO2024</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setPrivacyModalOpen(false)}
              className="flex-1 border-white/10 text-slate-400 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePrivacySubmit}
              data-testid="submit-privacy-key-btn"
              className="flex-1 bg-hemo-green hover:bg-hemo-green/90 text-white"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
