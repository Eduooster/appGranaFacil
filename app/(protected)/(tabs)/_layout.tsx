import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
       
        headerShown: false,
        tabBarButton: HapticTab,
         tabBarActiveTintColor: 'white', // cor do ícone ativo
          tabBarInactiveTintColor: '#888', // cor do ícone inativo
         tabBarStyle: { backgroundColor: '#480E5B' }, // cor de fundo da tab bar
  
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={"black"} />

        }}
      />
      
    </Tabs>
  );
}
