import { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SFSymbol, SymbolView } from "expo-symbols";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 34;
const ICON_SIZE = 28;

interface IconButtonProps {
  iosName: SFSymbol;
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
}
export default function IconButton({
  onPress,
  androidName,
  iosName,
  containerStyle,
  height,
  width,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        {
          padding: CONTAINER_PADDING,
          borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
          width: CONTAINER_WIDTH,
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <SymbolView
        name={iosName}
        size={ICON_SIZE}
        style={
          width && height
            ? {
                width,
                height,
              }
            : {}
        }
        tintColor={"white"}
        fallback={
          <Ionicons
            size={ICON_SIZE}
            name={androidName}
            style={{}}
            color={"white"}
          />
        }
      />
    </TouchableOpacity>
  );
}
