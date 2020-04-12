import { Moment } from "moment";

export type TodoItem = {
	todo: string;
	complete: boolean;
	important: boolean;
	date: Date;
	id: number;
	description?: string;
};

export type UITodoItem = {
	todo: string;
	desciption: string;
	important: boolean;
	date: Moment;
};

export type TodoItemList = {
	todoItems: TodoItem[];
};
