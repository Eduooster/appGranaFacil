import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export type InsightType = "ALERTA" | "ATENCAO" | "POSITIVO";

export interface Insight {
  id: string;
  tipo: InsightType;
  mensagem: string;
}

interface Props {
  insight?: Insight | null;
  loading?: boolean;
}

export function InsightChip({ insight, loading }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  
  useEffect(() => {
    if (!loading && insight) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, insight]);

  if (loading) {
    return <View style={styles.skeleton} />;
  }

  if (!insight) {
    return <View style={styles.placeholder} />;
  }

  return (
    <Animated.View
      style={[
        styles.chip,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.text}>{insight.mensagem}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "center",
    backgroundColor: "#313130ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 30,
    minHeight: 45,
    justifyContent: "center",
  },

  text: {
    fontSize: 13,
    color: "#92280eff",
    fontWeight: "bold",
    textAlign: "center",
  },

  skeleton: {
    alignSelf: "center",
    width: "90%",
    height: 40,
    backgroundColor: "#252525ff",
    borderRadius: 20,
    marginVertical: 30,
  },

  placeholder: {
    height: 40,
    marginVertical: 20,
  },
});
