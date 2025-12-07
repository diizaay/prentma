import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('prentma_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      // Simulação de login - em produção seria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        name: 'Usuário Demo',
        email: email,
        type: 'candidate',
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('prentma_user', JSON.stringify(userData));
      toast.success('Login realizado com sucesso!');
      return { success: true };
    } catch (error) {
      toast.error('Erro ao fazer login');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      // Simulação de registro - em produção seria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: Date.now(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        city: userData.city,
        type: userData.userType,
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem('prentma_user', JSON.stringify(newUser));
      toast.success('Conta criada com sucesso!');
      return { success: true };
    } catch (error) {
      toast.error('Erro ao criar conta');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prentma_user');
    toast.success('Logout realizado com sucesso!');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};