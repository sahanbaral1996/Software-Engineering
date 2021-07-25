import Header from "../common/Header/header";
import Footer from "../common/Footer/footer";

import * as React from "react";
import { io } from "socket.io-client";
import { SERVER_PATH } from "../../constants/index";
import TextDiv from "../TextDiv/TextDiv";
import { useFormik } from "formik";

interface IMessage {
  message: string;
  type: string;
}

interface IChatProps {
  socket: any;
  messages: IMessage[];
  connected: boolean;
  header: string;
  collectMessages: (text: IMessage) => void;
}

const ChatApp: React.FC<IChatProps> = ({
  socket,
  messages,
  connected,
  header,
  collectMessages,
}) => {
  const formik = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values) => {
      try {
        if (!connected) {
          alert("Connection Problem");
        }
        sendMessage(values.message);
      } catch (err) {
        throw err;
      } finally {
        values.message = "";
      }
    },
  });

  const sendMessage = (msg: string) => {
    try {
      collectMessages({ message: msg, type: "sent" });
      socket.emit("chat-message", msg);
    } catch (err) {
      alert("error");
    } finally {
    }
  };

  const { errors, touched, values, handleChange } = formik;

  const input_class = connected ? "false" : "true";

  return (
    <>
      <div className="chat-room-container">
        <div className="chat-room-header">
          {header} {!connected && <span>(Connecting....)</span>}
        </div>
        <div className="chat-room-text-container">
          {messages.map((text) => (
            <TextDiv type={text.type} Reply={text.message} />
          ))}
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <div className="chat-room-text">
              <input
                className={input_class}
                name={"message"}
                type="text"
                placeholder="type message...."
                value={values.message}
                onChange={handleChange}
                style={{ width: "100%", height: "5vh" }}
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
