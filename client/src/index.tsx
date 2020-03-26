import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

import "antd/dist/antd.css";
import "./main.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
