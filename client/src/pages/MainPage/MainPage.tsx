import * as React from "react";

import { Wrapper } from "../../components/Wrapper";
import { TodoItemsList } from "../../components/TodoItemsList/TodoItemsList";
import { PageHeader } from "antd";

export const MainPage = () => {
	return (
		<>
			<PageHeader className="site-page-header" title="Дела" />
			<Wrapper>
				<TodoItemsList />
			</Wrapper>
		</>
	);
};
