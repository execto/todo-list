import * as React from "react";

export type WrapperProps = {
	className?: string;
};

export const Wrapper: React.FC<WrapperProps> = (props) => {
	const spreadingCls = props.className || "";
	return <div className={`wrapper ${spreadingCls}`}>{props.children}</div>;
};
