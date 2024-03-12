import { combineReducers } from "redux";

// import slices
import mainSliceReducer from "./slices/mainSlice";

const rootReducer = combineReducers({
  userDetails: mainSliceReducer,
});

export default rootReducer;
