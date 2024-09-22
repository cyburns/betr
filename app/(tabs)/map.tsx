import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { defaultStyles } from "@/constants/Style";

const map = () => {
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  const hadleLogout = async () => {
    setIsLoading(true);

    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while logging out. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: 100 }}>
      <TouchableOpacity style={defaultStyles.btn} onPress={hadleLogout}>
        <Text style={defaultStyles.btnText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default map;
