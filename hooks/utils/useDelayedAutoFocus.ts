import { useEffect, useRef } from "react";
import { TextInput } from "react-native";

export const useDelayedAutoFocus = (delay = 300) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        (inputRef.current as TextInput).focus();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return inputRef;
};
