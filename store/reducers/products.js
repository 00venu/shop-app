import PRODUCTS from "./../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from "../actions/products";

import Product from "./../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.concat(action.products),
        userProducts: state.userProducts.concat(action.products),
      };

    case CREATE_PRODUCT:
      const createProduct = new Product(
        action.productData.id,
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(createProduct),
        userProducts: state.userProducts.concat(createProduct),
      };
    case UPDATE_PRODUCT:
      //id, ownerId, title, imageUrl, description, price
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      //console.log(action.productData);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updateUserProduct = [...state.userProducts];
      updateUserProduct[productIndex] = updatedProduct;
      const avlProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updateAvlProducts = [...state.availableProducts];
      updateAvlProducts[avlProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updateAvlProducts,
        userProducts: updateUserProduct,
      };
    case DELETE_PRODUCT:
      const updatedProducts = state.availableProducts.filter(
        (product) => product.id !== action.pid
      );
      const updatedUserProducts = state.userProducts.filter(
        (product) => product.id !== action.pid
      );
      return {
        ...state,
        availableProducts: updatedProducts,
        userProducts: updatedUserProducts,
      };
  }
  return state;
};

export default ProductReducer;
