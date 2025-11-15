import { createContext, useContext, useState } from 'react';
import { createUser } from '../types';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (!email || !password) return false;

    const mockUser = createUser(
      '1',
      'Demo User',
      email,
      email.includes('entrepreneur') ? 'entrepreneur' : 'investor'
    );

    setUser(mockUser);
    return true;
  };

  const register = (name, email, password, role) => {
    if (!name || !email || !password || !role) return false;

    const newUser = createUser(
      Date.now().toString(),
      name,
      email,
      role
    );

    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
