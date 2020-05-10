import * as React from "react";
import { createStore, applyMiddleware } from "redux";
import { todoApp } from "./store/reducers/mainReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { TodoApp } from "./TodoApp";
import { DataService } from "./services/DataService";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { TodoService } from "./services/TodoService";
import { ApiService } from "./services/ApiService";
import { GlobalErrorHandler } from "./components/GlobalErrorHandler/GlobalErrorHandler";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { proccessTodosToUI } from "./store/middlewares/todoMiddlewares";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";

export const dataService = new DataService();
export const todoService = new TodoService();
export const apiService = new ApiService();

export const store = createStore(
	todoApp,
	applyMiddleware(proccessTodosToUI, thunk)
);

const App = () => {
	return (
		<Provider store={store}>
			<GlobalErrorHandler>
				<ErrorBoundary>
					<Router>
						<Switch>
							<Route exact path="/login">
								<LoginPage />
							</Route>
							<Route exact path="/sign-up">
								<RegistrationPage />
							</Route>
							<Route path="/">
								<TodoApp />
							</Route>
						</Switch>
					</Router>
				</ErrorBoundary>
			</GlobalErrorHandler>
		</Provider>
	);
};
export { App };
