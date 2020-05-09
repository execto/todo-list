import express from "express";
import { ObjectId } from "mongodb";
import { useCollection } from "../hooks/useCollection";

const router = express.Router();

router.get("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	collection
		.find({})
		.toArray()
		.then(res.locals.successRes)
		.catch(res.locals.errorRes);
});

router.post("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	collection
		.insertOne(req.body)
		.then((result) => res.locals.successRes(result.ops[0]))
		.catch(res.locals.errorRes);
});

router.delete("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	const todoId = req.body.todoId;
	collection
		.deleteOne({ _id: new ObjectId(todoId) })
		.then(res.locals.successRes)
		.catch(res.locals.errorRes);
});

router.put("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	const todoId = req.body.todoId;
	const fieldsToUpdate = req.body.fieldsToUpdate;
	collection
		.updateOne({ _id: new ObjectId(todoId) }, { $set: fieldsToUpdate })
		.then(res.locals.successRes)
		.catch(res.locals.errorRes);
});

export default router;
