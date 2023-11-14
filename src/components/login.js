import axios from "axios";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login";
import GoogleSignup from "./googleSignup";
import FbookSignup from "./facebookSignup";
import { useNavigate } from "react-router-dom";
import Popup from "./Loginotppopup";
import constant from "../utils/constants";
import Forgot from "./forgotpopup";
import { Spin, Slider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { add3, clearcart3 } from "../store/cartSlice3";
import io from "socket.io-client";
import { BASE_IP } from "../utils/constants";

const clientId =
  "982104340633-fmjgkeqsujat8vmf4m4k512bc0fhs8h0.apps.googleusercontent.com";

const SignupSchema = Yup.object().shape({
  myemail: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),

  mypassword: Yup.string().required("Required"),
});

function Login(props) {
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const dispatch = useDispatch();

  {
    /*handle close function for google signup*/
  }
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    props.handleClose1();
  };

  {
    /*handle close function for facebook signup*/
  }
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow(false);
    props.handleClose1();
  };

  {
    /*handle close function for error message for normal login*/
  }
  const [show3, setShow3] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose3 = () => {
    setShow3(false);
  };

  {
    /*This function for forgot password pop  */
  }
  const [show7, setShow7] = useState(false);
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  {
    /*initializing navigate */
  }
  const navigate = useNavigate();

  {
    /*handle close function for success message*/
  }
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => {
    setShow5(false);
    props.handleClose1();
  };

  const fetchCartdata = async (user_id) => {
    try {
      var formData = new FormData();

      formData.append("U_id", user_id);
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/Fetch_to_cart`,
        formData
      );

      if (response.data.status == 200) {
        // dispatch(add(product));
        // console.log("ooooooooooooo", response.data.data);

        for (const element of response.data.data) {
          // console.log("ooooooooooooo", element);
          // console.log("ooooooooooooo", element.BookData);
          // console.log("ooooooooooooo", element.BookData.length);
          if (element.BookData.length) {
            dispatch(add(element.BookData[0]));
          } else {
            dispatch(add(element.DocumentData[0]));
          }
        }
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  {
    /*Facebook on login success*/
  }
  const responseFacebook = async (res) => {
    console.log("respoce22");
    console.log(res);
    var data1 = res;
    console.log(res);
    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/login_facebook`,
        data1
      );
      // console.log(response)
      const flag = response.data.flag;
      if (flag == 1) {
        {
          /*this localstorage set here because of loop-hole when the popup opened but user can't fill the data*/
        }
        localStorage.setItem("email", response.data.email);
        setShow(true);
        setEmail(response.data.email);
      } else if ("role" in localStorage) {
        if (
          localStorage.getItem("role") === null ||
          localStorage.getItem("role") == ""
        ) {
          setShow(true);
          setEmail(localStorage.getItem("email"));
        }
      } else {
        if (response.data.token !== "error") {
          //alert("user sucessfully Logged in")
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id", response.data._id);
          fetchCartdata(response.data._id);
        }
        if (localStorage.getItem("role") == "tutor") {
          navigate("/", { replace: true });
        }
        if (localStorage.getItem("role") == "student") {
          navigate("/", { replace: true });
        }
        props.handleClose1();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const componentClicked = (response) => {
    //console.log("component11")
    //console.log(response);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({});
    }
    gapi.load("client:auth2", start);
  }, []);

  {
    /*Google on login success*/
  }
  const onLoginSuccess = async (res) => {
    // console.log(res)
    //console.log('Login Success:', res.profileObj);
    var data1 = res.profileObj;

    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/login_google`,
        data1
      );
      console.log(response.data.flag);
      const flag = response.data.flag;
      if (flag == 1) {
        {
          /*this localstorage set here because of loop-hole when the popup opened but user can't fill the data*/
        }
        localStorage.setItem("email", response.data.email);

        setShow(true);
        setEmail(response.data.email);
      } else if ("role" in localStorage) {
        if (
          localStorage.getItem("role") === null ||
          localStorage.getItem("role") == "" ||
          localStorage.getItem("role") == "undefined" ||
          localStorage.getItem("role") == undefined
        ) {
          console.log(localStorage.getItem("role"));
          setShow(true);
          setEmail(localStorage.getItem("email"));
        }
      } else {
        if (response.data.token !== "error") {
          //alert("user sucessfully Logged in")
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id", response.data._id);
          fetchCartdata(response.data._id);
        }
        if (localStorage.getItem("role") == "tutor") {
          navigate("/", { replace: true });
        }
        if (localStorage.getItem("role") == "student") {
          navigate("/", { replace: true });
        }
        props.handleClose1();
      }
    } catch (err) {
      console.log(err);
    }
  };

  {
    /*Google on login failure*/
  }
  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  {
    /*function for normal login */
  }
  const onnormalLoginSuccess = async (values) => {
    try {
      const res = await axios.post(`${constant.BASE_IP}/webapi/login`, values);

      if (res.data.status == 400) {
        setMessage(res.data.message);
        setShow3(true);
      } else if (res.data.flag == 200) {
        setShow5(true);
        setEmail1(res.data.email);
      } else {
        if (res.data.token !== "error") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("id", res.data._id);

          fetchCartdata(res.data._id);
        }
        if (localStorage.getItem("role") == "tutor") {
          // navigate("/", { replace: true });
        }
        if (localStorage.getItem("role") == "student") {
          // navigate("/", { replace: true });
        }
        props.handleClose1();
      }
    } catch (err) {
      if (err.message == "Request failed with status code 400")
        setMessage(err.message);
      setShow3(true);
    }
  };
  return (
    <div className="abc">
      <Formik
        initialValues={{
          myemail: "",
          mypassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          onnormalLoginSuccess(values);
          //console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <div class="modal-content">
            <div class="modal-sign-div">
              <div className="modal-sign-in">
                {/* <div classNameName="modal-sign-head">
                <h2>Log In to Your Account</h2>
                <hr/>
              </div> */}

                <div className="modal-sign-body">
                  <div className="social-div">
                    <ul>
                      <li>
                        <FacebookLogin
                          appId="2465413696934603"
                          autoLoad={false}
                          fields="name,email,picture"
                          onClick={componentClicked}
                          callback={responseFacebook}
                        />
                      </li>
                      <li>
                        {" "}
                        <GoogleLogin
                          clientId={clientId}
                          buttonText="SignIn With Google"
                          onSuccess={onLoginSuccess}
                          onFailure={onLoginFailure}
                          cookiePolicy={"single_host_origin"}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="sign-or">
                    <span>OR</span>
                  </div>
                  <div className="sign-form">
                    <Form className="signin-form">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>
                              Email Address <span>*</span>
                            </label>
                            {/* <input type="email" className="form-control" placeholder="Enter your email address..." value="" /> */}
                            <Field
                              name="myemail"
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              autocomplete="off"
                            />
                            {errors.myemail && touched.myemail ? (
                              <div style={{ color: "red" }}>
                                {errors.myemail}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>
                              Password <span>*</span>
                            </label>
                            {/* <input type="password" className="form-control" placeholder="Password" value="" /> */}
                            <Field
                              name="mypassword"
                              type="password"
                              className="form-control"
                              placeholder="password"
                            />
                            {errors.mypassword && touched.mypassword ? (
                              <div style={{ color: "red" }}>
                                {errors.mypassword}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <span className="checkbox-accept">
                              <label>
                                <input type="checkbox" name="" value="" />
                                <span></span>
                                Keep me logged in
                              </label>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group forgotP">
                            {/*<label><a href="#" className="forgotPbtn">Forgot Password?</a></label> */}
                            <Button
                              variant="primary"
                              onClick={handleShow7}
                              className="signup-btn btn"
                              data-toggle="modal"
                              data-target="#myModal"
                              style={{ backgroundColor: "#2c2f8c" }}
                            >
                              forgot password{" "}
                            </Button>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="submit"
                              className="btn"
                              value="Login"
                              // disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="modal-sign-footer">
                  <p>
                    New to Gradstoc?{" "}
                    <a href="#" className="footer-sign-up">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>

      {/*pop for google sign up */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Hi , You are first time user , Please update your profile firts.
          {<GoogleSignup Email={email} handleClose={handleClose} />}
        </Modal.Body>
      </Modal>

      {/*pop for facebook sign up */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          Hi , You are first time user , Please update your profile firts.
          {<FbookSignup Email={email} handleClose2={handleClose2} />}
        </Modal.Body>
      </Modal>

      {/*popup model for error message for normal login */}
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/*popup model for OTP page */}
      <Modal show={show5} onHide={handleClose5}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "orange" }}>
          please verify your email. it is mandoatory. OTP is sanded in your
          mail.
          <Popup email={email1} handleClose5={handleClose5} />
        </Modal.Body>
      </Modal>

      {/*popup model for forgot password*/}
      <Modal show={show7} onHide={handleClose7}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "orange" }}>
          {/*<Popup email={email1} handleClose5={handleClose5}/>*/}
          <Forgot handleClose7={handleClose7} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
