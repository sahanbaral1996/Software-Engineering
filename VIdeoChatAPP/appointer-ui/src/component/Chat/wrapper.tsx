//@ts-nocheck

import * as React from "react";
import { turnConfig } from "config/turnConfig";
import { io } from "socket.io-client";
import { SERVER_PATH } from "../../constants/index";
import InVideoChat from "./InVideoChat";

interface IMessage {
  message: string;
  type: string;
}

const Wrapper: React.FC = ({ hideChat }, ref) => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  React.useEffect(() => {
    ref.current.on("reply", (msg) => {
      collectMessages({ message: msg, type: "recieve" });
    });
  });

  const collectMessages = (text: IMessage) => {
    setMessages((oldArray) => [...oldArray, text]);
  };

  return (
    <>
      <InVideoChat
        ref={ref}
        hideChat={hideChat}
        collectMessages={collectMessages}
        messages={messages}
      />
    </>
  );
};

export default React.forwardRef(Wrapper);
