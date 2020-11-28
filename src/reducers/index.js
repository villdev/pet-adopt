import { combineReducers } from "redux"; //helper method that makes writing the root reducer easier
import location from "./location"; //location reducer
import theme from "./theme";

export default combineReducers({
  // location: location  //or just location
  location,
  theme,
});
