import { Link } from "react-router-dom";
import { React, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Signup from "./signuptest";
import Login from "./login";
import { useSelector } from "react-redux";

function Header(props) {
  const [show1, setShow1] = useState(false);
  const items = useSelector((state) => state.cart);
  console.log("cart Items", items);

  {
    /*This function for signup pop  */
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  {
    /*This function for login pop  */
  }
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

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
                    {/*<Link to="/tutor-help" >Tutor Help<i className="far fa-question-circle" data-toggle="tooltip" title="Get an Expert Tutor to help you with your homework"></i></Link>*/}
                    <Button
                      variant="primary"
                      onClick={handleShow1}
                      className="signup-btn btn"
                      data-toggle="modal"
                      data-target="#myModal"
                      style={{ backgroundColor: "#2c2f8c" }}
                    >
                      Tutor-Help
                      <i
                        className="far fa-question-circle"
                        data-toggle="tooltip"
                        title="Get an Expert Tutor to help you with your homework"
                      ></i>
                    </Button>
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
                          <Link to="/subject">Subject</Link>
                        </li>
                        <li>
                          <Link to="/books-page">Books</Link>
                        </li>
                        <li>
                          <Link to="/blog-page">Blog</Link>
                        </li>
                        <li>
                          <Link to="/tutor-list">Ask Tutors</Link>
                        </li>

                        {/* <li className=""><a href="tutor-list.html">Ask Tutors</a></li>*/}
                      </ul>
                    </div>
                  </div>

                  <div className="header-sign">
                    <ul>
                      {/* <li><Link to="/login"  className="login-btn btn" data-toggle="modal" data-target="#myModal">Login</Link></li>
                       */}
                      <li>
                        <Button
                          variant="primary"
                          onClick={handleShow1}
                          className="signup-btn btn"
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ backgroundColor: "#2c2f8c" }}
                        >
                          Login
                        </Button>
                      </li>
                      <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                          <h4 id="abc1">Log In to Your Account</h4>
                        </Modal.Header>
                        <Modal.Body>
                          {<Login handleClose1={handleClose1} />}
                        </Modal.Body>
                      </Modal>
                      <>&nbsp;&nbsp;&nbsp;</>

                      {/* <li><Link to="/signup"  className="signup-btn btn" data-toggle="modal" data-target="#myModal">Sign up</Link></li>*/}
                      <li>
                        <Button
                          variant="primary"
                          onClick={handleShow}
                          className="signup-btn btn"
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ backgroundColor: "#2c2f8c" }}
                        >
                          Sign up
                        </Button>
                      </li>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          {" "}
                          <h4 id="abc2">
                            Create a FREE account now to get started
                          </h4>
                        </Modal.Header>
                        <Modal.Body>
                          {
                            <Signup
                              handleClose={handleClose}
                              handleShow1={handleShow1}
                            />
                          }
                        </Modal.Body>
                      </Modal>
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
}

export default Header;
