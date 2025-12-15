import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot, Stack } from "expo-router";



export default function AuthLayout() {
  const { user, loading } = useAuth();
  console.log(user)
  if (loading) return null;
  if (user) return <Redirect href="/home" />;
  return <Slot />;
}