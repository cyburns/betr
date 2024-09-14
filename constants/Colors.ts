/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const primary = "#84b4fc";

export const Colors = {
  light: {
    text: "#fff",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    snapPrimary: "#FFFC00",
  },
  dark: {
    text: "#000",
    background: "#000",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    snapPrimary: "#FFFC00",
  },
  primary,
  white: "#FFFFFF",
  lightGray: "#A8A8A8",
  black: "#0f0f0f",
  darkGray: "#303030",
  legalBlue: "#E0F1FF",
  offBlack: "#262626",
  error: "#FF003A",
};
