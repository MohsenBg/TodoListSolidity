import { reducerLoading } from "./../Loading/Reducer";
import { reducerAccountInfo } from "../AccountInfo/reducer/Reducer";
import { combineReducers } from "redux";

export const RootReducer = combineReducers({
  AccountData: reducerAccountInfo,
  Loading: reducerLoading,
});
