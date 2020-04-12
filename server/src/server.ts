import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routes/api";
import { MongoClient } from "mongodb";

const mongoUrl =
	"mongodb+srv://execto:saintgod1995@todo-lmebk.mongodb.net/test?retryWrites=true&w=majority";

const mongoClient = new MongoClient(mongoUrl);

const methodOvveride = require("method-override");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", req.headers.origin);
	res.set("Access-Control-Allow-Headers", "Content-Type");
	res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
	next();
});

app.use("/api", apiRouter);

mongoClient
	.connect()
	.then(() => {
		app.locals.db = mongoClient.db("Todo");
		app.listen(3001, () => console.log("server start on port 3001"));
	})
	.catch((err) => console.log(err));
