import express, { Request, Response } from "express";
import { Db, ObjectId } from "mongodb";
import { useCollection } from "../hooks/useCollection";
import argon2 from "argon2";

const router = express.Router();

router.post("/sigin", (req, res) => {});

router.post("/signup", async (req, res) => {
	const collection = useCollection(req, "users");
	const { email, login, password } = req.body;
	const user = await collection.findOne({ email });
	if (user) {
		res.locals.errorRes({ msg: "Пользователь с таким email уже существует" });
		return;
	}

	const hashedPassword = await argon2.hash(password);
	await collection.insertOne({
		login,
		email,
		password: hashedPassword,
	});
	res.locals.successRes({ login, email });
});

router.post("/signout", (req, res) => {});

router.post("/resetpass", (req, res) => {});

export default router;
