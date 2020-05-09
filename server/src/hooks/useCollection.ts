import { Request } from "express";
import { Db } from "mongodb";

export const useCollection = (req: Request, collName: string) => {
	const db: Db = req.app.locals.db;
	const collection = db.collection(collName);
	return collection;
};
