import * as React from "react";

import { List } from "antd";
import { Wrapper } from "../Wrapper";
import { TodoItemsList } from "../TodoItemsList/TodoItemsList";

export const Content = () => {
	return (
		<Wrapper>
			<TodoItemsList />
		</Wrapper>
	);
};
