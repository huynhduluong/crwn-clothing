import { RootState } from './../store';
import { createSelector } from "reselect"
import { UserState } from "./userReducer"


const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
)