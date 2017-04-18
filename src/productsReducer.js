import axios from 'axios';

const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
const DESTROY_PRODUCT_SUCCESS = 'DESTROY_PRODUCT_SUCCESS';
const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';




// Load all products
const loadProductsSuccess = (products) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
});

const loadProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then(response => dispatch(loadProductsSuccess(response.data)));
  };
};

// Destroy a product
const destroyProductSuccess = (product) => ({
  type: DESTROY_PRODUCT_SUCCESS,
  product: product
});

const destroyProduct = (product) => {
  return (dispatch) => {
    return axios.delete(`/api/products/${product.id}`)
      .then(() => dispatch(destroyProductSuccess(product)));
  };
};

// Add a product
const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  product: product
});


const addProduct = (product) => {
  return (dispatch) => {
    return axios.post('/api/products', product)
      .then(response => dispatch(addProductSuccess(response.data)));
  };
};


const productsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_SUCCESS:
      state = action.products;
      break;
    case DESTROY_PRODUCT_SUCCESS:
      state = state.filter(product => product.id !== action.product.id);
      break;
    case ADD_PRODUCT_SUCCESS:
      state =  state.concat(action.product);
      break;
  }
  return state;
};





export {
  destroyProduct,
  loadProducts,
  addProduct
};


export default productsReducer;
