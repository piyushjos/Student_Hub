import React, { useState } from "react";

const Chat = (props) => {
  const onChat = () => {
    console.log("okokokokok");
    props.onClickonUser();
  };
  return (
    <div className="chat-section">
      <button className="btn chat-btn">
        <i className="fas fa-comments"></i>
      </button>

      <div className="chat-box-div d-non">
        <div className="chat-box">
          <div className="card">
            <div className="card-header text-center">
              <div className="search-box">
                <div className="input-wrapper">
                  <i className="fas fa-search"></i>
                  <input placeholder="Search here" type="text" />
                </div>
                <div onClick={onChat}>
                  <h5>Back</h5>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              {/* ================================================================================================ */}

              <div className="chat-messages">
                <div className="chat-messages-box">
                  <div class="message-left">
                    <div class="mess-inner">
                      <div class="message-user-img">
                        <img
                          src="https://www.secure-gs.framework.infowindtech.biz/public/images/profile_pic/1665045364.png"
                          alt=""
                          class="mCS_img_loaded"
                        />
                      </div>

                      <div class="ch-messa">jhhkjhk</div>
                    </div>
                    <div class="message-Time">10-06-2022 03:25 PM</div>
                  </div>
                  <div class="message-right">
                    <div class="mess-inner">
                      <div class="ch-messa">jhhkjhk</div>
                      <div class="message-user-img">
                        <img
                          src="https://www.secure-gs.framework.infowindtech.biz/public/images/profile_pic/1665045364.png"
                          alt=""
                          class="mCS_img_loaded"
                        />
                      </div>
                    </div>
                    <div class="message-Time">10-06-2022 03:25 PM</div>
                  </div>
                </div>
                {/* <div className="chat-message-textarea">Message...</div> */}
                {/* <div class="chat__form">
                 <form id="chat__form">
                  <input id="text-message" type="text" placeholder="Type your message here ..."/>
                    <button type="submit">Send</button>
                       </form>
                        </div> */}
                <div class="row chat_input">
                  <div
                    contenteditable="true"
                    id="message"
                    class="textarea_like_whatsapp col-10 "
                    data-text="Type something..."
                  ></div>
                  <div class="col-2  send_icon">
                    <i
                      class="fa fa-paper-plane text text-primary mt-3 ms-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
