import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Style";
import { Link } from "expo-router";

const auth = () => {
  return (
    <View style={styles.container}>
      <View style={{ gap: 4 }}>
        <Text style={styles.header}>Hello</Text>
        <Text style={styles.subHeader}>
          You can use your email or username, or continue with your social
          account.
        </Text>
      </View>

      <View style={{ marginBottom: "25%" }}>
        <Link href="(screens)/auth/emailAndPassword" asChild>
          <TouchableOpacity style={defaultStyles.btn}>
            <Text style={[defaultStyles.btnText, { color: Colors.dark.text }]}>
              Continue with email
            </Text>
          </TouchableOpacity>
        </Link>

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
            <Text style={styles.btnOutlineText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline}>
            <Ionicons
              name="logo-facebook"
              size={24}
              style={defaultStyles.btnIcon}
              color={Colors.light.text}
            />
            <Text style={styles.btnOutlineTexWhite}>
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline}>
            <Ionicons
              name="logo-google"
              size={24}
              style={defaultStyles.btnIcon}
              color={Colors.light.text}
            />
            <Text style={styles.btnOutlineTexWhite}>Continue with Google</Text>
          </TouchableOpacity>
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
});

export default auth;
