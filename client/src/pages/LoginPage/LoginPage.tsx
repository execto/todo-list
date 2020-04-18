import * as React from "react";
import { store } from "../../App";
import { Redirect } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import Title from "antd/lib/typography/Title";

import "./loginPageStyles.scss";

export const LoginPage = () => {
	const isAuth = store.getState().isAuthenticated;
	if (isAuth) {
		return <Redirect to="/" />;
	}
	return (
		<div className="login-page">
			<div className="login-page__wrapper">
				<Row
					className="login-page__wrapper--logo"
					align="middle"
					justify="center"
				>
					<Col>
						<Typography>
							<Title>TO DO</Title>
						</Typography>
					</Col>
				</Row>
				<Row>
					<Col>Inputs</Col>
				</Row>
				<Row>
					<Col>restore password and sign up</Col>
				</Row>
			</div>
		</div>
	);
};
