import React, { useState } from "react";

const Chat = (props) => {
  const onChat = () => {
    console.log("okokokokok");
    props.onClickonUser();
  };
  return (
    <div className="chat-box-div">
      <div className="chat-box">
        <div className="card">
          <div className="card-header text-center">
            <div className="search-box">
              <div className="input-wrapper">
                <i className="fas fa-search"></i>
                <input placeholder="Search here" type="text" />
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <ul className="list-unstyled mb-0">
              <li
                className="p-2 border-bottom"
                style={{ backgroundColor: "#eee" }}
                onClick={onChat}
              >
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="40"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">John Doe</p>
                      <p className="small text-muted m-0">
                        Hello, Are you there?
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted m-0 mb-1">Just now</p>
                    <span className="badge bg-danger float-end">1</span>
                  </div>
                </a>
              </li>
              {/* <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="40"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Danny Smith</p>
                      <p className="small text-muted m-0">
                        Lorem ipsum dolor sit.
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted m-0 mb-1">5 mins ago</p>
                  </div>
                </a>
              </li> */}
              {/* <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="40"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Alex Steward</p>
                      <p className="small text-muted m-0">
                        Lorem ipsum dolor sit.
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted m-0 mb-1">Yesterday</p>
                  </div>
                </a>
              </li> */}
              {/* <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="40"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Ashley Olsen</p>
                      <p className="small text-muted m-0">
                        Lorem ipsum dolor sit.
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted m-0 mb-1">Yesterday</p>
                  </div>
                </a>
              </li> */}
              {/* <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="40"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Kate Moss</p>
                      <p className="small text-muted m-0">
                        Lorem ipsum dolor sit.
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted m-0 mb-1">Yesterday</p>
                  </div>
                </a>
              </li> */}
              {/* <li className="p-2 border-bottom">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="40"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Lara Croft</p>
                      <p className="small text-muted m-0">
                        Lorem ipsum dolor sit.
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted m-0 mb-1">Yesterday</p>
                  </div>
                </a>
              </li> */}
              {/* <li className="p-2">
                <a href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                      width="40"
                    />
                    <div className="pt-1">
                      <p className="fw-bold mb-0">Brad Pitt</p>
                      <p className="small text-muted m-0">
                        Lorem ipsum dolor sit.
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-muted m-0 mb-1">5 mins ago</p>
                    <span className="text-muted float-end">
                      <i className="fas fa-check" aria-hidden="true"></i>
                    </span>
                  </div>
                </a>
              </li> */}
            </ul>
            {/* ================================================================================================ */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
