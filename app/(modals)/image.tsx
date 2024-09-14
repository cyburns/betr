import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";

const { width, height } = Dimensions.get("window");

const SinglePicture = () => {
  const { uri } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerBackground: () => <View style={[styles.header]} />,
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={24} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={"#fff"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: "flex-start" }}
    >
      <ExpoImage
        source={uri}
        style={{
          width,
          height: height - 200,
          justifyContent: "flex-start",
        }}
        contentFit="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.dark.tabIconDefault,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: Colors.dark.background,
    height: 700,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark.tabIconDefault,
  },
});

export default SinglePicture;
