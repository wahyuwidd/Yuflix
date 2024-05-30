import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    TacOne: require('../assets/fonts/TacOne-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='movies/detail/[id]' options={{ headerShown: true, headerTransparent : true, headerTitle: "", headerTintColor: "white" }} />
        <Stack.Screen name='tv/detail/[id]' options={{ headerShown: true, headerTransparent : true, headerTitle: "", headerTintColor: "white" }} />
        <Stack.Screen name='person/detail/[id]' options={{ headerShown: true, headerTransparent : true, headerTitle: "", headerTintColor: "white" }} />
        <Stack.Screen name='genre' options={{ headerShown: false, headerTintColor: "white" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
