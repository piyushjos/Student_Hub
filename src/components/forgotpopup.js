import { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import ForgotOtp from "./forgotpopupotp";
import constant from "../utils/constants";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),
});

function Otppopup(props) {
  const [message, setMassage] = useState("");
  const [email5, setEmail5] = useState("");

  const [issubmit, setSubmit] = useState();
  {
    /*This function for forgot password pop  */
  }
  const [show8, setShow8] = useState(false);
  const handleClose8 = () => {
    setShow8(false);
    props.handleClose7();
  };
  const handleShow8 = () => setShow8(true);

  const onSignSuccess = async (values) => {
    setEmail5(values.email);
    var formData = new FormData();
    formData.append("email", values.email);
    try {
      const res = await axios.post(
        `${constant.BASE_IP}/webapi/forgotpop_otp`,
        formData
      );
      if (res.data.flag == 200) {
        setSubmit(true);

        handleShow8();
      } else if (res.data.status == 400) {
        setSubmit(false);
        setMassage("please use registered email.");
      }
    } catch (err) {
      setMassage("wrong email address");
      setSubmit(false);
    }

    // console.log(values.email)

    //props.handleClose7()
  };
  return (
    <Fragment>
      <Formik
        initialValues={{
          email: "",
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
                                  Email<span>*</span>
                                </label>
                                {/* <input type="text" className="form-control" placeholder="Last Name" />*/}
                                <Field
                                  name="email"
                                  type="text"
                                  className="form-control"
                                  placeholder="EMAIL HERE"
                                  autocomplete="off"
                                />
                                {errors.email && touched.email ? (
                                  <div style={{ color: "red" }}>
                                    {errors.email}
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
                  <div style={{ color: "red" }}>{message}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
      {/*popup model for OTP page */}
      <Modal show={show8} onHide={handleClose8}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "orange" }}>
          OTP is sanded in your mail.
          {/*<Popup email={email1} handleClose8={handleClose8}/>*/}
          <ForgotOtp
            email={email5}
            handleShow8={handleShow8}
            handleClose8={handleClose8}
            handleClose7={props.handleClose7}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default Otppopup;
