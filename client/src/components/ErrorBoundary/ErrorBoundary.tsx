import * as React from "react";
import { Result } from "antd";

interface IProps {}
interface IState {
	hasError: boolean;
	error: any;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	componentDidCatch(error) {
		this.setState({
			hasError: true,
			error: {
				msg: error.message,
				stack: error.stack,
			},
		});
	}

	render() {
		return this.state.hasError ? (
			<Result
				status="error"
				title="Something gone wrong"
				subTitle={this.state.error.msg}
			>
				<pre>{this.state.error.stack}</pre>
			</Result>
		) : (
			this.props.children
		);
	}
}
