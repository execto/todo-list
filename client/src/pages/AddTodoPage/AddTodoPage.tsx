import * as React from "react";

import { Wrapper } from "../../components/Wrapper";
import {
	PageHeader,
	Row,
	Col,
	Button,
	Form,
	Input,
	Checkbox,
	DatePicker,
	Modal,
	Spin,
	Result,
} from "antd";
import { useForm } from "antd/lib/form/util";

import "./addTodoPage.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { dataService, store } from "../../App";
import { saveTodo } from "../../store/actions/creators/todoCreators";

export enum AddTodoStates {
	pending = "pending",
	processing = "processing",
	error = "error",
}
export type StoreValue = any;
export type Store = {
	[name: string]: StoreValue;
};

export type LoadingModalProps = {
	visible: boolean;
};

const tailLayout = {
	wrapperCol: { span: 32 },
};

const AddTodoPage = () => {
	const [saveProcessing, setSaveProcessing] = React.useState<boolean>(false);
	const [error, setError] = React.useState();
	const [form] = useForm();

	const onClearForm = () => {
		form.resetFields();
	};

	const onSubmit = (values: any) => {
		setSaveProcessing(true);
		const todo = dataService.prepareTodo(values);
		store
			.dispatch(saveTodo(todo) as any)
			.then(() => {
				setSaveProcessing(false);
				history.back();
			})
			.catch((err) => {
				setSaveProcessing(false);
				setError(err);
			});
	};

	const onCheckboxChange = (e: CheckboxChangeEvent) => {
		form.setFieldsValue({ important: e.target.checked });
	};
	return (
		<>
			<PageHeader
				className="site-page-header"
				title="Добавить дело"
				onBack={() => history.back()}
			/>
			{error && <Result status="error" title="Не удалось сохранить дело" />}
			<Wrapper>
				<Row>
					<Col span={24}>
						<Form
							layout="vertical"
							name="todo_form"
							form={form}
							onFinish={onSubmit}
						>
							<Form.Item
								label="Что нужно сделать"
								name="todo"
								rules={[
									{ required: true, message: "Пожалуйста, введите дело" },
								]}
							>
								<Input autoComplete="off" allowClear autoFocus />
							</Form.Item>

							<Form.Item
								label="Когда"
								name="date"
								rules={[
									{ required: true, message: "Пожалуйста, укажите дату" },
								]}
							>
								<DatePicker
									format="DD.MM.YYYY"
									className="add-todo-datepicker"
									placeholder=""
								/>
							</Form.Item>

							<Form.Item label="Описание" name="description">
								<Input.TextArea autoSize={{ minRows: 3 }} allowClear />
							</Form.Item>

							<Form.Item name="important">
								<Checkbox defaultChecked={false} onChange={onCheckboxChange}>
									Важное
								</Checkbox>
							</Form.Item>

							<Form.Item {...tailLayout}>
								<Button
									type="primary"
									htmlType="submit"
									className="add-todo-submit-btn"
									loading={saveProcessing}
								>
									Добавить
								</Button>
								<Button onClick={onClearForm} htmlType="submit">
									Отчистить
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Wrapper>
		</>
	);
};

export default AddTodoPage;
