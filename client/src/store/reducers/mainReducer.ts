import { TodoFilters } from "../actions/actions";
import { TodoItem } from "../../models/todoModels";
import { todoReducer } from "./todoReducer";
import { authReducer } from "./authReducer";
import { todosListReducer } from "./todosListReducer";

export type TodosListState = {
	loading: boolean;
	filter: TodoFilters;
	error: boolean;
	items: TodoItem[];
};

export type StoreState = {
	isAuthenticated: boolean;
	todosListState: TodosListState;
};

export type Action = {
	type: string;
	context?: any;
};

const initState: StoreState = {
	isAuthenticated: true,
	todosListState: {
		loading: false,
		filter: TodoFilters.SHOW_ALL,
		error: false,
		items: [],
	},
};

export const todoApp = (state = initState, action: Action): StoreState => {
	return {
		isAuthenticated: authReducer(state, action),
		todosListState: todosListReducer(state, action),
	};
};
