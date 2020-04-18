import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreState, UnhandledError } from "../../store/reducers/mainReducer";
import { Drawer } from "antd";
import {
	setGlobalError,
	unsetGlobalError,
} from "../../store/actions/creators/globalErrorCreators";

export const GlobalErrorHandler: React.FC = (props) => {
	const errorState: UnhandledError = useSelector(
		(state: StoreState) => state.unhandledError
	);
	const dispatch = useDispatch();

	window.onerror = (msg, url, lineNo, columnNo, error) => {
		dispatch(setGlobalError(error));
		return true;
	};

	window.addEventListener("unhandledrejection", function (event) {
		dispatch(setGlobalError(event.reason));
	});

	const onClose = () => {
		dispatch(unsetGlobalError());
	};

	return (
		<Drawer
			title="Something gone wrong"
			placement="bottom"
			closable={true}
			destroyOnClose={true}
			onClose={onClose}
			visible={errorState.hasError}
		>
			{errorState.hasError && <div>{errorState.error.toString()}</div>}
		</Drawer>
	);
};
