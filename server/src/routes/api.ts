import express from "express";
import todosRouter from "./todos";
import userRouter from "./user";

const router = express.Router();

router.use(todosRouter);
router.use("/user", userRouter);

export default router;
