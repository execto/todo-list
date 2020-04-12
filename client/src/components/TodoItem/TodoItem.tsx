import * as React from "react";

import { List, Button } from "antd";
import { Typography } from "antd";
import {
	DeleteOutlined,
	CheckOutlined,
	ExclamationOutlined,
} from "@ant-design/icons";

import { TodoItem } from "../../models/todoModels";
import {
	deleteTodo,
	toggleComplete,
	toggleImportant,
} from "../../store/actions/creators/todoCreators";
import { store } from "../../App";

type TodoProps = {
	todoItem: TodoItem;
};

export const Todo: React.FC<TodoProps> = (props) => {
	const todoItem = props.todoItem;
	return (
		<List.Item
			actions={[
				<ToggleImportantButton
					todoId={todoItem.id}
					currentValue={todoItem.important}
					disabled={todoItem.complete}
				/>,
				<ToggleCompleteButton
					todoId={todoItem.id}
					currentValue={todoItem.complete}
				/>,
				<DeleteButton todoId={todoItem.id} />,
			]}
		>
			<List.Item.Meta
				title={
					<Typography.Text
						delete={todoItem.complete}
						mark={todoItem.important && !todoItem.complete}
					>
						{todoItem.todo}
					</Typography.Text>
				}
			/>
		</List.Item>
	);
};

export type TodoActionButton = {
	todoId: number;
	disabled?: boolean;
	currentValue?: any;
};

const DeleteButton: React.FC<TodoActionButton> = (props) => {
	const handleClick = () => store.dispatch(deleteTodo(props.todoId) as any);
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

const ToggleCompleteButton: React.FC<TodoActionButton> = (props) => {
	const handleClick = () =>
		store.dispatch(toggleComplete(props.todoId, props.currentValue) as any);
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

const ToggleImportantButton: React.FC<TodoActionButton> = (props) => {
	const handleClick = () =>
		store.dispatch(toggleImportant(props.todoId, props.currentValue) as any);
	return (
		<Button
			onClick={handleClick}
			type="ghost"
			icon={<ExclamationOutlined />}
			size="small"
			disabled={props.disabled}
		/>
	);
};
