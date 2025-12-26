import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplet,
  Truck,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Activity,
  Building2,
  Users,
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Landing = () => {
  const pillars = [
    {
      icon: Truck,
      title: 'Smart Logistics',
      description:
        'AI-powered FIFO algorithm ensures optimal blood unit rotation, reducing wastage by up to 40%.',
      color: 'hemo-red',
    },
    {
      icon: ShieldCheck,
      title: 'Data Safety',
      description:
        'Zero-knowledge architecture protects donor identity while enabling seamless hospital coordination.',
      color: 'hemo-green',
    },
    {
      icon: AlertTriangle,
      title: 'Crisis Response',
      description:
        'Real-time alerts and geo-routing enable rapid response during emergencies and mass casualties.',
      color: 'hemo-cyan',
    },
  ];

  const stats = [
    { value: '40%', label: 'Wastage Reduction' },
    { value: '500+', label: 'Partner Hospitals' },
    { value: '24/7', label: 'Monitoring' },
    { value: '15min', label: 'Avg. Response Time' },
  ];

  return (
    <div className="min-h-screen bg-hemo-bg" data-testid="landing-page">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-hemo-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-hemo-green/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Overline */}
            <p className="text-hemo-red text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Smart Blood Logistics Platform
            </p>

            {/* Main headline */}
            <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Automating the Blood Supply Chain
              <br />
              <span className="text-hemo-red">to End Biological Wastage</span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-400 text-base lg:text-lg max-w-2xl mx-auto mb-10">
              HemoLink connects hospitals, blood banks, and donors through an intelligent network
              that optimizes inventory, ensures safety, and saves lives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button
                  size="lg"
                  data-testid="get-started-btn"
                  className="bg-hemo-red hover:bg-hemo-red/90 text-white px-8 py-6 text-base shadow-[0_0_30px_rgba(255,48,79,0.4)] hover:shadow-[0_0_40px_rgba(255,48,79,0.6)] transition-all"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/donor">
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="donor-portal-btn"
                  className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base"
                >
                  <Droplet className="w-5 h-5 mr-2" />
                  Donate Blood
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Animated Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20"
          >
            <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Donor */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-hemo-red/20 flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 text-hemo-red" />
                  </div>
                  <span className="text-sm text-slate-400">Donor</span>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  className="hidden md:block"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-8 h-8 text-hemo-red/50" />
                </motion.div>

                {/* Blood Bank */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-hemo-green/20 flex items-center justify-center mb-3">
                    <Droplet className="w-8 h-8 text-hemo-green" />
                  </div>
                  <span className="text-sm text-slate-400">Storage</span>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  className="hidden md:block"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                >
                  <ArrowRight className="w-8 h-8 text-hemo-green/50" />
                </motion.div>

                {/* Hospital */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-hemo-cyan/20 flex items-center justify-center mb-3">
                    <Building2 className="w-8 h-8 text-hemo-cyan" />
                  </div>
                  <span className="text-sm text-slate-400">Hospital</span>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  className="hidden md:block"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                >
                  <ArrowRight className="w-8 h-8 text-hemo-cyan/50" />
                </motion.div>

                {/* Patient */}
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-hemo-purple/20 flex items-center justify-center mb-3">
                    <Activity className="w-8 h-8 text-hemo-purple" />
                  </div>
                  <span className="text-sm text-slate-400">Patient</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-outfit font-bold text-3xl md:text-4xl text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" data-testid="pillars-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-hemo-green text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Core Features
            </p>
            <h2 className="font-outfit font-bold text-3xl md:text-4xl text-white">
              Three Pillars of Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`pillar-${index}`}
                className="glass-card rounded-xl p-6 card-hover"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-${pillar.color}/20 flex items-center justify-center mb-4`}
                >
                  <pillar.icon className={`w-6 h-6 text-${pillar.color}`} />
                </div>
                <h3 className="font-outfit font-semibold text-xl text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-hemo-red/10 to-transparent" />
            <div className="relative">
              <h2 className="font-outfit font-bold text-2xl md:text-3xl text-white mb-4">
                Ready to Transform Your Blood Supply Chain?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Join hundreds of hospitals and blood banks already using HemoLink to save lives and
                reduce wastage.
              </p>
              <Link to="/login">
                <Button
                  size="lg"
                  data-testid="cta-get-started-btn"
                  className="bg-hemo-red hover:bg-hemo-red/90 text-white px-8 shadow-[0_0_30px_rgba(255,48,79,0.4)]"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-hemo-red" />
            <span className="font-outfit font-semibold text-white">
              Hemo<span className="text-hemo-red">Link</span>
            </span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; 2024 HemoLink. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
