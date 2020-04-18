import { TodoActions, TodoListActions } from "../actions";
import { Action, StoreState } from "../../reducers/mainReducer";
import { Dispatch } from "redux";
import { apiUrl } from "../../../helpers/constants";
import { store, apiService } from "../../../App";

export const tododLoadStart = (): Action => {
	return {
		type: TodoListActions.TODOS_LOAD_START,
	};
};

export const todosLoadError = (error): Action => {
	return {
		type: TodoListActions.TODOS_LOAD_ERROR,
		context: {
			error,
		},
	};
};

export const todosLoadComplete = (items): Action => {
	return {
		type: TodoListActions.TODOS_LOAD_COMPLETE,
		context: {
			items,
		},
	};
};

export const getTodos = () => {
	return (dispatch: Dispatch, getState) => {
		dispatch(tododLoadStart());
		const state = getState() as StoreState;
		if (state.todosListState.hasCache) {
			store.dispatch(todosLoadComplete(state.todosListState.items));
			return;
		}

		return fetch(`${apiUrl}todos`)
			.then(
				(res) => apiService.handleApiError(res),
				(err) => {
					dispatch(todosLoadError(err));
					throw new Error(err);
				}
			)
			.then(
				(res) => store.dispatch(todosLoadComplete(res)),
				(err) => dispatch(todosLoadError(err))
			);
	};
};

export const saveTodo = (todo) => {
	const successAction = (item) => {
		return {
			type: TodoListActions.TODOS_MODIFIED,
			context: {
				actionType: TodoActions.ADD_TODO,
				todo: item,
			},
		};
	};

	return (dispatch: Dispatch) => {
		return fetch(`${apiUrl}todos`, {
			method: "POST",
			body: JSON.stringify(todo),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(
				(res) => apiService.handleApiError(res),
				(err) => console.log(err)
			)
			.then((res) => dispatch(successAction(res)));
	};
};

export const deleteTodo = (todoId: number) => {
	const successAction = {
		type: TodoListActions.TODOS_MODIFIED,
		context: { actionType: TodoActions.DELTE_TODO, todoId },
	};

	return (dispatch: Dispatch) => {
		return fetch(`${apiUrl}todos`, {
			method: "DELETE",
			body: JSON.stringify({ todoId }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(
				(res) => apiService.handleApiError(res),
				(err) => console.log(err)
			)
			.then(() => dispatch(successAction));
	};
};

export const toggleComplete = (todoId: number, value: boolean) => {
	const successAction = {
		type: TodoListActions.TODOS_MODIFIED,
		context: { actionType: TodoActions.TOGGLE_TODO, todoId },
	};
	const newCompleteValue = { complete: !value };

	return (dispatch: Dispatch) => {
		return fetch(`${apiUrl}todos`, {
			method: "PUT",
			body: JSON.stringify({ todoId, fieldsToUpdate: newCompleteValue }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(
				(res) => apiService.handleApiError(res),
				(err) => console.log(err)
			)
			.then(() => dispatch(successAction));
	};
};

export const toggleImportant = (todoId: number, value: boolean) => {
	const successAction = {
		type: TodoListActions.TODOS_MODIFIED,
		context: { actionType: TodoActions.TOGGLE_IMPORTANT, todoId },
	};
	const newImportantValue = { important: !value };

	return (dispatch: Dispatch) => {
		return fetch(`${apiUrl}todos`, {
			method: "PUT",
			body: JSON.stringify({ todoId, fieldsToUpdate: newImportantValue }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(
				(res) => apiService.handleApiError(res),
				(err) => console.log(err)
			)
			.then(() => dispatch(successAction));
	};
};
