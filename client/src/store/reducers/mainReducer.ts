import { TodoFilters } from "../actions/actions";
import { TodoItem } from "../../models/todoModels";
import { authReducer } from "./authReducer";
import { todosListReducer } from "./todosListReducer";
import { globalErrorReducer } from "./globalErrorReducer";
import { User } from "../../models/user";
import { GlobalError } from "../../models/error";

export type TodosListState = {
	hasCache: boolean;
	loading: boolean;
	filter: TodoFilters;
	error: boolean;
	items: TodoItem[];
};

export type UnhandledError = {
	hasError: boolean;
	error: GlobalError | null;
};

export type UserState = {
	isAuth: boolean;
	fetching: boolean;
	user: User | null;
};

export type StoreState = {
	unhandledError: UnhandledError;
	userState: UserState;
	todosListState: TodosListState;
};

export type Action = {
	type: string;
	context?: any;
};

const initState: StoreState = {
	unhandledError: {
		hasError: false,
		error: null,
	},
	userState: {
		isAuth: false,
		fetching: false,
		user: null,
	},
	todosListState: {
		hasCache: false,
		loading: false,
		filter: TodoFilters.SHOW_ALL,
		error: false,
		items: [],
	},
};

export const todoApp = (state = initState, action: Action): StoreState => {
	return {
		unhandledError: globalErrorReducer(state, action),
		userState: {
			isAuth: true,
			fetching: false,
			user: null,
		},
		todosListState: todosListReducer(state, action),
	};
};
