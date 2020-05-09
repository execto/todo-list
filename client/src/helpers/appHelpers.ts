import { Action } from "../store/reducers/mainReducer";

export const makeAction = (type: string, data?: any): Action => {
	const action: Action = { type };
	if (data) {
		action.context = data;
	}

	return action;
};

export const makeActionCreator = (action: Action) => {
	if (!action) {
		return null;
	}

	if (typeof action === "function") {
		return action;
	}

	return () => makeAction(action.type, action.context || null);
};
