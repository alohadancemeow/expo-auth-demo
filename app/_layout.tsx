import { Stack, Slot } from 'expo-router';
import { AuthProvider, useAuth } from '../lib/auth';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const AppLayout = () => {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.replace('/(app)');
      } else {
        router.replace('/(auth)/sign-in');
      }
    }
  }, [session, loading, router]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}