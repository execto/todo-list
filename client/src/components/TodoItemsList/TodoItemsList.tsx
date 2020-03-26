import * as React from "react";

import { List } from "antd";
import { Todo } from "../TodoItem/TodoItem";
import { TodoItem } from "../../models/todoModels";
import { store } from "../../App";

export type TodoItemsListProps = {};

export const TodoItemsList: React.FC<TodoItemsListProps> = props => {
	const [todoItems, setTodoItems] = React.useState<TodoItem[]>(
		store.getState().todoItems
	);

	React.useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const todoItems = store.getState().todoItems;
			setTodoItems(todoItems);
		});

		return unsubscribe;
	}, [todoItems]);
	return (
		<List>
			{todoItems.map(item => (
				<Todo key={item.id} todoItem={item} />
			))}
		</List>
	);
};
