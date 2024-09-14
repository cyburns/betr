import { Colors } from "./Colors";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.light.background,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.dark.background,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: Colors.light.background,
    fontSize: 16,
    fontFamily: "mon-b",
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dark.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.light.background,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
