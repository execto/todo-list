import { TodoItem, UITodoItem } from "../models/todoModels";

export class DataService {
	prepareTodo(todo: UITodoItem) {
		return {
			...todo,
			date: todo.date.toDate(),
			complete: false,
		};
	}
}
