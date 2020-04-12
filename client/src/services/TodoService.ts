import { TodoItem } from "../models/todoModels";

export class TodoService {
	add(todoItems: TodoItem[], newTodo: TodoItem): TodoItem[] {
		return [...todoItems, newTodo];
	}

	delete(todoItems: TodoItem[], todoDeleteId: number): TodoItem[] {
		return todoItems.filter((item) => item.id !== todoDeleteId);
	}

	toggleTodo(todoItems: TodoItem[], todoToggleId: number): TodoItem[] {
		const idx = todoItems.findIndex((item) => item.id === todoToggleId);
		const todoItem = todoItems[idx];
		const newTodoItem = { ...todoItem };
		newTodoItem.complete = !todoItem.complete;
		return [
			...todoItems.slice(0, idx),
			newTodoItem,
			...todoItems.slice(idx + 1),
		];
	}

	toggleImportant(
		todoItems: TodoItem[],
		toggleImportantId: number
	): TodoItem[] {
		const idx = todoItems.findIndex((item) => item.id === toggleImportantId);
		const todoItem = todoItems[idx];
		if (todoItem.complete) {
			return todoItems;
		}
		const newTodoItem = { ...todoItem };
		newTodoItem.important = !todoItem.important;
		return [
			...todoItems.slice(0, idx),
			newTodoItem,
			...todoItems.slice(idx + 1),
		];
	}
}
