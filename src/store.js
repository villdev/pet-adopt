// import { createStore, compose, applyMiddleware } from "redux";
import { createStore } from "redux";
import reducer from "./reducers";

// const store = createStore(reducer);
const store = createStore(
  reducer,
  //basically if browser and redux devtools extension exists, use it else give it some bogus function
  typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;
