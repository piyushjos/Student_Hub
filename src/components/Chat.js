import React, { useState } from "react";
import ChatUserListing from "./Chat_user_listing";
import ChatchatListing from "./Chat_chat_listing";

const Chat = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);

  const onChat = () => {
    setShow(!show);
  };

  const onClickonUser = () => {
    setShow2(!show2);
  };

  return (
    <div className="chat-section">
      <button className="btn chat-btn" onClick={onChat}>
        <i className="fas fa-comments"></i>
      </button>
      <div className={show ? "chat-box-div" : "chat-box-div d-none"}>
        {show2 ? (
          <ChatUserListing onClickonUser={onClickonUser} />
        ) : (
          <ChatchatListing onClickonUser={onClickonUser} />
        )}
      </div>
    </div>
  );
};

export default Chat;
