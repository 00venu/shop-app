import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { signupHandler, loginHandler } from "../../store/actions/auth";

const AuthScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const authHandler = async () => {
    if (userName !== "" && password !== "") {
      let action;
      if (isSignUp) {
        action = loginHandler(userName, password);
      } else {
        action = signupHandler(userName, password);
      }
      setError(null);
      try {
        await dispatch(action);
        setUserName("");
        setPassword("");
        props.navigation.navigate("Shop");
      } catch (err) {
        setError(err.message);
      }
    } else {
      Alert.alert("Alert!", "Please enter valid inputs", [{ text: "Okay" }]);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Alert!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title={isSignUp ? "Login" : "Sign Up"}
              color="#bf1557"
              onPress={authHandler}
            />
          </View>
          <View style={styles.btn1}>
            <Button
              title={`Switch to ${isSignUp ? "Sign Up" : "Login"}`}
              color="#bf1557"
              onPress={() => setIsSignUp((prev) => !prev)}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Login",
  headerStyle: {
    backgroundColor: "#bf1557",
  },
  headerTintColor: "#fff",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  formControl: { width: "100%", paddingHorizontal: 20 },
  label: {
    fontFamily: "popins-medium",
    fontSize: 14,
    marginVertical: 10,
  },
  input: {
    fontFamily: "popins-medium",
    fontSize: 14,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorMsg: {
    color: "#bf1557",
  },
  btn: {
    width: "60%",
    marginVertical: 15,
    paddingTop: 15,
  },
  btn1: {
    width: "60%",
  },
});

export default AuthScreen;
