import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  AlertTriangle,
  Thermometer,
  Lock,
  CheckCircle2,
  Edit2,
  X,
  Check,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const BloodInventoryTable = ({
  inventory,
  onTransfer,
  onTemperatureUpdate,
  transferring,
}) => {
  const [editingTemp, setEditingTemp] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const getExpiryStatus = (days) => {
    if (days <= 1) return { color: 'text-hemo-red', bg: 'bg-hemo-red/10', label: 'CRITICAL' };
    if (days <= 5) return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'EXPIRING' };
    return { color: 'text-hemo-green', bg: 'bg-hemo-green/10', label: 'GOOD' };
  };

  const getTempStatus = (temp) => {
    if (temp > 8) return { color: 'text-hemo-red', icon: AlertTriangle, breach: true };
    if (temp > 6) return { color: 'text-yellow-500', icon: Thermometer, breach: false };
    return { color: 'text-hemo-green', icon: Thermometer, breach: false };
  };

  const handleTempEdit = (bag) => {
    setEditingTemp(bag.id);
    setTempValue(bag.temperature.toString());
  };

  const handleTempSave = (bagId) => {
    onTemperatureUpdate(bagId, tempValue);
    setEditingTemp(null);
    setTempValue('');
  };

  const handleTempCancel = () => {
    setEditingTemp(null);
    setTempValue('');
  };

  // Sort by expiry (FIFO)
  const sortedInventory = [...inventory].sort((a, b) => a.daysToExpiry - b.daysToExpiry);

  return (
    <div className="overflow-x-auto" data-testid="blood-inventory-table">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-slate-500 text-xs uppercase tracking-wider">ID</TableHead>
            <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Type</TableHead>
            <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Expiry</TableHead>
            <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Temp</TableHead>
            <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
            <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Hospital</TableHead>
            <TableHead className="text-slate-500 text-xs uppercase tracking-wider text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence mode="popLayout">
            {sortedInventory.map((bag) => {
              const expiryStatus = getExpiryStatus(bag.daysToExpiry);
              const tempStatus = getTempStatus(bag.temperature);
              const isLocked = bag.status === 'breach';
              const isTransferring = transferring === bag.id;

              return (
                <motion.tr
                  key={bag.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  data-testid={`inventory-row-${bag.id}`}
                  className={`border-white/5 hover:bg-white/5 transition-colors ${
                    isLocked ? 'bg-hemo-red/5' : ''
                  } ${isTransferring ? 'bg-hemo-green/10' : ''}`}
                >
                  <TableCell className="font-mono text-sm text-slate-300">{bag.id}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-md bg-hemo-paper text-white text-sm font-medium">
                      {bag.bloodType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium ${expiryStatus.color}`}>
                        {bag.daysToExpiry} days
                      </span>
                      <span className="text-xs text-slate-600">{bag.expiryDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingTemp === bag.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          step="0.1"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          data-testid={`temp-input-${bag.id}`}
                          className="w-16 h-8 text-xs bg-hemo-bg border-white/20 text-white"
                        />
                        <button
                          onClick={() => handleTempSave(bag.id)}
                          className="p-1 hover:bg-hemo-green/20 rounded"
                          data-testid={`temp-save-${bag.id}`}
                        >
                          <Check className="w-4 h-4 text-hemo-green" />
                        </button>
                        <button
                          onClick={handleTempCancel}
                          className="p-1 hover:bg-hemo-red/20 rounded"
                        >
                          <X className="w-4 h-4 text-hemo-red" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <tempStatus.icon className={`w-4 h-4 ${tempStatus.color}`} />
                        <span className={`text-sm font-mono ${tempStatus.color}`}>
                          {bag.temperature}°C
                        </span>
                        {!isLocked && (
                          <button
                            onClick={() => handleTempEdit(bag)}
                            className="p-1 hover:bg-white/10 rounded opacity-50 hover:opacity-100"
                            data-testid={`temp-edit-${bag.id}`}
                          >
                            <Edit2 className="w-3 h-3 text-slate-400" />
                          </button>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {isLocked ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-hemo-red/10 text-hemo-red text-xs font-medium">
                        <Lock className="w-3 h-3" />
                        BREACH
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md ${expiryStatus.bg} ${expiryStatus.color} text-xs font-medium`}
                      >
                        {expiryStatus.label}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-400 max-w-[150px] truncate">
                    {bag.hospital}
                  </TableCell>
                  <TableCell className="text-right">
                    {isTransferring ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-2 text-hemo-green"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs">Transferred!</span>
                      </motion.div>
                    ) : isLocked ? (
                      <span className="text-xs text-slate-600">Locked</span>
                    ) : bag.daysToExpiry <= 5 ? (
                      <Button
                        size="sm"
                        onClick={() => onTransfer(bag.id)}
                        data-testid={`transfer-btn-${bag.id}`}
                        className="bg-hemo-red/20 hover:bg-hemo-red/30 text-hemo-red text-xs"
                      >
                        <Truck className="w-3 h-3 mr-1" />
                        Transfer
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-600">No action needed</span>
                    )}
                  </TableCell>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};
