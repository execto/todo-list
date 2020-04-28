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

export const todosApiCall = (asyncAction) => {
	const { actions, shouldFetch, apiCall } = asyncAction;
	const [fetching, fetchSuccess, fetchError] = actions;

	return (dispatch: Dispatch, getState) => {
		if (shouldFetch && !shouldFetch(getState())) {
			return;
		}

		fetching && dispatch(fetching());

		return apiCall()
			.then(
				(res) => apiService.handleApiError(res),
				(err) => {
					fetchError && dispatch(fetchError(err));
					throw new Error(err);
				}
			)
			.then((res) => fetchSuccess && dispatch(fetchSuccess(res)));
	};
};

export const getTodos = () => {
	const asyncAction = {
		actions: [tododLoadStart, todosLoadComplete, todosLoadError],
		shouldFetch: (state: StoreState) => !state.todosListState.hasCache,
		apiCall: () => fetch(`${apiUrl}todos`),
	};

	return todosApiCall(asyncAction);
};

export const saveTodo = (todo) => {
	const successAction = (item) => {
		return {
			type: TodoActions.ADD_TODO,
			context: {
				todo: item,
			},
		};
	};

	const asyncAction = {
		actions: [null, successAction, null],
		apiCall: () =>
			fetch(`${apiUrl}todos`, {
				method: "POST",
				body: JSON.stringify(todo),
				headers: {
					"Content-Type": "application/json",
				},
			}),
	};

	return todosApiCall(asyncAction);
};

export const deleteTodo = (todoId: number) => {
	const successAction = {
		type: TodoActions.DELETE_TODO,
		context: { todoId },
	};

	const asyncAction = {
		actions: [null, () => successAction, null],
		apiCall: () =>
			fetch(`${apiUrl}todos`, {
				method: "DELETE",
				body: JSON.stringify({ todoId }),
				headers: {
					"Content-Type": "application/json",
				},
			}),
	};

	return todosApiCall(asyncAction);
};

export const toggleComplete = (todoId: number, value: boolean) => {
	const successAction = {
		type: TodoActions.TOGGLE_TODO,
		context: { todoId },
	};
	const newCompleteValue = { complete: !value };

	const asyncAction = {
		actions: [null, () => successAction, null],
		apiCall: () =>
			fetch(`${apiUrl}todos`, {
				method: "PUT",
				body: JSON.stringify({ todoId, fieldsToUpdate: newCompleteValue }),
				headers: {
					"Content-Type": "application/json",
				},
			}),
	};

	return todosApiCall(asyncAction);
};

export const toggleImportant = (todoId: number, value: boolean) => {
	const successAction = {
		type: TodoActions.TOGGLE_IMPORTANT,
		context: { todoId },
	};
	const newImportantValue = { important: !value };

	const asyncAction = {
		actions: [null, () => successAction, null],
		apiCall: () =>
			fetch(`${apiUrl}todos`, {
				method: "PUT",
				body: JSON.stringify({ todoId, fieldsToUpdate: newImportantValue }),
				headers: {
					"Content-Type": "application/json",
				},
			}),
	};

	return todosApiCall(asyncAction);
};
