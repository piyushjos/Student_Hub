import Select from "react-select";
import { Button } from "react-bootstrap";
import { Fragment } from "react";
import { Formik, Form, Field, Dropdown } from "formik";
import * as Yup from "yup";
import axios from "axios";
import constant from "../utils/constants";
import { React, useState, useEffect } from "react";

const validatio12 = Yup.object().shape({
  subject: Yup.string().required("Course is Required"),
});

const AddCourseOrignal = (props) => {
  const submitForm = async (values) => {
    console.log(values);

    await axios
      .post(`${constant.BASE_IP}/webapi/addCourseName`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("checkresponse", res);
        if (res.data.status === 200) {
          props.handlecloseCourse()
          alert("Api sucess");
        }
        if (res.data.status === 400) {
          console.log("res");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          subject: "",
        }}
        validationSchema={validatio12}
        onSubmit={(values) => {
          console.log("Add course", values);
          submitForm(values);
        }}
      >
        {({ errors, touched, setFieldValue, values, setFieldTouched }) => (
          <div class="modal-body">
            <div class="rate-document-message"></div>
            <div class="sign-form">
              <Form id="subjectForm" enctype="multipart/form-data">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Course Name <span>*</span>
                      </label>
                      <Field
                        type="text"
                        name="subject"
                        id="subjects-0"
                        class="form-control"
                        placeholder="Write course  name"
                      />
                      {errors.subject && touched.subject ? (
                        <div style={{ color: "red" }}>{errors.subject}</div>
                      ) : null}
                      <span class="subjects-error-0 error-validate"></span>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group loader-overlay-div">
                      <input
                        type="submit"
                        id="addSubject_0"
                        class="addSubject btn"
                        value="Submit"
                      />
                      <span class="loader-overlayto">
                        <div class="loader"></div>
                      </span>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </Fragment>
  );
};

export default AddCourseOrignal;
