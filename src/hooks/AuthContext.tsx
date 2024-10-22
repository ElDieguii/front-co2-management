import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextData {
  user: any | null;
  token: string | null;
  signIn: (token: string, user: any) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    loadAuthData();
  }, []);

  const signIn = async (jwtToken: string, user: any): Promise<void> => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(jwtToken);
    setUser(user);
  };

  const signOut = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, token, signIn, signOut, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextData => useContext(AuthContext);
