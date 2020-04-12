import * as React from "react";
import { store } from "../App";
import { Redirect } from "react-router-dom";

export const LoginPage = () => {
	const isAuth = store.getState().isAuthenticated;
	if (isAuth) {
		return <Redirect to="/" />;
	}
	return <div>Login page</div>;
};
