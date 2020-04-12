import { StoreState, Action } from "./mainReducer";
import { TodoItem } from "../../models/todoModels";
import { TodoActions } from "../actions/actions";
import { TodoService } from "../../services/TodoService";
import { todoService } from "../../App";

export const todoReducer = (
	todoItems: TodoItem[],
	context: any
): TodoItem[] => {
	switch (context.actionType) {
		case TodoActions.DELTE_TODO:
			return todoService.delete(todoItems, context.todoId);
		case TodoActions.TOGGLE_IMPORTANT:
			return todoService.toggleImportant(todoItems, context.todoId);
		case TodoActions.TOGGLE_TODO:
			return todoService.toggleTodo(todoItems, context.todoId);
		case TodoActions.ADD_TODO:
			return todoService.add(todoItems, context.todo);
		default:
			return todoItems;
	}
};
