import * as React from "react";

import { List, Result, Row, Col, Button } from "antd";
import { Todo } from "../TodoItem/TodoItem";
import { TodoItem } from "../../models/todoModels";
import { connect } from "react-redux";
import { StoreState } from "../../store/reducers/mainReducer";
import { store } from "../../App";
import { getTodos } from "../../store/actions/creators/todoCreators";
import { Link } from "react-router-dom";

export type TodoItemsListProps = {
	todoItems: TodoItem[];
	isLoading: boolean;
	hasError: boolean;
};

const TodoItemsListContainer: React.FC<TodoItemsListProps> = (props) => {
	const todoItems = props.todoItems;
	React.useEffect(() => {
		store.dispatch(getTodos() as any);
	}, []);
	return props.hasError && !props.isLoading ? (
		<Result status="error" title="Не удалось загрузить список дел" />
	) : (
		<>
			{!props.isLoading && (
				<Row justify="center" gutter={[0, 8]}>
					<Col>
						<Link to="/add-todo">
							<Button type="primary">Добавить дело</Button>
						</Link>
					</Col>
				</Row>
			)}
			<Row>
				<Col span={24}>
					<List loading={props.isLoading}>
						{todoItems &&
							todoItems.map((item) => <Todo key={item.id} todoItem={item} />)}
					</List>
				</Col>
			</Row>
		</>
	); //TODO: refactor to skeleton
};

const mapStateToProps = (state: StoreState) => {
	return {
		todoItems: state.todosListState.items,
		isLoading: state.todosListState.loading,
		hasError: state.todosListState.error,
	};
};

export const TodoItemsList = connect(mapStateToProps)(TodoItemsListContainer);
