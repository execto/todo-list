import * as React from "react";

import { List, Button } from "antd";
import { Typography } from "antd";
import {
	DeleteOutlined,
	CheckOutlined,
	ExclamationOutlined
} from "@ant-design/icons";

import { TodoItem } from "../../models/todoModels";
import {
	deleteTodo,
	togleTodo,
	markTodoAsImportant
} from "../../store/actions/creators/todoCreators";
import { store } from "../../App";

type TodoProps = {
	todoItem: TodoItem;
};

export const Todo: React.FC<TodoProps> = props => {
	const todoItem = props.todoItem;
	return (
		<List.Item
			actions={[
				<MarkAsImportantButton todoId={todoItem.id} />,
				<MarkAsDoneButton todoId={todoItem.id} />,
				<DeleteButton todoId={todoItem.id} />
			]}
		>
			<List.Item.Meta
				title={
					<Typography.Text
						delete={todoItem.complete}
						mark={todoItem.important && !todoItem.complete}
					>
						{todoItem.name}
					</Typography.Text>
				}
			/>
		</List.Item>
	);
};

export type TodoActionButton = {
	todoId: number;
};

const DeleteButton: React.FC<TodoActionButton> = props => {
	const handleClick = () => store.dispatch(deleteTodo(props.todoId));
	return (
		<Button
			onClick={handleClick}
			type="ghost"
			icon={<DeleteOutlined />}
			size="small"
			danger
		/>
	);
};

const MarkAsDoneButton: React.FC<TodoActionButton> = props => {
	const handleClick = () => store.dispatch(togleTodo(props.todoId));
	return (
		<Button
			onClick={handleClick}
			type="primary"
			icon={<CheckOutlined />}
			size="small"
			ghost
		/>
	);
};

const MarkAsImportantButton: React.FC<TodoActionButton> = props => {
	const handleClick = () => store.dispatch(markTodoAsImportant(props.todoId));
	return (
		<Button
			onClick={handleClick}
			type="ghost"
			icon={<ExclamationOutlined />}
			size="small"
		/>
	);
};
