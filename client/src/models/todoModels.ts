export type TodoItem = {
	name: string;
	complete: boolean;
	important: boolean;
	todoDate: Date;
	id: number;
};

export type TodoItemList = {
	todoItems: TodoItem[];
};
