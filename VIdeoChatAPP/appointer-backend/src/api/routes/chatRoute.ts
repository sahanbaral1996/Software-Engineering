import { Router } from "express";
import { socketServerController } from "../controllers/chatController";
import cors from "cors";
import ser from "app";

const route = Router();

export default (app: Router) => {
	app.use(cors());
	app.use("/", route);

	route.get("/chat", socketServerController);

	const channels = [
		Math.random().toString(36).substring(7),
		Math.random().toString(36).substring(7),
		Math.random().toString(36).substring(7),
		Math.random().toString(36).substring(7),
		Math.random().toString(36).substring(7),
		Math.random().toString(36).substring(7),
		Math.random().toString(36).substring(7),
		Math.random().toString(36).substring(7),
	];
	route.get("/", (req, res) => {
		res.send("hello");
	});
};
