
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Define the User type
export type User = {
  id: string;
  name: string;
  email: string;
  educationLevel: 'fundamental' | 'medio' | 'superior';
  grade: string;
};

// Define the AuthContextType
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (userData: Omit<User, "id"> & { password: string }) => void;
  logout: () => void;
};

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (email: string, password: string) => {
    // Simulating authentication check
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password from user object before storing in state
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      navigate('/dashboard');
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo de volta, ${userWithoutPassword.name}!`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "E-mail ou senha incorretos",
      });
    }
  };

  // Register function
  const register = (userData: Omit<User, "id"> & { password: string }) => {
    // Simulating user registration
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Check if user already exists
    if (users.some((u: any) => u.email === userData.email)) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Este e-mail já está em uso",
      });
      return;
    }
    
    // Create new user with ID
    const newUser = {
      id: Date.now().toString(),
      ...userData
    };
    
    // Add to users array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    navigate('/dashboard');
    toast({
      title: "Cadastro realizado com sucesso",
      description: `Bem-vindo(a), ${userData.name}!`,
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
