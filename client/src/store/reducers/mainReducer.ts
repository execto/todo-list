import { TodoFilters } from "../actions/actions";
import { TodoItem } from "../../models/todoModels";
import { authReducer } from "./authReducer";
import { todosListReducer } from "./todosListReducer";
import { AddTodoStates } from "../../pages/AddTodoPage/AddTodoPage";

export type TodosListState = {
	hasCache: boolean;
	addState: AddTodoStates;
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
		hasCache: false,
		addState: AddTodoStates.pending,
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
