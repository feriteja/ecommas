import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import your auth reducer

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers as needed
});

export default rootReducer;
