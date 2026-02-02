import { Stack, Slot } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import { View, Text } from 'react-native';

const AppLayout = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.replace('/(app)');
      } else {
        router.replace('/(auth)/sign-in');
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <View><Text>Loading...</Text></View>;
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AppLayout />
  );
}