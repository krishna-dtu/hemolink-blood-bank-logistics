import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [privacyKey, setPrivacyKey] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('hemolink_user');
    const savedKey = localStorage.getItem('hemolink_privacy_key');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedKey) {
      setPrivacyKey(savedKey);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('hemolink_user', JSON.stringify(userData));
    localStorage.setItem('hemolink_token', token);
  };

  const logout = () => {
    setUser(null);
    setPrivacyKey(null);
    localStorage.removeItem('hemolink_user');
    localStorage.removeItem('hemolink_token');
    localStorage.removeItem('hemolink_privacy_key');
  };

  const setPrivacyAccess = (key) => {
    setPrivacyKey(key);
    localStorage.setItem('hemolink_privacy_key', key);
  };

  const clearPrivacyAccess = () => {
    setPrivacyKey(null);
    localStorage.removeItem('hemolink_privacy_key');
  };

  const hasPrivacyAccess = () => {
    return privacyKey === 'HEMO2024';
  };

  const canView = (permission) => {
    if (!user) return false;
    const permissions = {
      receptionist: ['appointments', 'donor_portal'],
      lab_tech: ['appointments', 'inventory', 'testing'],
      doctor: ['appointments', 'inventory', 'testing', 'traceability', 'transfers'],
      admin: ['appointments', 'inventory', 'testing', 'traceability', 'transfers', 'settings'],
    };
    return permissions[user.role]?.includes(permission) || user.role === 'admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        canView,
        privacyKey,
        setPrivacyAccess,
        clearPrivacyAccess,
        hasPrivacyAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
