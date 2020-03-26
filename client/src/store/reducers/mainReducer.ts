import { TodoFilters } from "../actions/actions";
import { TodoItem } from "../../models/todoModels";
import { filterReducer } from "./filterReducer";
import { todoReducer } from "./todoReducer";

export type StoreState = {
	filter: TodoFilters;
	todoItems: TodoItem[];
};

export type Action = {
	type: string;
	context: any;
};

const initState: StoreState = {
	filter: TodoFilters.SHOW_ALL,
	todoItems: [
		{
			name: "Design the app",
			complete: true,
			important: true,
			todoDate: new Date(),
			id: 1
		},
		{
			name: "Design the architecture",
			complete: false,
			important: true,
			todoDate: new Date(),
			id: 2
		}
	]
};

export const todoApp = (state = initState, action: Action): StoreState => {
	return {
		filter: filterReducer(state, action),
		todoItems: todoReducer(state, action)
	};
};
