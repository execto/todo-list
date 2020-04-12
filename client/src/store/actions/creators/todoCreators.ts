import { TodoActions, TodoListActions } from "../actions";
import { Action } from "../../reducers/mainReducer";
import { Dispatch } from "redux";
import { apiUrl } from "../../../helpers/constants";

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
	const proccesedItems = items.map((item) => ({ ...item, id: item._id }));
	return {
		type: TodoListActions.TODOS_LOAD_COMPLETE,
		context: {
			items: proccesedItems,
		},
	};
};

export const getTodos = () => {
	return (dispatch: Dispatch) => {
		dispatch(tododLoadStart());

		return fetch(`${apiUrl}todos`).then(
			(res) => res.json().then((res) => dispatch(todosLoadComplete(res))),
			(err) => dispatch(todosLoadError(err))
		);
	};
};

export const saveTodo = (todo) => {
	return (dispatch: Dispatch) => {
		return fetch(`${apiUrl}todos`, {
			method: "POST",
			body: JSON.stringify(todo),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};
};

export const deleteTodo = (todoId: number) => {
	const successAction = {
		type: TodoListActions.TODOS_MODIFIED,
		context: { actionType: TodoActions.DELTE_TODO, todoId },
	};

	return (dispath: Dispatch) => {
		return fetch(`${apiUrl}todos`, {
			method: "DELETE",
			body: JSON.stringify({ todoId }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => dispath(successAction));
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
		}).then(() => dispatch(successAction));
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
		}).then(() => dispatch(successAction));
	};
};
