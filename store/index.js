import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import authReducer from "./authSlice";
// import productsReducer from "./productsSlice";
import productsReducer from "./productSlice";

const combinedReducer = combineReducers({
  user: authReducer,
  products: productsReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export function makeStore() {
  return configureStore({
    reducer: reducer,
  });
}

const store = makeStore();

// export an assembled wrapper
export const wrapper = createWrapper(makeStore);

export default store;
