import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RadialFabProps {
  onReceita: () => void;
  onDespesa: () => void;
  onTransferencia: () => void;
}

export default function RadialFab({
  onReceita,
  onDespesa,
  onTransferencia,
}: RadialFabProps) {
  const [open, setOpen] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      friction: 6,
    }).start();

    setOpen(!open);
  };


  const styleUp = {
    transform: [
      { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -80] }) }
    ],
    opacity: animation,
  };

  const styleLeft = {
    transform: [
      { translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -80] }) }
    ],
    opacity: animation,
  };

  const styleRight = {
    transform: [
      { translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 80] }) }
    ],
    opacity: animation,
  };

  return (
    <View style={styles.container}>
     
      <Animated.View style={[styles.subButton, styleUp]}>
        <TouchableOpacity style={styles.subButton} onPress={onReceita}>
          <Ionicons name="trending-up" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

     
      <Animated.View style={[styles.subButton, styleLeft]}>
        <TouchableOpacity style={styles.subButton} onPress={onDespesa}>
          <Ionicons name="trending-down" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

     
      <Animated.View style={[styles.subButton, styleRight]}>
        <TouchableOpacity style={styles.subButton} onPress={onTransferencia}>
          <Ionicons name="swap-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Ionicons name={open ? "close" : "add"} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      position: "absolute",
    bottom: 60,
    left: 7,
    right: 0,
    alignItems: "center",
  
    
   
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  subButton: {
    position: "absolute",
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#320C5E",
    justifyContent: "center",
    alignItems: "center",
  },
});
