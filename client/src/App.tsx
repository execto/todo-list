import * as React from "react";
import { Row, Col } from "antd";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { Content } from "./components/Content/Content";
import { WelcomeContent } from "./components/WelcomeContent/WelcomeContent";
import { createStore } from "redux";
import { todoApp } from "./store/reducers/mainReducer";

export const store = createStore(todoApp);

const App = () => {
	const user = true;
	return (
		<>
			<Row justify="end">
				<Col>
					<Toolbar />
				</Col>
			</Row>
			<Row>
				<Col span={24}>{user ? <Content /> : <WelcomeContent />}</Col>
			</Row>
		</>
	);
};
export { App };
