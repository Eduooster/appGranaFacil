import { useAuth } from "../../context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  
  

  if (loading) return null;

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
    screenOptions={{
      
       headerShown: false,
    freezeOnBlur: false, // IMPORTANTE
    animation: 'fade',
    animationDuration: 220,
    contentStyle: { backgroundColor: '#4e09a800' }
        
      }}>
        <Stack.Screen name="(tabs)"  options={{animation:"fade"}}/>
        <Stack.Screen name="(moreOptions)"  options={{animation:"fade"}}/>
      
      <Stack.Screen name="profile" options={{animation:"fade"}} />
      <Stack.Screen name="person-information/index"options={{presentation:"card"}} />
      <Stack.Screen
        name="settings/index"
        options={{ 
         animation: "fade", contentStyle: { backgroundColor: "#4e09a800" } 
      }}
      />
       <Stack.Screen name="contas-financeiras/index"options={{ 
        presentation: 'modal',
    animation: 'slide_from_bottom'}} />
        <Stack.Screen name="pluggyInformations/index"options={{animation:"fade"}} />
        <Stack.Screen name="(analytics)/top-receitas"options={{animation:"slide_from_bottom"}} />



     
        
    </Stack>

  );
}
