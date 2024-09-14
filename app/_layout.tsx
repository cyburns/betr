import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase.config";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-light": require("../assets/fonts/Montserrat-Light.ttf"),
    "mon-med": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const [isUser, setIsUser] = useState<User | null>(null);

  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      FIREBASE_AUTH,
      (user: User | null) => {
        setIsUser(user);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isUser) {
      router.replace("(tabs)");
    } else {
      router.replace("(screens)/auth/login/LogIn");
    }
  }, [isUser]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(screens)/auth/login/LogIn"
          options={{
            headerTitle: "Log in",
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: Colors.dark.background,
                  flex: 1,
                  borderBottomColor: Colors.dark.background,
                  borderBottomWidth: 1,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="(screens)/auth/signup/SignUp"
          options={{
            headerTitle: "Sign up",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: Colors.dark.background,
                  flex: 1,
                  borderBottomColor: Colors.dark.background,
                  borderBottomWidth: 1,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="(screens)/auth/login/LoginWithEmail"
          options={{
            headerTitle: "Log in",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: Colors.dark.background,
                  flex: 1,
                  borderBottomColor: Colors.dark.background,
                  borderBottomWidth: 1,
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="(screens)/auth/signup/SignupWithEmail"
          options={{
            headerTitle: "Sign up",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={"#fff"} />
              </TouchableOpacity>
            ),
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: Colors.dark.background,
                  flex: 1,
                  borderBottomColor: Colors.dark.background,
                  borderBottomWidth: 1,
                }}
              />
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="media-library"
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            presentation: "fullScreenModal",
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen name="(modals)/image" />
      </Stack>
    </ThemeProvider>
  );
};
