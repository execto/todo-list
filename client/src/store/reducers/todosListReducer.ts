import { StoreState, Action, TodosListState } from "./mainReducer";
import { TodoListActions, TodoActions } from "../actions/actions";
import { filterReducer } from "./filterReducer";
import { todoReducer } from "./todoReducer";

export const todosListReducer = (
	state: StoreState,
	action: Action
): TodosListState => {
	const todosListState = state.todosListState;

	if (TodoActions[action.type]) {
		return Object.assign({}, todosListState, {
			items: todoReducer(todosListState.items, action),
		});
	}

	switch (action.type) {
		case TodoListActions.SET_FILTER:
			return Object.assign({}, todosListState, {
				filter: filterReducer(state, action),
			});
		case TodoListActions.TODOS_LOAD_START:
			return Object.assign({}, todosListState, {
				loading: true,
			});
		case TodoListActions.TODOS_LOAD_ERROR:
			return Object.assign({}, todosListState, {
				loading: false,
				error: true,
			});
		case TodoListActions.TODOS_LOAD_COMPLETE:
			return Object.assign({}, todosListState, {
				hasCache: true,
				loading: false,
				error: false,
				items: action.context.items,
			});
		default:
			return todosListState;
	}
};
