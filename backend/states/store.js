import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
const middleware = [thunk];

// const store = createStore(rootReducer, applyMiddleware(...middleware));

// export default store;

export default configureStore({
  reducer: { rootReducer },
});
