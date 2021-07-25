import * as React from "react";
import axios from "axios";

import { ButtonGroup, Button } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface IChannelProp {
	users: number;
	setHeader: (header: string) => void;
	setChannelId: (id: string) => void;
	connecToServer: (channelId: string) => void;
	disconnect: () => void;
}

const Channels: React.FC<IChannelProp> = ({
	setHeader,
	users,
	setChannelId,
	connecToServer,
	disconnect,
}) => {
	const [listChannel, setList] = React.useState([
		"vw3slp",
		"c6n5te",
		"gi4uhb",
		"v5bya9",
		"k41jkh",
		"wy71i1l",
		"bo8hxb",
		"y52i8u",
	]);
	const [good, setGood] = React.useState(false);
	const [activeChannel, setActiveChannel] = React.useState("");

	const connect = (channel: string) => {
		if (!good) {
			setHeader(channel);
			connecToServer(channel);
			setGood(true);
			setActiveChannel(channel);
		} else {
			disconnect();
		}
	};

	return (
		<div className="channel-list-container">
			<div className="chanel-list-wrapper">
				{listChannel.map((channel) => (
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>
								{channel}{" "}
								{channel == activeChannel ? `user's online ${users}` : ""}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<ButtonGroup>
								<Button size="small" onClick={() => connect(channel)}>
									{channel == activeChannel ? "Disconnect" : "Connect"}
								</Button>
							</ButtonGroup>
							;
						</AccordionDetails>
					</Accordion>
				))}
			</div>
		</div>
	);
};

export default Channels;
