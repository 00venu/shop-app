import React, { useReducer } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const InputChange = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(InputChange, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initialValid,
    touched: false,
  });

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={props.value}
        onChangeText={props.changeText}
      />
      {props.value.length === 0 && (
        <View>
          <Text style={styles.errorMsg}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Input;
