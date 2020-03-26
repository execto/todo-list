import { StoreState, Action } from "./mainReducer";
import { TodoItem } from "../../models/todoModels";
import { TodoActions } from "../actions/actions";
import { TodoService } from "../../services/TodoItemsService";

export const todoReducer = (state: StoreState, action: Action): TodoItem[] => {
	const todoService = new TodoService();

	const context = action.context;
	switch (action.type) {
		case TodoActions.DELTE_TODO:
			return todoService.delete(state.todoItems, context.todoId);
		case TodoActions.TOGGLE_IMPORTANT:
			return todoService.toggleImportant(state.todoItems, context.todoId);
		case TodoActions.TOGGLE_TODO:
			return todoService.toggleTodo(state.todoItems, context.todoId);
		case TodoActions.ADD_TODO:
			return todoService.add(state.todoItems, context.todoItem);
		default:
			return state.todoItems;
	}
};
