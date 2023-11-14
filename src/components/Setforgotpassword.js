import { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import Popup from "./Otppopup";
import * as Yup from "yup";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import constant from "../utils/constants";

const SignupSchema = Yup.object().shape({
  mypassword: Yup.string()
    .min(6, "Password should have minimum 6 letters")
    .required("Required"),

  confirm: Yup.string()
    .oneOf(
      [Yup.ref("mypassword")],
      "Password and confirm-password does not match"
    )
    .required("Required"),
});

function Login(props) {
  const [message, setMessage] = useState();
  const [issubmit, setSubmit] = useState();
  const onSignSuccess = async (values) => {
    var formData = new FormData();
    formData.append("email", props.email);
    formData.append("password", values.mypassword);
    formData.append("confirm_password", values.confirm);
    try {
      const res = await axios.post(
        `${constant.BASE_IP}/webapi/change_password`,
        formData
      );

      if (res.data.status == 200) {
        setSubmit(true);
        setMessage(
          "Password updated successfully.Please login with updated password"
        );
      }
    } catch (err) {
      setSubmit(false);
      setMessage(err.message);
    }
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          mypassword: "",
          confirm: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          //console.log(values)
          onSignSuccess(values);

          resetForm({ values: "" });
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <div className="abc">
            <div className="modal-content">
              <div className="modal-sign-div">
                <div className="modal-sign-up">
                  <div className="modal-sign-body">
                    {issubmit ? (
                      <div style={{ color: "green" }}>{message}</div>
                    ) : (
                      <div style={{ color: "red" }}>{message}</div>
                    )}
                    <div className="sign-form">
                      <Form className="register-form">
                        <div className="currently-div">
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

                          <div className="col-md-12">
                            <div className="form-group">
                              {/* <input type="submit" className="btn" value="Sign Up"/> */}
                              <Field
                                type="submit"
                                className="btn"
                                value="Sign Up"
                                //disabled={issubmit}
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

export default Login;
