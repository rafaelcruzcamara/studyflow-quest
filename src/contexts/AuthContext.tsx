
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  educationLevel: string;
  grade: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('studyflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // Simulating login for demo purposes
      const mockUsers = JSON.parse(localStorage.getItem('studyflow_users') || '[]');
      const foundUser = mockUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Credenciais inválidas. Por favor, tente novamente.');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('studyflow_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo de volta, ${userWithoutPassword.name}!`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro de login",
        description: error instanceof Error ? error.message : "Ocorreu um erro durante o login",
        variant: "destructive"
      });
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      // In a real app, this would be an API call
      // Simulating registration for demo purposes
      const mockUsers = JSON.parse(localStorage.getItem('studyflow_users') || '[]');
      
      // Check if email already exists
      if (mockUsers.some((u: any) => u.email === userData.email)) {
        throw new Error('Este email já está cadastrado.');
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData
      };
      
      mockUsers.push(newUser);
      localStorage.setItem('studyflow_users', JSON.stringify(mockUsers));
      
      // Auto login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('studyflow_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: `Bem-vindo, ${userData.name}!`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro de cadastro",
        description: error instanceof Error ? error.message : "Ocorreu um erro durante o cadastro",
        variant: "destructive"
      });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('studyflow_user');
    navigate('/');
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso."
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
