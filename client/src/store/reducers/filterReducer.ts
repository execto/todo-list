import { StoreState, Action } from "./mainReducer";
import { TodoFilters, TodoListActions } from "../actions/actions";

export type FilterReducerContext = {
	filter: TodoFilters;
};

export const filterReducer = (
	state: StoreState,
	action: Action
): TodoFilters => {
	const context: FilterReducerContext = action.context;
	switch (action.type) {
		case TodoListActions.SET_FILTER:
			return context.filter;
		case TodoListActions.RESET_FILTER:
			return TodoFilters.SHOW_ALL;
		default:
			return state.todosListState.filter;
	}
};
