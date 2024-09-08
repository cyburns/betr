import * as React from "react";
import { SymbolView } from "expo-symbols";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { Image } from "expo-image";
import { CameraMode } from "expo-camera";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}
export default function MainRowActions({
  cameraMode,
  handleTakePicture,
  isRecording,
}: MainRowActionsProps) {
  const [asset, setAsset] = React.useState<Asset>();

  React.useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();

    const albumAssets = await getAssetsAsync({
      album: fetchedAlbums.find((album) => album.title === "Recentsd"),
      mediaType: "photo",
      sortBy: "creationTime",
      first: 1,
    });
    setAsset(albumAssets.assets[0]);
  }

  return (
    <View style={styles.container}>
      {/* CAMERA ROLL */}
      {asset && (
        <Link href={"/(screens)/media-library"} asChild>
          <TouchableOpacity style={styles.cameraRoll}>
            <View style={styles.imgPickerTwo} />
            <Image source={asset.uri} style={styles.imgPicker} />
          </TouchableOpacity>
        </Link>
      )}

      <View style={styles.pictureBtn}>
        <TouchableOpacity onPress={handleTakePicture}>
          <SymbolView
            name={
              cameraMode === "picture"
                ? "circle"
                : isRecording
                ? "record.circle"
                : "circle.circle"
            }
            size={90}
            type="hierarchical"
            tintColor={isRecording ? Colors.light.snapPrimary : "white"}
            animationSpec={{
              effect: {
                type: isRecording ? "pulse" : "bounce",
              },
              repeating: isRecording,
            }}
            // fallback={} TODO: Add a fallback for android
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <Link href={"/(screens)/media-library"} asChild>
        <TouchableOpacity
          style={{
            width: 40,
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <FontAwesome5 name="smile-wink" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    position: "absolute",
    bottom: 20,
    gap: 15,
    paddingHorizontal: 95,
  },
  cameraRoll: {
    width: 40,
    alignItems: "center",
    flexDirection: "row",
  },

  pictureBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  imgPicker: {
    height: 30,
    width: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
    transform: [{ rotate: "15deg" }],
  },
  imgPickerTwo: {
    height: 30,
    width: 20,
    transform: [{ rotate: "-15deg" }],
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    top: 0,
    right: 32,
  },
});
