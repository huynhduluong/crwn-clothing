
import { CATEGORIES_TYPES, Category } from "./category.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, Error>

export type CategoryAction = FetchCategoriesFailed | FetchCategoriesStart | FetchCategoriesSuccess

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START))

export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccess => createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categories))

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error))