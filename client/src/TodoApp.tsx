import * as React from "react";
import { store } from "./App";
import { Redirect, Route, Switch } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import AddTodoPage from "./pages/AddTodoPage/AddTodoPage";

export const TodoApp: React.FC = () => {
	const isAuth = store.getState().isAuthenticated;
	if (!isAuth) {
		return <Redirect to="/login" />;
	}
	return (
		<Switch>
			<Route exact path="/">
				<MainPage />
			</Route>
			<Route path="/add-todo">
				<AddTodoPage />
			</Route>
			<Route exact path="/profile">
				<ProfilePage />
			</Route>
		</Switch>
	);
};
