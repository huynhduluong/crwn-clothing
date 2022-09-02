import { CATEGORIES_TYPES } from "./category.types";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";

export const fetchCategoriesStart = () => createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categories) => createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categories)

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart())
    try {
        const categoryArray = await getCategoriesAndDocuments()
        dispatch(fetchCategoriesSuccess(categoryArray))
    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
    }
}