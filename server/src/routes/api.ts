import express, { Request } from "express";
import { Db, ObjectId } from "mongodb";

const router = express.Router();

const useCollection = (req: Request, collName: string) => {
	const db: Db = req.app.locals.db;
	const collection = db.collection(collName);
	return collection;
};

router.get("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	collection
		.find({})
		.toArray()
		.then((result) => res.json(result))
		.catch((err) => res.status(500).json({ error: err }));
});

router.post("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	collection
		.insertOne(req.body)
		.then((result) => res.json(result))
		.catch((err) => res.status(500).json({ error: err }));
});

router.delete("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	const todoId = req.body.todoId;
	collection
		.deleteOne({ _id: new ObjectId(todoId) })
		.then((result) => res.json(result))
		.catch((err) => res.status(500).json({ error: err }));
});

router.put("/todos", (req, res) => {
	const collection = useCollection(req, "todos");
	const todoId = req.body.todoId;
	const fieldsToUpdate = req.body.fieldsToUpdate;
	collection
		.updateOne({ _id: new ObjectId(todoId) }, { $set: fieldsToUpdate })
		.then((result) => res.json(result))
		.catch((err) => res.status(500).json({ error: err }));
});

export default router;
