import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/context/AuthContext';



export default function RootLayout() {
  
  return (
    
       <AuthProvider>
          <Stack screenOptions={{ headerShown: false ,contentStyle:{backgroundColor:"#161616ff"}}}>
          </Stack>
        </AuthProvider>
   
  );
}
