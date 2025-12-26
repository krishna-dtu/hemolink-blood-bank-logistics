import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Droplet,
  AlertTriangle,
  Thermometer,
  Truck,
  Users,
  Activity,
  RefreshCw,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { BloodInventoryTable } from '../components/BloodInventoryTable';
import { ColdChainAlert } from '../components/ColdChainAlert';
import { GeoMap } from '../components/GeoMap';
import { useAuth } from '../context/AuthContext';
import { Toaster, toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, inventoryRes] = await Promise.all([
        axios.get(`${API}/dashboard/stats`),
        axios.get(`${API}/inventory`),
      ]);
      setStats(statsRes.data);
      setInventory(inventoryRes.data);
    } catch (err) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (bagId) => {
    setTransferring(bagId);
    try {
      await axios.post(`${API}/inventory/${bagId}/transfer`);
      toast.success('Blood bag transferred successfully!');
      fetchData();
    } catch (err) {
      toast.error('Transfer failed');
    } finally {
      setTimeout(() => setTransferring(null), 1500);
    }
  };

  const handleTemperatureUpdate = async (bagId, newTemp) => {
    try {
      const response = await axios.patch(`${API}/inventory/${bagId}/temperature`, {
        temperature: parseFloat(newTemp),
      });
      if (response.data.breach) {
        toast.error('COLD CHAIN BREACH DETECTED! Unit locked.', {
          duration: 5000,
          icon: <AlertTriangle className="w-5 h-5 text-hemo-red" />,
        });
      }
      fetchData();
    } catch (err) {
      toast.error('Failed to update temperature');
    }
  };

  const statCards = stats
    ? [
        {
          label: 'Total Units',
          value: stats.totalUnits,
          icon: Droplet,
          color: 'hemo-red',
          trend: '+12 today',
        },
        {
          label: 'Expiring Soon',
          value: stats.expiringUnits,
          icon: Clock,
          color: 'yellow-500',
          trend: '≤5 days',
          alert: stats.expiringUnits > 10,
        },
        {
          label: 'Critical Alerts',
          value: stats.criticalAlerts,
          icon: AlertTriangle,
          color: 'hemo-red',
          trend: 'Needs attention',
          alert: stats.criticalAlerts > 0,
        },
        {
          label: 'Active Transfers',
          value: stats.activeTransfers,
          icon: Truck,
          color: 'hemo-green',
          trend: 'In progress',
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-hemo-bg pt-20 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-hemo-red animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hemo-bg pt-20" data-testid="dashboard-page">
      <Toaster position="top-right" theme="dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-hemo-red text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Smart Logistics Dashboard
          </p>
          <h1 className="font-outfit font-bold text-3xl text-white">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-slate-400 mt-1">Monitor blood inventory and manage logistics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
              className={`glass-card rounded-xl p-5 card-hover ${
                stat.alert ? 'border-hemo-red/30' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-${stat.color}/20 flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                {stat.alert && (
                  <span className="px-2 py-1 rounded-md bg-hemo-red/10 text-hemo-red text-xs font-medium">
                    ALERT
                  </span>
                )}
              </div>
              <p className="font-mono text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-xs text-slate-600 mt-1">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Inventory Table - Main Area */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-outfit font-semibold text-lg text-white">Blood Inventory</h2>
                  <p className="text-xs text-slate-500">FIFO sorted by expiry date</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchData}
                  data-testid="refresh-inventory-btn"
                  className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <BloodInventoryTable
                inventory={inventory}
                onTransfer={handleTransfer}
                onTemperatureUpdate={handleTemperatureUpdate}
                transferring={transferring}
              />
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Cold Chain Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ColdChainAlert inventory={inventory} />
            </motion.div>

            {/* Geo Map Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-outfit font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-hemo-green" />
                  Geo Routing
                </h3>
              </div>
              <div className="h-48 rounded-lg overflow-hidden">
                <GeoMap compact />
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl p-4"
            >
              <h3 className="font-outfit font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  data-testid="check-expiry-btn"
                  className="w-full justify-start border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  onClick={() => {
                    const expiring = inventory.filter((b) => b.daysToExpiry <= 5);
                    toast.info(`${expiring.length} units expiring within 5 days`);
                  }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Check Expiry Status
                </Button>
                <Button
                  variant="outline"
                  data-testid="view-transfers-btn"
                  className="w-full justify-start border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  View Active Transfers
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
