import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function saveItem(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      // No Web, usamos localStorage
      localStorage.setItem(key, value);
    } else {
      // No dispositivo (mobile), usamos SecureStore
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error(`Erro ao salvar o item ${key}:`, error);
  }
}

export async function getItem(key: string): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error(`Erro ao obter o item ${key}:`, error);
    return null;
  }
}

export async function deleteItem(key: string) {
  try {
    if (Platform.OS === "web") {
      // No Web, removemos do localStorage
      localStorage.removeItem(key);
    } else {
      // No dispositivo (mobile), removemos do SecureStore
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Erro ao excluir o item ${key}:`, error);
  }
}
