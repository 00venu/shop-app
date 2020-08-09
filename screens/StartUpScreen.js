import React, { useEffect } from "react";
import { View, Text, AsyncStorage, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const userDataConverted = JSON.parse(userData);
      const { token, userId, expiryDate } = userDataConverted;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }
      props.navigation.navigate("Shop");
      dispatch(authenticate(token, userId));
      console.log(token);
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#bf1557" />
    </View>
  );
};

export default StartUpScreen;
