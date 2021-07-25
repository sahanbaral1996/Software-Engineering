//@ts-nocheck

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

const InVideoChat: React.FC = (
  { collectMessages, messages, hideChat },
  ref
) => {
  const formik = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values) => {
      try {
        sendMessage(values.message);
      } catch (err) {
        console.log(err);
      } finally {
        values.message = "";
      }
    },
  });

  const sendMessage = (msg: string) => {
    try {
      ref.current.emit("chat-message", msg);
    } catch (err) {
      alert("error");
    } finally {
      collectMessages({ message: msg, type: "sent" });
    }
  };

  const { errors, touched, values, handleChange } = formik;

  return (
    <>
      <div className="chat-room-container">
        <button onClick={hideChat}>X</button>
        <div className="chat-room-header">Chat</div>
        <div className="chat-room-text-container">
          {messages.map((text) => (
            <TextDiv type={text.type} Reply={text.message} />
          ))}
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <div className="chat-room-text">
              <input
                className={"true"}
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

export default React.forwardRef(InVideoChat);
