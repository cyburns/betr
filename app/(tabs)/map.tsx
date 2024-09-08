import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

const map = () => {
  return (
    <View>
      <Image
        source={"ph://9F983DBA-EC35-42B8-8773-B597CF782EDD/L0/001"}
        style={[{ width: "100%", height: 300 }]}
      />
    </View>
  );
};

export default map;
