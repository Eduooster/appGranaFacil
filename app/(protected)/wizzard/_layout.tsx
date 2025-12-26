import { Stack } from "@/.expo/types/router";

export default function WizardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}