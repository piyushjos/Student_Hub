import * as Yup from "yup";
import { React, useState, useEffect } from "react";
import constant from "../utils/constants";
import { Formik, Form, Field } from "formik";
import axios from "axios";
const SignupSchema = Yup.object().shape({
  school: Yup.string().required("School is required"),
});

const AddextraSchoolInfo = (props) => {
  const submitForm = async (values) => {
    await axios
      .post(`${constant.BASE_IP}/webapi/addSchoolName`, values, {})
      .then((res) => {
        console.log("checkresponse", res);
        if (res.data.status === 200) {
          props.handlecloseSchool()
        }
        if (res.data.status === 400) {
          console.log("res");
          alert("Data missing");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          school: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log("pppppppppppppppppppppppppp", values);
          submitForm(values);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <div class="modal-sign-in">
            <div class="modal-sign-head">
              <h2>Add School</h2>
            </div>
            <div class="modal-body">
              <div class="rate-document-message"></div>
              <div class="sign-form">
                <Form id="schoolForm" enctype="multipart/form-data">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>
                          School Name <span>*</span>
                        </label>
                        <Field
                          type="text"
                          name="school"
                          id="name-0"
                          class="form-control"
                          placeholder="Write School name"
                        />
                        {errors.school && touched.school ? (
                          <div style={{ color: "red" }}>{errors.school}</div>
                        ) : null}
                        <span class="name-error-0 error-validate"></span>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group">
                        <span class="logo-error-0 error-validate"></span>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group loader-overlay-div">
                        <Field
                          type="submit"
                          id="addSchools_0"
                          class="addSchools btn"
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
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddextraSchoolInfo;
