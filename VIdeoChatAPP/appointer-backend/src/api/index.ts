import { Router } from "express";
import chat from "./routes/chatRoute";

export default () => {
	const app = Router();

	chat(app);

	return app;
};
