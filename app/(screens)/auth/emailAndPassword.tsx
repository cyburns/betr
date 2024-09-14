import { Colors } from "@/constants/Colors";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_STORE } from "@/firebase.config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { defaultStyles } from "@/constants/Style";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { validate } from "email-validator";
import { doc, getDoc } from "firebase/firestore";
import { useDelayedAutoFocus } from "@/hooks/utils/useDelayedAutoFocus";

const SignUp = () => {
  const auth = FIREBASE_AUTH;
  const database = FIREBASE_STORE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<null | string>(null);
  const [isValidPassword, setIsValidPassword] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const inputRef = useDelayedAutoFocus(100);

  const signUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),
  });

  const validateEmailAndPassword = () => {
    if (!validate(email)) {
      setIsValidEmail("Please enter a valid email address");
      return;
    } else {
      setIsValidEmail(null);
    }

    if (password.length < 8) {
      setIsValidPassword("Password must be at least 8 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setIsValidPassword("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setIsValidPassword(
        "Password must contain at least one special character"
      );
      return;
    }

    setIsValidEmail(null);
    setIsValidPassword(null);
    login();
    return;
  };

  const login = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (userCred) {
        const docRef = doc(database, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
      }
    } catch (error) {
      setError("Invalid email or password. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signUpFormSchema}
          onSubmit={validateEmailAndPassword}
          validateOnMount={true}
        >
          {({ handleChange, handleBlur, values }) => (
            <>
              <Text style={styles.header}>Welcome back!</Text>
              <Text style={styles.subHeader}>
                Enter the email address and password associated with your
                account.
              </Text>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                textContentType="emailAddress"
                ref={inputRef}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholderTextColor={Colors.light.text}
                style={[styles.inputField]}
                onChange={(e) => setEmail(e.nativeEvent.text)}
              />

              {/* email error text */}
              {isValidEmail && (
                <View>
                  <Text style={styles.errorText}>{isValidEmail}</Text>
                </View>
              )}

              <View style={{ position: "relative" }}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={Colors.light.text}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={[styles.inputField, { marginTop: 10 }]}
                  secureTextEntry={isSecureTextEntry}
                  onChange={(e) => setPassword(e.nativeEvent.text)}
                />
                {isSecureTextEntry ? (
                  <Feather
                    name="eye-off"
                    size={24}
                    color={Colors.lightGray}
                    style={{ position: "absolute", right: 10, top: 22 }}
                    onPress={() => setSecureTextEntry(!isSecureTextEntry)}
                  />
                ) : (
                  <Feather
                    name="eye"
                    size={24}
                    color={Colors.lightGray}
                    style={{ position: "absolute", right: 10, top: 22 }}
                    onPress={() => setSecureTextEntry(!isSecureTextEntry)}
                  />
                )}

                {/* password text */}
                {isValidPassword && (
                  <View>
                    <Text style={styles.errorText}>{isValidPassword}</Text>
                  </View>
                )}
              </View>
              {error && (
                <View>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.btn, { marginTop: 25 }]}
                onPress={validateEmailAndPassword}
              >
                <Text style={[defaultStyles.btnText, { color: "#000" }]}>
                  {isLoading ? (
                    <ActivityIndicator color={"#fff"} />
                  ) : (
                    "Continue"
                  )}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 26,
  },
  header: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: "mon-b",
    marginBottom: 10,
  },
  subHeader: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "mon-b",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.lightGray,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.black,
    color: Colors.white,
    borderColor: Colors.white,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    fontFamily: "mon",
    marginLeft: 2,
    marginTop: 2,
  },
});
