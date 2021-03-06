import Product from "../../models/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const setProduct = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://shop-app-a5e92.firebaseio.com/products.json"
    );
    const resData = await response.json();
    //console.log(resData);
    const getProducts = [];
    //id, ownerId, title, imageUrl, description, price
    for (const key in resData) {
      getProducts.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCT,
      products: getProducts,
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://shop-app-a5e92.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://shop-app-a5e92.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageUrl, description, price }),
      }
    );
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch) => {
    await fetch(`https://shop-app-a5e92.firebaseio.com/products/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, imageUrl, description }),
    });

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: { title, imageUrl, description },
    });
  };
};
