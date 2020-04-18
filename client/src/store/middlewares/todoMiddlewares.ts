import { Action } from "../reducers/mainReducer";
import { TodoListActions, TodoActions } from "../actions/actions";

export const proccessTodosToUI = (store) => (next) => (action: Action) => {
	if (action.type === TodoListActions.TODOS_LOAD_COMPLETE) {
		const proccessedTodos = action.context.items.map((item) => ({
			...item,
			id: item._id,
		}));
		return next(
			Object.assign({}, action, {
				context: {
					items: proccessedTodos,
				},
			})
		);
	}

	if (
		action.type === TodoListActions.TODOS_MODIFIED &&
		action.context.actionType === TodoActions.ADD_TODO
	) {
		const todo = action.context.todo;
		const proccessedTodo = { ...todo, id: todo._id };
		return next(
			Object.assign({}, action, {
				context: {
					...action.context,
					todo: proccessedTodo,
				},
			})
		);
	}

	return next(action);
};
