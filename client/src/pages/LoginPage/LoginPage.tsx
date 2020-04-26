import * as React from "react";
import { store } from "../../App";
import { Redirect } from "react-router-dom";
import { Row, Col, Typography, Form, Button, Checkbox, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { Wrapper } from "../../components/Wrapper";
import { useSelector, useDispatch } from "react-redux";

import "./loginPageStyles.scss";
import { StoreState } from "../../store/reducers/mainReducer";
import { useForm } from "antd/lib/form/util";
import { TextLink } from "../../components/TextLink/TextLink";

export const LoginPage = () => {
	const isAuth = useSelector((state: StoreState) => state.isAuthenticated);
	const [form] = useForm();
	if (isAuth) {
		return <Redirect to="/" />;
	}

	const onSubmit = () => {};

	return (
		<div className="login-page">
			<Wrapper className="login-page__wrapper">
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
					<Col span="24">
						<Form
							name="login-form"
							hideRequiredMark={true}
							initialValues={{ remember: true }}
							onFinish={onSubmit}
							onFinishFailed={() => {}}
							form={form}
							layout="vertical"
						>
							<Form.Item
								label="Логин или E-mail"
								name="username"
								rules={[
									{
										required: true,
										message: "Пожалуйста, введите логин или e-mail",
									},
								]}
							>
								<Input autoComplete="off" allowClear autoFocus />
							</Form.Item>

							<Form.Item
								label="Пароль"
								name="password"
								rules={[
									{ required: true, message: "Пожалуйста, введите пароль" },
								]}
							>
								<Input.Password autoComplete="off" allowClear />
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit">
									Войти
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
				<Row justify="space-between">
					<Col>
						<TextLink path="/sign-up">Регистрация</TextLink>
					</Col>
					<Col>
						<TextLink path="#">Забыли пароль?</TextLink>
					</Col>
				</Row>
			</Wrapper>
		</div>
	);
};
