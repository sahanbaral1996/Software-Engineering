import { broadCastToChannel } from "../../services/ChatServerService";

export const socketServerController = async (req, res) => {
	const channelId = req.params.channelId;
	await broadCastToChannel(channelId);
};
