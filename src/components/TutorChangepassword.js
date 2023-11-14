import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import constant from "../utils/constants";

const SignupSchema = Yup.object().shape({
  current_password: Yup.string().required("Current password is Required"),
  new_password: Yup.string().required("New password is Required"),
  confirm_password: Yup.string()
    .oneOf(
      [Yup.ref("new_password")],
      "New password and Confirm password does not match"
    )
    .required("Confirm password is Required"),
});
function TutorChangepassword(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate("/tutor-help", { replace: true });
  };
  const handleShow = () => setShow(true);

  const updateForm = async (values) => {
    // console.log(values);
    try {
      var formData = new FormData();
      formData.append("values", JSON.stringify(values));
      formData.append("_id", localStorage.getItem("id"));

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/update_password`,
        formData
      );
      // console.log(response.data.flag);
      if (response.data.status == 200) {
        handleShow();
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div class="col-md-9">
      <Formik
        enableReinitialize={true}
        initialValues={{
          current_password: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          updateForm(values);
          //   console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue, values }) => (
          <div class="uploads-right-area">
            <div class="update-right card card-body box-sh">
              <Form>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Current password <span>*</span>
                      </label>
                      <Field
                        name="current_password"
                        type="password"
                        className="form-control"
                        placeholder="Current password"
                        autocomplete="off"
                      />
                      {errors.current_password && touched.current_password ? (
                        <div style={{ color: "red" }}>
                          {errors.current_password}
                        </div>
                      ) : null}
                      {/* <input
                        type="text"
                        class="form-control"
                        placeholder="Current password"
                        value=""
                      /> */}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        New password <span>*</span>
                      </label>
                      <Field
                        name="new_password"
                        type="password"
                        className="form-control"
                        placeholder="New password"
                        autocomplete="off"
                      />
                      {errors.new_password && touched.new_password ? (
                        <div style={{ color: "red" }}>
                          {errors.new_password}
                        </div>
                      ) : null}
                      {/* <input
                        type="text"
                        class="form-control"
                        placeholder="New password"
                        value=""
                      /> */}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Confirm password <span>*</span>
                      </label>
                      {/* <input
                        type="text"
                        class="form-control"
                        placeholder="Confirm password"
                        value=""
                      /> */}
                      <Field
                        name="confirm_password"
                        type="password"
                        className="form-control"
                        placeholder="New password"
                        autocomplete="off"
                      />
                      {errors.confirm_password && touched.confirm_password ? (
                        <div style={{ color: "red" }}>
                          {errors.confirm_password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input
                        type="submit"
                        class="btn"
                        value="Change password"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      {/*popup model for forgot password*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ color: "green" }}>
          <h1>Password updated successfully</h1>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TutorChangepassword;
