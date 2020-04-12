import { StoreState, Action } from "./mainReducer";
import { UserActions } from "../actions/actions";

export type AuthReducerContext = {
	isAuthenticated: boolean;
};

export const authReducer = (state: StoreState, action: Action): boolean => {
	switch (action.type) {
		case UserActions.LOG_IN:
			return true;
		case UserActions.LOG_OUT:
			return false;
		default:
			return state.isAuthenticated;
	}
};
