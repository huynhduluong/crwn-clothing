import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_TYPES } from "./category.types";

export const setCategories = (categories) => createAction(CATEGORIES_TYPES.SET_CATEGORIES, categories)