import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState, UnhandledError } from "../../store/reducers/mainReducer";
import { Drawer } from "antd";
import {
	setGlobalError,
	unsetGlobalError,
} from "../../store/actions/creators/globalActErrorCreators";
import { GlobalError } from "../../models/error";
import { Dispatch } from "redux";

import "./globalErrorHandlerStyles.scss";

const setupGlobalErrorHandlers = (dispatch: Dispatch, cb) => {
	window.onerror = (msg, url, lineNo, columnNo, error) => {
		const err: GlobalError = {
			type: error?.name || "Unknown type",
			message: error?.message || "Unknown reason",
			stack: error?.stack,
		};
		dispatch(setGlobalError(err));
		return true;
	};

	window.addEventListener("unhandledrejection", function (event) {
		const error: GlobalError = {
			type: event.type || "Unknown type",
			message: event?.reason?.message || "Unknown reason",
		};
		dispatch(setGlobalError(error));
	});
	cb();
};

export const GlobalErrorHandler: React.FC = (props) => {
	const [handlerIsSetup, setHandlerIsSetup] = React.useState<boolean>(false);
	const errorState: UnhandledError = useSelector(
		(state: StoreState) => state.unhandledError
	);
	const { hasError, error } = errorState;
	const dispatch = useDispatch();

	!handlerIsSetup &&
		setupGlobalErrorHandlers(dispatch, () => setHandlerIsSetup(true));

	const onClose = React.useCallback(() => dispatch(unsetGlobalError()), []);
	console.log(error);
	return (
		<>
			<Drawer
				title={error?.type}
				placement="bottom"
				closable={true}
				destroyOnClose={true}
				onClose={onClose}
				visible={hasError}
				className="global-error"
			>
				{hasError && <div className="global-error__msg">{error?.message}</div>}
				{error?.stack && (
					<pre className="global-error__stack">{error.stack}</pre>
				)}
			</Drawer>
			{props.children}
		</>
	);
};
