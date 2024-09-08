import { View } from "react-native";
import IconButton from "../IconButton";
import { FlashMode } from "expo-camera";

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}
export default function CameraTools({
  cameraZoom,
  cameraFlash,
  setCameraZoom,
  setCameraFacing,
  setCameraFlash,
}: CameraToolsProps) {
  return (
    <View
      style={{
        position: "absolute",
        right: 12,
        zIndex: 1,
        gap: 10,
        backgroundColor: "#00000050",
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 25,
      }}
    >
      <IconButton
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
        iosName={cameraFlash === "on" ? "bolt.circle" : "bolt.slash.circle"}
        androidName="close"
      />
      <IconButton
        onPress={() => {}}
        iosName={"speaker"}
        // iosName={"speaker.slash"}
        androidName="volume-high"
      />
      <IconButton
        onPress={() => {
          // increment by .01
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.01);
          }
        }}
        iosName={"plus.magnifyingglass"}
        androidName="close"
      />
      <IconButton
        onPress={() => {
          // decrement by .01
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.01);
          }
        }}
        iosName={"minus.magnifyingglass"}
        androidName="close"
      />
      <IconButton
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
        iosName={"arrow.triangle.2.circlepath.camera"}
        androidName="close"
        width={25}
        height={21}
      />
    </View>
  );
}
