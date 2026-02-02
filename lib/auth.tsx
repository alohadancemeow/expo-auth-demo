import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { authClient } from './auth-client';

const AuthContext = createContext<{
  session: any | null;
  user: any;
  loading: boolean;
  signIn: (params: any) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (params: any) => Promise<void>;
}>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => { },
  signOut: async () => { },
  signUp: async () => { },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await authClient.getSession();
      if (data) {
        setSession(data.session);
        setUser(data.user);
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  const signIn = async (params: any) => {
    const { data, error } = await authClient.signIn.email({
      email: params.email,
      password: params.password,
    });

    if (error) {
      throw error;
    }

    if (data) {
      setSession(data.session);
      setUser(data.user);
    }
  };

  const signUp = async (params: any) => {
    const { data, error } = await authClient.signUp.email({
      email: params.email,
      password: params.password,
      name: params.name,
    });

    if (error) {
      throw error;
    }

    // Auto sign in or handle as needed, usually better-auth signs in after specific flows, but default might not?
    // Actually signUp.email usually creates user.
  };

  const signOut = async () => {
    await authClient.signOut();
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, user, loading, signIn, signOut, signUp }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

