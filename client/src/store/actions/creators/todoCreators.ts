import { TodoActions } from "../actions";
import { Action } from "../../reducers/mainReducer";

export const deleteTodo = (todoId: number): Action => {
	return {
		type: TodoActions.DELTE_TODO,
		context: { todoId }
	};
};

export const togleTodo = (todoId: number): Action => {
	return {
		type: TodoActions.TOGGLE_TODO,
		context: { todoId }
	};
};

export const markTodoAsImportant = (todoId: number): Action => {
	return {
		type: TodoActions.TOGGLE_IMPORTANT,
		context: { todoId }
	};
};
