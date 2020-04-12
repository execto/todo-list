import * as React from "react";
import { createStore, applyMiddleware } from "redux";
import { todoApp } from "./store/reducers/mainReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { TodoApp } from "./TodoApp";
import { DataService } from "./services/DataService";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { TodoService } from "./services/TodoService";

export const dataService = new DataService();
export const todoService = new TodoService();

export const store = createStore(todoApp, applyMiddleware(thunk));

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/">
						<TodoApp />
					</Route>
					<Route exact path="/login">
						<LoginPage />
					</Route>
				</Switch>
			</Router>
		</Provider>
	);
};
export { App };
