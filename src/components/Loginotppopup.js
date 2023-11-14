import { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import constant from "../utils/constants";

const SignupSchema = Yup.object().shape({
  otp: Yup.string().required("otp required"),
});

function Otppopup(props) {
  const [message, setMassage] = useState("");

  const [issubmit, setSubmit] = useState();
  {
    /*initializing navigate */
  }
  const navigate = useNavigate();

  const onSignSuccess = async (values) => {
    var formData = new FormData();
    formData.append("email", props.email);
    formData.append("otp", values.otp);

    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/register_otp`,
        formData
      );

      if (response.data.status == 200) {
        setSubmit(true);
        setMassage(
          "register successfully and email also verified please login with same details"
        );
        if (response.data.token !== "error") {
          //alert("user sucessfully Logged in")
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);
        }
        if (localStorage.getItem("role") == "tutor") {
          navigate("/tutor-help", { replace: true });
        }
        if (localStorage.getItem("role") == "student") {
          navigate("/", { replace: true });
        }
        props.handleClose5();
      }
    } catch (err) {
      setMassage("OTP WRONG TRY AGAIN");
      setSubmit(false);
    }
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // console.log(values)
          onSignSuccess(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <div className="abc">
            <div className="modal-content">
              <div className="modal-sign-div">
                <div className="modal-sign-up">
                  <div className="modal-sign-body">
                    <div className="sign-form">
                      <Form className="register-form">
                        <div className="row">
                          <div className="currently-div">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  OTP <span>*</span>
                                </label>
                                {/* <input type="text" className="form-control" placeholder="Last Name" />*/}
                                <Field
                                  name="otp"
                                  type="text"
                                  className="form-control"
                                  placeholder="OTP HERE"
                                  autocomplete="off"
                                />
                                {errors.otp && touched.otp ? (
                                  <div style={{ color: "red" }}>
                                    {errors.otp}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              {/* <input type="submit" className="btn" value="Sign Up"/> */}
                              <Field
                                type="submit"
                                className="btn"
                                value="SUBMIT"
                                disabled={issubmit}
                              />
                              {/* <button type="submit" className="btn">Submit</button> */}
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                  {issubmit ? (
                    <div style={{ color: "green" }}>{message}</div>
                  ) : (
                    <div style={{ color: "red" }}>{message}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </Fragment>
  );
}

export default Otppopup;
