import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplet, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoCredentials = [
    { role: 'Receptionist', email: 'receptionist@hemolink.com' },
    { role: 'Lab Tech', email: 'labtech@hemolink.com' },
    { role: 'Doctor', email: 'doctor@hemolink.com' },
    { role: 'Admin', email: 'admin@hemolink.com' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, { email, password });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-hemo-bg flex" data-testid="login-page">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-hemo-red/20 via-transparent to-hemo-green/10" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 text-sm">Back to Home</span>
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-xl bg-hemo-red/20 flex items-center justify-center">
                <Droplet className="w-8 h-8 text-hemo-red" />
              </div>
              <span className="font-outfit font-bold text-3xl text-white">
                Hemo<span className="text-hemo-red">Link</span>
              </span>
            </div>
            <h1 className="font-outfit font-bold text-4xl text-white mb-4">
              Smart Blood Logistics
              <br />
              <span className="text-hemo-green">Control Center</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md">
              Access your personalized dashboard to monitor inventory, manage transfers, and
              coordinate with the hospital network.
            </p>
          </div>

          <p className="text-slate-600 text-sm">Secure access for authorized personnel only.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-hemo-red/20 flex items-center justify-center">
              <Droplet className="w-6 h-6 text-hemo-red" />
            </div>
            <span className="font-outfit font-bold text-xl text-white">
              Hemo<span className="text-hemo-red">Link</span>
            </span>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <h2 className="font-outfit font-semibold text-2xl text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm mb-8">Sign in to access your dashboard</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-hemo-red/10 border border-hemo-red/20 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-hemo-red flex-shrink-0" />
                <span className="text-sm text-hemo-red">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    data-testid="email-input"
                    className="pl-10 bg-hemo-bg/50 border-white/10 focus:border-hemo-red/50 text-white placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    data-testid="password-input"
                    className="pl-10 bg-hemo-bg/50 border-white/10 focus:border-hemo-red/50 text-white placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                data-testid="login-submit-btn"
                className="w-full bg-hemo-red hover:bg-hemo-red/90 text-white py-6 shadow-[0_0_20px_rgba(255,48,79,0.4)] hover:shadow-[0_0_30px_rgba(255,48,79,0.6)] transition-all"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">Demo Access</p>
              <div className="grid grid-cols-2 gap-2">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.role}
                    onClick={() => handleDemoLogin(cred.email)}
                    data-testid={`demo-${cred.role.toLowerCase().replace(' ', '-')}`}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white transition-all text-left"
                  >
                    {cred.role}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-3">Password for all: demo123</p>
            </div>
          </div>

          <Link
            to="/"
            className="lg:hidden flex items-center gap-2 justify-center mt-6 text-slate-400 text-sm hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
