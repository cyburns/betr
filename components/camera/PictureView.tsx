import { Image } from "expo-image";
import { Alert, StyleSheet, View } from "react-native";
import IconButton from "../IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

interface PictureViewProps {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
}
export default function PictureView({ picture, setPicture }: PictureViewProps) {
  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <View style={styles.container}>
        <IconButton
          onPress={async () => {
            saveToLibraryAsync(picture);
            Alert.alert("Picture saved!");
          }}
          iosName={"arrow.down"}
          androidName="close"
        />
      </View>
      <View style={styles.close}>
        <IconButton
          onPress={() => setPicture("")}
          iosName={"xmark"}
          androidName="close-sharp"
        />
      </View>
      <Image source={picture} style={styles.save} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 6,
    zIndex: 1,
    paddingTop: 50,
    gap: 16,
  },
  close: {
    position: "absolute",
    zIndex: 1,
    paddingTop: 50,
    left: 12,
  },
  save: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
  },
});
