import { React, useState } from "react";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_IP } from "../utils/constants";

const TutornavigationBar = () => {
  {
    /*This state for showing the name of student */
  }
  const [name, setName] = useState(localStorage.getItem("name"));
  const items = useSelector((state) => state.cart);
  console.log("cart Items", items);

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="main-logo">
                <Link to="/">
                  <img src={require("../images/logo.png")} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-9">
              <div className="header-right">
                <div className="header-top">
                  <div className="search-area">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <select className="form-control">
                          <option selected="" value="">
                            Select Option...
                          </option>
                          <option value="">Fiction Book</option>
                          <option value="">Non-Fiction Book</option>
                          <option value="">Text Book</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search here..."
                      />
                      <div className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="tutorHelp">
                    <Link to="/tutor-help">
                      Tutor Help{" "}
                      <i
                        className="far fa-question-circle"
                        data-toggle="tooltip"
                        title="Get an Expert Tutor to help you with your homework"
                      ></i>
                    </Link>
                  </div>
                </div>
                <div className="header-menus">
                  <div className="menus">
                    <button className="nav-toggle">
                      <div className="icon-menu">
                        <span className="line line-1"></span>
                        <span className="line line-2"></span>
                        <span className="line line-3"></span>
                      </div>
                    </button>
                    <div className="nav nav-container">
                      <ul className="links">
                        <li className="active">
                          <Link to="/school-list">School</Link>
                          {/* <ul>
                            <li>
                              <a href="#">
                                <p>Liberty University</p>
                                <div className="sub-img">
                                  <img
                                    src="images/liberty-university.jpg"
                                    alt=""
                                  />
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <p>Biology</p>
                                <div className="sub-img">
                                  <img src="images/biology.jpg" alt="" />
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <p>Business Textbook</p>
                                <div className="sub-img">
                                  <img
                                    src="images/businessTextbook.jpg"
                                    alt=""
                                  />
                                </div>
                              </a>
                            </li>
                          </ul> */}
                        </li>
                        <li className="">
                          <Link to="/tutor-help/tutor-subject">Subject</Link>
                        </li>
                        <li className="">
                          {/* <a href="/tutor-help/tutor-book">Books</a> */}
                          <Link to="/tutor-help/tutor-book">Books</Link>
                        </li>
                        <li className="">
                          <Link to="/tutor-help/tutor-list">Ask Tutors</Link>
                        </li>

                        <li className="">
                          <Link to="/blog-page">Blogs</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="user-top">
                    <div className="user-top-menu">
                      {/* <a href="#"> 
                      <span><i className="fas fa-user"></i></span> 
                      <span className="user-name">John doe <i className="fas fa-chevron-down"></i></span>
                    </a>  */}
                    </div>
                    {/* <div className="user-top-drop">
                    <ul>
                      <li><span><i className="fas fa-user-graduate"></i> Tutor</span></li>
                      <li><a href="dashboard_main.html"><i className="fas fa-columns"></i> Dashboard</a></li>
                      <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                    
                    
                  </div> */}

                    <Dropdown>
                      <span>
                        <i className="fas fa-user"></i>
                      </span>
                      <span className="user-name">
                        {name}&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      <Dropdown.Toggle style={{ backgroundColor: "#2c2f8c" }}>
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Tutor</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Dashboard{" "}
                          </Dropdown.Item>
                          <Dropdown.Item href="/logout">Log-out</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Toggle>
                    </Dropdown>
                  </div>
                  <div className="notification-area">
                    <button className="notification-btn btn">
                      <i className="fas fa-bell"></i>
                      <span className="notification-dots">2</span>
                    </button>
                    <div className="notification-box">
                      <ul>
                        <li>
                          <a href="#">
                            <h4>Latest Job Posted</h4>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                            <h6>December 24, 2019 12:44am</h6>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <h4>Payment</h4>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                            <h6>December 24, 2019 12:44am</h6>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <h4>Order Confirmation</h4>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                            <h6>December 24, 2019 12:44am</h6>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <h4>Order Confirmation</h4>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                            <h6>December 24, 2019 12:44am</h6>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="cart-sign">
                    <ul>
                      <li>
                        <Link
                          to="/my-cart"
                          id="linktagpar"
                          className="cart-btn btn"
                        >
                          <i className="fas fa-shopping-cart"></i>
                          <span className="notification-dots">
                            {items.length}
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TutornavigationBar;
