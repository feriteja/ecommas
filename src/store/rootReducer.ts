import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import your auth reducer
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // Add more reducers as needed
});

export default rootReducer;
