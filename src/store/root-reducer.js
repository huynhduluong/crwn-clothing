import { combineReducers } from "redux";
import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer
})