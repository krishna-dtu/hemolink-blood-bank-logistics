import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Thermometer, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ColdChainAlert = ({ inventory }) => {
  const breaches = inventory.filter((b) => b.status === 'breach' || b.temperature > 8);
  const warnings = inventory.filter((b) => b.temperature > 6 && b.temperature <= 8);
  const normal = inventory.filter((b) => b.temperature <= 6);

  const hasBreaches = breaches.length > 0;

  return (
    <div
      className={`glass-card rounded-xl p-4 ${
        hasBreaches ? 'border-hemo-red/30 animate-pulse' : ''
      }`}
      data-testid="cold-chain-alert"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-outfit font-semibold text-white flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-hemo-cyan" />
          Cold Chain Monitor
        </h3>
        {hasBreaches && (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="px-2 py-1 rounded-md bg-hemo-red text-white text-xs font-bold"
          >
            ALERT
          </motion.span>
        )}
      </div>

      <div className="space-y-3">
        {/* Breach Alert */}
        {hasBreaches && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-lg bg-hemo-red/10 border border-hemo-red/30"
            data-testid="breach-alert"
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-5 h-5 text-hemo-red" />
              <span className="text-sm font-semibold text-hemo-red">Safety Breach Detected</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              {breaches.length} unit(s) exceeded 8°C threshold
            </p>
            <div className="space-y-1">
              {breaches.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between text-xs"
                  data-testid={`breach-item-${b.id}`}
                >
                  <span className="text-slate-400">
                    {b.id} ({b.bloodType})
                  </span>
                  <span className="text-hemo-red font-mono">{b.temperature}°C</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Warning */}
        {warnings.length > 0 && (
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-500">Warning</span>
            </div>
            <p className="text-xs text-slate-400">
              {warnings.length} unit(s) approaching threshold (6-8°C)
            </p>
          </div>
        )}

        {/* All Normal */}
        {!hasBreaches && warnings.length === 0 && (
          <div className="p-3 rounded-lg bg-hemo-green/10 border border-hemo-green/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-hemo-green" />
              <span className="text-sm font-medium text-hemo-green">All systems normal</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {normal.length} units within safe temperature range
            </p>
          </div>
        )}

        {/* Temperature Summary */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          <div className="text-center">
            <p className="font-mono text-lg text-hemo-green">{normal.length}</p>
            <p className="text-xs text-slate-500">Normal</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg text-yellow-500">{warnings.length}</p>
            <p className="text-xs text-slate-500">Warning</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg text-hemo-red">{breaches.length}</p>
            <p className="text-xs text-slate-500">Breach</p>
          </div>
        </div>
      </div>
    </div>
  );
};
