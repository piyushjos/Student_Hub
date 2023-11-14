import { Link } from "react-router-dom";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";

function Header(props) {
  {
    /*This state for showing the name of student */
  }
  const [name, setName] = useState(localStorage.getItem("name"));
  const items = useSelector((state) => state.cart);
  console.log("cart Items", items);

  return (
    <div className="main-wrapper">
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="main-logo">
                <Link to="/">
                  <img src={require("../images/logo.png")} alt="logo" />
                </Link>
                <h4 style={{ color: "#2c2f8c" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp; Hello {name}
                </h4>
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
                    <Link to="/student-help">
                      Student Help{" "}
                      <i
                        className="far fa-question-circle"
                        data-toggle="tooltip"
                        title="Get an Expert Tutor to help you with your homework"
                      ></i>
                    </Link>
                    {/*<Link to="/tutor-help" >Tutor Help<i className="far fa-question-circle" data-toggle="tooltip" title="Get an Expert Tutor to help you with your homework"></i></Link>*/}

                    {/*  <a href="tutor-my-question.html">Tutor Help <i className="far fa-question-circle" data-toggle="tooltip" title="Get an Expert Tutor to help you with your homework"></i></a>*/}
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
                          <Link to="/school-list">Schools</Link>

                          <ul>
                            <li>
                              <a href="#">
                                <p>Liberty University</p>
                                <div className="sub-img">
                                  <img
                                    src={require("../images/liberty-university.jpg")}
                                    alt=""
                                  />
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <p>Biology</p>
                                <div className="sub-img">
                                  <img
                                    src={require("../images/biology.jpg")}
                                    alt=""
                                  />
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <p>Business Textbook</p>
                                <div className="sub-img">
                                  <img
                                    src={require("../images/businessTextbook.jpg")}
                                    alt=""
                                  />
                                </div>
                              </a>
                            </li>
                          </ul>
                        </li>
                        {/* <li className=""><a href="fiction-book.html">Subject</a></li>*/}
                        <li>
                          <Link to="/tutor-help/tutor-subject">Subject</Link>
                        </li>
                        <li>
                          <Link to="/tutor-help/tutor-book">Books</Link>
                        </li>
                        <li>
                          <Link to="/blog-page">Blog</Link>
                        </li>
                        <li>
                          <Link to="/tutor-help/tutor-list">Ask Tutors</Link>
                        </li>

                        {/* <li className=""><a href="tutor-list.html">Ask Tutors</a></li>*/}
                      </ul>
                    </div>
                  </div>

                  <div className="header-sign">
                    <ul>
                      <li>
                        <Link
                          to="/logout"
                          className="signup-btn btn"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          Logout
                        </Link>
                      </li>
                      {/* <li><Button variant="primary" onClick={handleShow} className="signup-btn btn" data-toggle="modal" data-target="#myModal" style={{backgroundColor:"#2c2f8c"}}>
                                            Logout
                                            </Button></li>
                                            <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton> <h4 id="abc2">Create a FREE account now to get started</h4>
                                            </Modal.Header>
                                            <Modal.Body>{<Signup handleClose={handleClose} handleShow1={handleShow1}/>}</Modal.Body>
                                            </Modal> */}
                    </ul>
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
      <Chat />
    </div>
  );
}

export default Header;
