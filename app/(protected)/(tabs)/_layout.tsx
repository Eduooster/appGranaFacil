import { Tabs } from "expo-router";
import { HapticTab } from "@/components/haptic-tab";
import { Ionicons } from "@expo/vector-icons";
import RadialFab from "@/components/RadialFabs";
import { View, Text } from "react-native";


export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          
          tabBarButton: HapticTab,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#000000e7",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          
        }}
      >
        
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
          }}
        />

         <Tabs.Screen
          name="moreOptions"
          options={{
            title: "Mais",
            tabBarIcon: ({ color }) => <Ionicons name="add-outline" size={26} color={color} />,
          }}
        />

        

        
      </Tabs>

      
      <View
        style={{
          position: "absolute",
          bottom: -10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <RadialFab
          onReceita={() => console.log("Receita")}
          onDespesa={() => console.log("Despesa")}
          onTransferencia={() => console.log("Transferência")}
        />
      </View>
    </>
  );
}
