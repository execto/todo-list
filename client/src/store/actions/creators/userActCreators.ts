import { UserActions } from "../actions";
import { makeAction } from "../../../helpers/appHelpers";
import { apiUrl } from "../../../helpers/constants";
import { apiService } from "../../../App";

export const signUp = (signUpData) => {
	const signUpStart = makeAction(UserActions.SIGN_UP_START);
	const signUpSuccess = makeAction(UserActions.SIGN_UP);

	const asyncAction = {
		actions: [signUpStart, signUpSuccess, null],
		apiCall: () =>
			fetch(`${apiUrl}user/signup`, {
				method: "POST",
				body: JSON.stringify(signUpData),
				headers: {
					"Content-Type": "application/json",
				},
			}),
	};

	return apiService.request(asyncAction);
};
