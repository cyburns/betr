import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Style";
import { useRouter } from "expo-router";

interface AuthProps {
  isLogin: boolean;
}

const Auth = ({ isLogin }: AuthProps) => {
  const router = useRouter();

  const navToEmailAndPassword = () => {
    if (isLogin) {
      router.push("(screens)/auth/login/LoginWithEmail");
    } else {
      router.push("(screens)/auth/signup/SignupWithEmail");
    }
  };

  const navToSignUp = () => {
    router.push("(screens)/auth/signup/SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 4 }}>
        <Text style={styles.header}>
          {isLogin ? "Hello" : "Let's get started"}
        </Text>
        <Text style={styles.subHeader}>
          {isLogin
            ? "You can use your email or username, or continue with your social account."
            : "Use your email or continue with a social account to create an account."}
        </Text>
      </View>

      <View style={{ marginBottom: "10%" }}>
        <TouchableOpacity
          style={defaultStyles.btn}
          onPress={navToEmailAndPassword}
        >
          <Text style={[defaultStyles.btnText, { color: Colors.dark.text }]}>
            {isLogin ? "Continue with email" : "Continue with email"}
          </Text>
        </TouchableOpacity>

        <View style={styles.seperatorView}>
          <View style={styles.icon} />
          <Text style={styles.seperator}>or</Text>
          <View style={styles.icon} />
        </View>

        <View style={{ gap: 10 }}>
          <TouchableOpacity
            style={[
              styles.btnOutline,
              { backgroundColor: Colors.light.background },
            ]}
          >
            <Ionicons
              name="logo-apple"
              size={24}
              style={defaultStyles.btnIcon}
              color={Colors.dark.background}
            />
            <Text style={styles.btnOutlineText}>
              {isLogin ? "Continue with Apple" : "Continue with email"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline}>
            <Ionicons
              name="logo-facebook"
              size={24}
              style={defaultStyles.btnIcon}
              color={Colors.light.text}
            />
            <Text style={styles.btnOutlineTexWhite}>
              {isLogin ? "Continue with Facebook" : "Continue with email"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline}>
            <Ionicons
              name="logo-google"
              size={24}
              style={defaultStyles.btnIcon}
              color={Colors.light.text}
            />
            <Text style={styles.btnOutlineTexWhite}>
              {isLogin ? "Continue with Google" : "Continue with email"}
            </Text>
          </TouchableOpacity>

          {isLogin && (
            <TouchableOpacity style={styles.signUp} onPress={navToSignUp}>
              <Text style={styles.btnOutlineTexWhite}>
                Haven't signed up yet?
              </Text>
              <Text
                style={[styles.btnOutlineTexWhite, { color: Colors.primary }]}
              >
                Create an account
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 26,
    justifyContent: "space-between",
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.light.text,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: Colors.dark.background,
    borderWidth: 1,
    borderColor: Colors.light.text,
    height: 50,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  btnOutlineTexWhite: {
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  header: {
    color: Colors.light.text,
    fontSize: 28,
    fontFamily: "mon-b",
  },
  subHeader: {
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: "mon",
  },
  icon: {
    flex: 1,
    borderBottomColor: Colors.light.icon,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  signUp: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Auth;
