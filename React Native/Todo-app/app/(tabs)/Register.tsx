import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.centeredContent}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Image
                source={require("../../assets/images/anime-character.png")}
                style={styles.characterImage}
                resizeMode="contain"
              />
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>👤</Text>
                </View>
                <TextInput placeholder="Username" style={styles.input} />
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>✉️</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>🔑</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>🔑</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  value={cpassword}
                  onChangeText={setCpassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => router.push("/Login")}
              >
                <Text style={styles.signInText}>Sign in</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => router.push("/Register")}
              >
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1e2e",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  centeredContent: {
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  characterImage: {
    width: width * 0.8,
    height: height * 0.4,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
    height: 50,
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#333",
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "#b5b04d",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    width: "90%",
    maxWidth: 400,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpButton: {
    backgroundColor: "#b8c1cc",
    borderRadius: 5,
    height: 50,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
  },
  signUpText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RegisterScreen;
