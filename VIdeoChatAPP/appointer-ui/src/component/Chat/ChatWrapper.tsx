import Header from "../common/Header/header";
import Footer from "../common/Footer/footer";
import * as React from "react";
import Channels from "../ChannelList/Channels";
import { io } from "socket.io-client";
import { SERVER_PATH } from "../../constants/index";
import TextDiv from "../TextDiv/TextDiv";
import { useFormik } from "formik";
import ChatApp from "./Chat";
import axios from "axios";
import VideoChat from "../VideoChat/VideoChat";

interface IMessage {
	message: string;
	type: string;
}

const ChatWrapper: React.FC = () => {
	const [serverConnected, setServerConnected] = React.useState(false);
	const [chatSocket, setChatSocket] = React.useState<any>(null);
	const [messages, setMessages] = React.useState<IMessage[]>([]);
	const [header, setHeader] = React.useState("");
	const [channelId, setChannelId] = React.useState("");
	const [user, setUser] = React.useState(0);

	const collectMessages = (text: IMessage) => {
		setMessages((oldArray) => [...oldArray, text]);
	};

	const setHeaderOnConnect = (header: string) => {
		setHeader(header);
	};

	const connecToServer = (channelId: string) => {
		const socket = io(SERVER_PATH + channelId, { forceNew: true });
		socket.on("connect", () => {
			setServerConnected(true);
			setChatSocket(socket);
		});
		socket.on("reply", (data: string) => {
			collectMessages({ message: data, type: "recieve" });
		});
		socket.on("num-connection", (data: number) => {
			setUser(data);
		});
	};

	const disconnect = () => {
		chatSocket.emit("disconnect-user", "user disconnected");
	};

	return (
		<>
			<Header />
			<div style={{ display: "flex" }}>
				<Channels
					users={user}
					setHeader={setHeaderOnConnect}
					setChannelId={setChannelId}
					disconnect={disconnect}
					connecToServer={connecToServer}
				/>
				<ChatApp
					header={header}
					socket={chatSocket}
					connected={serverConnected}
					messages={messages}
					collectMessages={collectMessages}
				/>
			</div>
			<Footer />
		</>
	);
};

export default ChatWrapper;
