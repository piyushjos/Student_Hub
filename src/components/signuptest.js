import { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Popup from "./Otppopup";
import * as Yup from "yup";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import constant from "../utils/constants";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, "Please enter you real name")
    .max(15, "First name not excedes by 15 character")
    .required("First Name Is Required"),

  lastName: Yup.string()
    .min(2, "Please enter last name")
    .max(15, "LastNmae Not Exceeds By 15 Character")
    .required("Last Name Is Required"),

  myfile: Yup.string().required("Image Is Required"),

  myemail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email Is Required"),

  mypassword: Yup.string()
    .min(6, "Password should have minimum 6 letters")
    .required("Password Is Required"),

  confirm: Yup.string()
    .oneOf(
      [Yup.ref("mypassword")],
      "Password and confirm-password does not match"
    )
    .required("Confirm Password Is Required"),

  check: Yup.boolean().oneOf(
    [true],
    "You Must Accept The Terms And Conditions"
  ),

  radioGroup: Yup.string().required("Role Is Required"),
});

const fieldError = (props) => {
  return <div style={{ color: "red" }}>{props.children}</div>;
};

function Login(props) {
  {
    /*handle close function for error message*/
  }
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setShow(false);
  };

  {
    /*handle close function for success message*/
  }
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => {
    setShow5(false);
    props.handleClose();
    props.handleShow1();
  };
  const [email, setEmail] = useState("");
  const [issubmit, setSubmit] = useState();

  const onSignSuccess = async (values) => {
    try {
      const res = await axios.post(
        `${constant.BASE_IP}/webapi/register`,
        values,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status == 200) {
        setMessage("You will recive an otp on your mail");
        setShow5(true);
        setSubmit(true);
        setEmail(res.data.email);
      } else if (res.data.status == 400) {
        if (
          res.data.message ==
          "register validation failed: Email:  must be unique"
        ) {
          setMessage("Please try with different email id");
          setShow(true);
        } else {
          setMessage(res.data.message);
          setShow(true);
        }
      }
    } catch (err) {
      setMessage(err.message);
      setShow(true);
    }
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          myfile: "",
          myemail: "",
          mypassword: "",
          confirm: "",
          check: false,
          radioGroup: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          //console.log(values)
          onSignSuccess(values);

          resetForm({ values: "" });
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <div className="abc">
            <div className="modal-content">
              <div className="modal-sign-div">
                <div className="modal-sign-up">
                  <div className="modal-sign-body">
                    <div className="sign-form">
                      <Form className="register-form">
                        <div className="row">
                          <div className="currently-div">
                            <p>I am currently a</p>
                            <div>
                              <ul>
                                <li>
                                  <label>
                                    {/*<input type="radio" name="currently" value="student"/>*/}
                                    <Field
                                      name="radioGroup"
                                      type="radio"
                                      value="student"
                                    />

                                    <span>
                                      <i className="fas fa-chalkboard-teacher"></i>{" "}
                                      Student
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label>
                                    <Field
                                      name="radioGroup"
                                      type="radio"
                                      value="tutor"
                                    />

                                    <span>
                                      <i className="fas fa-user-graduate"></i>{" "}
                                      Tutor
                                    </span>
                                  </label>
                                </li>
                              </ul>
                              {/* {errors.radioGroup && touched.radioGroup ? (
                                <div style={{ color: "red" }}>
                                  {errors.radioGroup}
                                </div>
                              ) : null} */}
                              <ErrorMessage
                                name="radioGroup"
                                component={fieldError}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>First Name:</label>
                              <Field
                                name="firstName"
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                autocomplete="off"
                              />
                              {errors.firstName && touched.firstName ? (
                                <div style={{ color: "red" }}>
                                  {errors.firstName}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Last Name <span>*</span>
                              </label>
                              {/* <input type="text" className="form-control" placeholder="Last Name" />*/}
                              <Field
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                autocomplete="off"
                              />
                              {errors.lastName && touched.lastName ? (
                                <div style={{ color: "red" }}>
                                  {errors.lastName}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Profile photo <span>*</span>
                              </label>
                              <input
                                type="file"
                                title="&nbsp;"
                                onChange={(e) =>
                                  setFieldValue("myfile", e.target.files[0])
                                }
                              />

                              {errors.myfile && touched.myfile ? (
                                <div style={{ color: "red" }}>
                                  {errors.myfile}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Email <span>*</span>
                              </label>
                              {/* <input type="email" className="form-control" placeholder="Email"/>*/}
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

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Password <span>*</span>
                              </label>
                              {/*   <input type="password" className="form-control" placeholder="Password"/>*/}
                              <Field
                                name="mypassword"
                                type="password"
                                className="form-control"
                                placeholder="password"
                                autocomplete="off"
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
                              <label>
                                Confirm password <span>*</span>
                              </label>
                              {/* < input type="password" className="form-control" placeholder="Confirm password"/>*/}
                              <Field
                                name="confirm"
                                type="password"
                                className="form-control"
                                placeholder="password"
                                autocomplete="off"
                              />
                              {errors.confirm && touched.confirm ? (
                                <div style={{ color: "red" }}>
                                  {errors.confirm}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          {/* {values.myfile ? values.myfile.name : "bbb"} */}
                          <div className="col-md-12">
                            <div className="form-group">
                              <span className="checkbox-accept">
                                <label>
                                  {/*  <input type="checkbox" name=""   />*/}
                                  <Field
                                    name="check"
                                    type="checkbox"
                                    className="form-control"
                                  />
                                  <span></span>
                                </label>
                              </span>
                              <label>
                                I have read and accept the{" "}
                                <a href="#">Terms & Conditions</a>
                              </label>
                              {errors.check && touched.check ? (
                                <div style={{ color: "red" }}>
                                  {errors.check}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              {/* <input type="submit" className="btn" value="Sign Up"/> */}
                              <Field
                                type="submit"
                                className="btn"
                                value="Sign Up"
                                disabled={issubmit}
                              />
                              {/* <button type="submit" className="btn">Submit</button> */}
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
      {/*popup model for error message */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/*popup model for OTP page */}
      <Modal show={show5} onHide={handleClose5}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "orange" }}>
          you will recive a mail in your respected email address
          <Popup email={email} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default Login;
