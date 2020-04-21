import * as React from "react";
import { Link } from "react-router-dom";

import "./textLinkStyles.scss";

export type TextLinkProps = {
	path: string;
	disable?: boolean;
};

export const TextLink: React.FC<TextLinkProps> = (props) => {
	return (
		<Link to={props.path} className="todoapp-link">
			{props.children}
		</Link>
	);
};
