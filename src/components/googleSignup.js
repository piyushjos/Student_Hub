import { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import constant from "../utils/constants";

const SignupSchema = Yup.object().shape({
  check: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),

  radioGroup: Yup.string().required(
    "You haveto choose either student or tutor"
  ),
});

function GoogleSignup(props) {
  console.log(props.Email);

  {
    /*initializing navigate */
  }
  const navigate = useNavigate();

  const onLoginSuccess = async (values) => {
    console.log(values.radioGroup);
    props.handleClose();
    var formData = new FormData();
    formData.append("email", props.Email);
    formData.append("type", values.radioGroup);

    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/userLoginGooglepopData`,
        formData
      );

      console.log(response);
      if (response.data.token !== "error") {
        // alert("user sucessfully Logged in");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("id", response.data._id);
      }
      if (localStorage.getItem("role") == "tutor") {
        navigate("/tutor-help", { replace: true });
        props.handleClose1();
      }
      if (localStorage.getItem("role") == "student") {
        navigate("/", { replace: true });
        props.handleClose1();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          check: false,
          radioGroup: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          onLoginSuccess(values);
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
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
                              {errors.radioGroup && touched.radioGroup ? (
                                <div style={{ color: "red" }}>
                                  {errors.radioGroup}
                                </div>
                              ) : null}
                            </div>
                          </div>

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
                                value="UPDATE"
                                disabled={isSubmitting}
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
    </Fragment>
  );
}

export default GoogleSignup;
