import { StoreState, Action, UnhandledError } from "./mainReducer";
import { GlobalErrorActons } from "../actions/actions";

export const globalErrorReducer = (
	state: StoreState,
	action: Action
): UnhandledError => {
	const unhandledError = state.unhandledError;
	switch (action.type) {
		case GlobalErrorActons.SET_GLOBAL_ERROR:
			return {
				hasError: true,
				error: action.context.error,
			};
		case GlobalErrorActons.UNSET_GLOBAL_ERROR:
			return {
				hasError: false,
				error: null,
			};
		default:
			return unhandledError;
	}
};
