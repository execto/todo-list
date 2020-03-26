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
		default:
			return state.filter;
	}
};
