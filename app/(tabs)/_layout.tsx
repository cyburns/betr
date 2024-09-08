import { Redirect, Tabs } from "expo-router";
import React from "react";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFirstTimeOpen } from "@/hooks/useFirstTimeOpen";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isFirstTime, isLoading } = useFirstTimeOpen();

  if (isLoading) return <></>;
  if (isFirstTime) return <Redirect href={"/onboarding"} />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={27} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="grid-3x3" size={35} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          headerTitle: "Memories",
          headerTitleStyle: {
            fontFamily: "mon-sb",
            fontSize: 20,
            color: Colors.light.text,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
