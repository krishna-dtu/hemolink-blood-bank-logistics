import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Droplet, Calendar, Phone, Award, AlertTriangle } from 'lucide-react';
import { format, addMonths, isBefore } from 'date-fns';

export const DonorCard = ({ donor }) => {
  const nextEligibleDate = addMonths(new Date(donor.lastDonation || new Date()), 3);
  const isEligible = isBefore(nextEligibleDate, new Date());

  const qrData = JSON.stringify({
    id: donor.id,
    name: donor.name,
    bloodType: donor.bloodType,
    nextEligible: format(nextEligibleDate, 'yyyy-MM-dd'),
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl overflow-hidden max-w-sm mx-auto"
      data-testid="donor-card"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-hemo-red to-hemo-red/80 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs uppercase tracking-wider">Digital Donor Card</p>
              <h3 className="font-outfit font-bold text-xl text-white">HemoLink</h3>
            </div>
          </div>
          <Award className="w-8 h-8 text-white/50" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex gap-6">
          {/* QR Code */}
          <div className="bg-white p-3 rounded-xl" data-testid="qr-code">
            <QRCodeSVG
              value={qrData}
              size={100}
              level="H"
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#0b0f17"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h4 className="font-outfit font-semibold text-lg text-white mb-1">{donor.name}</h4>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-hemo-red/20 text-hemo-red font-bold text-sm">
                {donor.bloodType}
              </span>
              {donor.donations && (
                <span className="text-xs text-slate-400">{donor.donations}x donor</span>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>{donor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>ID: {donor.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Status */}
        <div className="mt-6 pt-4 border-t border-white/10">
          {isEligible ? (
            <div className="p-3 rounded-lg bg-hemo-green/10 border border-hemo-green/20">
              <p className="text-hemo-green text-sm font-medium">Eligible to Donate</p>
              <p className="text-xs text-slate-400 mt-1">Thank you for your contribution!</p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20" data-testid="ineligible-warning">
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Ineligible</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Next eligible date: {format(nextEligibleDate, 'MMM dd, yyyy')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-hemo-subtle/50 px-6 py-3">
        <p className="text-xs text-slate-500 text-center">
          Scan QR code at any HemoLink partner location
        </p>
      </div>
    </motion.div>
  );
};
