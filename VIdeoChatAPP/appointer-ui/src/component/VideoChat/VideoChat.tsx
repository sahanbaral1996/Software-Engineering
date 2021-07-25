//@ts-nocheck

import * as React from "react";
import { turnConfig } from "config/turnConfig";
import { io } from "socket.io-client";
import { SERVER_PATH } from "../../constants/index";
import Wrapper from "../Chat/wrapper";

import { ButtonGroup, Button } from "@material-ui/core";

interface IMessage {
  message: string;
  type: string;
}

const VideoChat: React.FC = () => {
  const peerRef = React.useRef<RTCPeerConnection | null>(null);
  const socketRef = React.useRef(null);
  const streamRef = React.useRef();
  const userVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const userStream = React.useRef<MediaStream>(null);
  const [otherUser, setOtherUser] = React.useState(false);

  const localStreamConstraints = {
    audio: true,
    video: true,
  };

  const [started, setStarted] = React.useState(false);
  const [chat, setChat] = React.useState(false);

  const hideChat = () => {
    setChat(false);
  };

  React.useEffect(() => {
    if (!otherUser) {
      socketRef.current = io(SERVER_PATH + "sahan");
    }
    navigator.mediaDevices
      .getUserMedia(localStreamConstraints)
      .then(gotMedia)
      .catch(function (e) {});

    socketRef.current.on("other-user", (msg: string) => {
      console.log(msg);
    });
    socketRef.current.on("offer", handleRecieveCall);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice-candidate", handleIceCandidate);
  });

  const callUser = () => {
    if (!started) {
      peerRef.current = createPeer();
      if (userStream.current != null) {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef?.current?.addTrack(track, userStream.current)
          );
      }
    } else {
      peerRef.current.close();
      peerRef.current = null;
    }
  };

  const createPeer = () => {
    const peer = new RTCPeerConnection(turnConfig);
    peer.onicecandidate = handleIceCandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = handleNegotiationNeededEvent;

    return peer;
  };

  const handleTrackEvent = (stream) => {
    remoteVideoRef.current.srcObject = stream.streams[0];
    setStarted(true);
  };

  const handleIceCandidateEvent = (event) => {
    if (event.candidate) {
      socketRef.current.emit("ice-candidate", event.candidate);
    }
  };

  const handleNegotiationNeededEvent = () => {
    peerRef.current.createOffer(
      (sessionDesc) => {
        peerRef.current.setLocalDescription(sessionDesc);
        socketRef.current.emit("offer", sessionDesc);
      },
      (event) => {
        console.log(event);
      }
    );
  };

  const gotMedia = (stream: MediaStream) => {
    userStream.current = stream;
    userVideoRef.current.srcObject = stream;
  };

  const handleRecieveCall = (sdp) => {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(sdp);
    peerRef.current.setRemoteDescription(desc);
    userStream &&
      userStream.current
        .getTracks()
        .forEach((track) =>
          peerRef.current.addTrack(track, userStream.current)
        );
    peerRef.current.createAnswer().then((answer) => {
      peerRef.current.setLocalDescription(answer);
      socketRef.current.emit("answer", answer);
    });
  };

  const handleAnswer = (message) => {
    const desc = new RTCSessionDescription(message);
    peerRef.current.setRemoteDescription(message);
  };

  const handleIceCandidate = (incoming) => {
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current.addIceCandidate(candidate);
  };

  const showChat = () => {
    setChat(true);
  };

  return (
    <>
      {chat && <Wrapper ref={socketRef} hideChat={hideChat} />}
      <ButtonGroup color="primary" className="call-or-End">
        <Button onClick={callUser}>{started ? "End" : "Call"}</Button>
        {started && <Button onClick={showChat}>chat</Button>}
      </ButtonGroup>
      <div className="video-chat-container" id="video_display">
        <div
          id="video_container"
          className="align-items-center"
          style={{ display: "flex" }}
        >
          <div className="remote_div" id="div2">
            <video
              className="remote-vieo"
              id="remoteVideo"
              ref={remoteVideoRef}
              autoPlay
              muted
            ></video>
          </div>
        </div>
      </div>
      <div className="local_div" id="div1">
        <video
          id="localVideo"
          height="320"
          width="250"
          ref={userVideoRef}
          autoPlay
          muted
        ></video>
      </div>
    </>
  );
};

export default VideoChat;
