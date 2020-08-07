import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { createProduct, updateProduct } from "../../store/actions/products";
import Input from "./../../components/UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidity = {
      ...state.inputValidity,
      [action.input]: action.isValid,
    };
    let updateFormIsValid = true;
    for (const key in updateValidity) {
      updateFormIsValid = updateFormIsValid && updateValidity[key];
    }
    return {
      formIsValid: updateFormIsValid,
      inputValidity: updateValidity,
      inputValues: updatedValues,
    };
  }
};

const EditProductScreen = (props) => {
  const [error, setError] = useState(null);
  const prodId = props.navigation.getParam("prodictId");

  const userProducts = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const [formState, dispatchFormstate] = useReducer(formReducer, {
    inputValues: {
      title: userProducts ? userProducts.title : "",
      imageUrl: userProducts ? userProducts.imageUrl : "",
      desc: userProducts ? userProducts.description : "",
      price: "",
    },
    inputValidity: {
      title: userProducts ? true : false,
      imageUrl: userProducts ? true : false,
      desc: userProducts ? true : false,
      price: userProducts ? true : false,
    },
    formIsValid: userProducts ? true : false,
  });
  const dispatch = useDispatch();
  //console.log(formState.formIsValid);
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check the error in input", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);

    try {
      if (userProducts) {
        await dispatch(
          updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.desc
          )
        );
      } else {
        //title, imageUrl, description, price
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.desc,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }, [dispatch, prodId, formState, error]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert("Alert!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    //console.log(inputIdentifier);
    dispatchFormstate({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };
  return (
    <ScrollView>
      <Input
        label="Title"
        errorMessage="This Field is Required"
        value={formState.inputValues.title}
        changeText={inputChangeHandler.bind(this, "title")}
      />
      <Input
        label="Image Url"
        errorMessage="This Field is Required"
        value={formState.inputValues.imageUrl}
        changeText={inputChangeHandler.bind(this, "imageUrl")}
      />
      {!userProducts && (
        <Input
          label="Price"
          keyboardType="decimal-pad"
          errorMessage="This Field is Required"
          value={formState.inputValues.price}
          changeText={inputChangeHandler.bind(this, "price")}
        />
      )}
      <Input
        label="Description"
        errorMessage="This Field is Required"
        multiline
        numberOfLines={3}
        value={formState.inputValues.desc}
        changeText={inputChangeHandler.bind(this, "desc")}
      />
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("prodictId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="md-save" onPress={submitHandler} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default EditProductScreen;
