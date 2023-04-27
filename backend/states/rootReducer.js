import { combineReducers } from "redux";
import cardReducer from "../states/Reducers/cardReducer";
export default combineReducers({ card: cardReducer });
