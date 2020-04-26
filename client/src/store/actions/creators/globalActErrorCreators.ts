import { Action, UnhandledError } from "../../reducers/mainReducer";
import { GlobalErrorActons } from "../actions";

export const setGlobalError = (error): Action => {
	return {
		type: GlobalErrorActons.SET_GLOBAL_ERROR,
		context: {
			error,
		},
	};
};

export const unsetGlobalError = (): Action => {
	return {
		type: GlobalErrorActons.UNSET_GLOBAL_ERROR,
	};
};
