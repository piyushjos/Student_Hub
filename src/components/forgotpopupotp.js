import { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Setforgot from "./Setforgotpassword";
import constant from "../utils/constants";

const SignupSchema = Yup.object().shape({
  otp: Yup.string().required("otp required"),
});

function Otppopup(props) {
  const [message, setMassage] = useState("");
  const [email6, setemail6] = useState(props.email);
  const [issubmit, setSubmit] = useState();
  {
    /*initializing navigate */
  }
  {
    /*This function for forgot password pop  */
  }
  const [show9, setShow9] = useState(false);
  const handleClose9 = () => {
    setShow9(false);
    props.handleClose8();
  };
  const handleShow9 = () => setShow9(true);

  const navigate = useNavigate();

  const onSignSuccess = async (values) => {
    var formData = new FormData();
    formData.append("email", props.email);
    formData.append("otp", values.otp);

    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/forgot_otpcheck`,
        formData
      );

      if (response.data.status == 200) {
        setSubmit(true);
        setMassage("otp matches");
        handleShow9();
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
      {/*popup model for forgot  password*/}
      <Modal show={show9} onHide={handleClose9}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "orange" }}>
          please change password
          {/*<Popup email={email1} handleClose5={handleClose5}/>*/}
          <Setforgot
            email={email6}
            handleClose9={handleClose9}
            handleClose7={props.handleClose7}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default Otppopup;
