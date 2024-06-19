import { combineReducers, createStore } from "redux";
import ReducerBook from "./reduces/List";

const rootReducer = combineReducers({
  bookReducer: ReducerBook,
});

const store = createStore(rootReducer);

export default store;