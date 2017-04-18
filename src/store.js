import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import productsReducer, { loadProducts} from './productsReducer';


const combined = combineReducers({
  auth: authReducer,
  products: productsReducer
});

const store = createStore(combined, applyMiddleware(thunk));


store.dispatch(loadProducts());

export default store;
