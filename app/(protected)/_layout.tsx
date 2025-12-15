
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Redirect, Slot } from "expo-router";
import React from "react";


export default function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

 
  if (!user) {
    return <Redirect href="/" />; 
  }

  return <Slot />;
}