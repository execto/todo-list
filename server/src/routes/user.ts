import express, { Request, Response } from "express";
import { Db, ObjectId } from "mongodb";

const router = express.Router();

const useCollection = (req: Request, collName: string) => {
	const db: Db = req.app.locals.db;
	const collection = db.collection(collName);
	return collection;
};

router.post("/sigin", (req, res) => {});

router.post("/signup", (req, res) => {});

router.post("/signout", (req, res) => {});

router.post("/resetpass", (req, res) => {});

export default router;
