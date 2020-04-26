import * as React from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Form, Button, Input, PageHeader } from "antd";
import { Wrapper } from "../../components/Wrapper";
import { useForm } from "antd/lib/form/util";

import "./registrationPageStyles.scss";

export const RegistrationPage = () => {
	const [form] = useForm();

	const onSubmit = () => {};

	const onClearForm = () => {
		form.resetFields();
	};

	return (
		<div className="registration-page">
			<PageHeader
				className="site-page-header"
				title="Регистрация"
				onBack={() => history.back()}
			/>
			<Wrapper className="registration-page__wrapper">
				<Row>
					<Col span="24">
						<Form
							name="registration-form"
							initialValues={{ remember: true }}
							onFinish={onSubmit}
							onFinishFailed={() => {}}
							form={form}
							layout="vertical"
						>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: "Пожалуйста, введите Email",
									},
									{
										type: "email",
										message: "Неверный формат Email",
									},
								]}
							>
								<Input type="email" autoComplete="off" allowClear autoFocus />
							</Form.Item>
							<Form.Item
								label="Логин"
								name="login"
								rules={[
									{
										required: true,
										message: "Пожалуйста, введите логин",
									},
								]}
							>
								<Input autoComplete="off" allowClear />
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
							<Form.Item
								label="Повторите пароль"
								name="password-repeat"
								dependencies={["password"]}
								rules={[
									{
										required: true,
										message: "Пожалуйста, повторите пароль",
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (!value || getFieldValue("password") === value) {
												return Promise.resolve();
											}
											return Promise.reject("Пароли не совпадают");
										},
									}),
								]}
							>
								<Input.Password autoComplete="off" allowClear />
							</Form.Item>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className="registration-btn"
								>
									Регистрация
								</Button>
								<Button onClick={onClearForm} htmlType="submit">
									Отчистить
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Wrapper>
		</div>
	);
};
