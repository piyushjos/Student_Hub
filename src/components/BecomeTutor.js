import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import AddNewbook from "./TutoraddNewbook";
import Tupdate from "./Tutorupdatebook";
import axios from "axios";
import constant from "../utils/constants";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("First_name is required"),
  last_name: Yup.string().required("LastName is required"),
  Email: Yup.string().required("Email is required"),
  myfile: Yup.string().required("Sample file is required"),
  age: Yup.string().required("Age is required"),
  education_level: Yup.string().required("Education  is required"),
  specialization: Yup.string().required("specialization is required"),
  teaching_experience: Yup.string().required("Teaching Experience is required"),
  about: Yup.string().required("About is required"),
  Document_Discription: Yup.string().required(
    "Document Discription is required"
  ),
});

const BecomeTutor = () => {
  const onSubmitSuccess = async (values) => {
    console.log(values);
    var formData = new FormData();
    formData.append("_id", localStorage.getItem("id"));
    formData.append("values", JSON.stringify(values));
    formData.append("samplefile", values.myfile);

    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/becomeaTutor`,
        formData
      );
      console.log("response", response.data.status);
      if (response.data.status == 200) {
        //setSpinflag(true);
        //message.success("Data added successfully");
        console.log("helooooo", response.data.data[0].UserType);
        if (response.data.data[0].UserType == "tutor") {
          localStorage.setItem("role", "tutor");
        }
      } else {
        // message.error(response.data.message);
      }
    } catch (err) {
      //setIssubmit(false);
      alert(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          first_name: localStorage.getItem("name"),
          last_name: "",
          Email: localStorage.getItem("email"),
          myfile: "",
          age: "",
          education_level: "",
          teaching_experience: "",
          about: "",
          Document_Discription: "",
          specialization: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          onSubmitSuccess(values);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <div class="col-lg-9 col-md-8">
            <div class="update-right card card-body box-sh">
              <Form>
                <div class="row">
                  <div class="col-md-12">
                    <h2>Personal Information</h2>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        First Name <span>*</span>
                      </label>
                      <Field
                        type="text"
                        id="first_name_tutor"
                        name="first_name"
                        class="form-control Alphaonly"
                        placeholder="First Name"
                        autocomplete="off"
                      />
                      {errors.first_name && touched.first_name ? (
                        <div style={{ color: "red" }}>{errors.first_name}</div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        Last Name <span>*</span>
                      </label>
                      <Field
                        type="text"
                        name="last_name"
                        id="last_name_tutor"
                        class="form-control Alphaonly"
                        placeholder="Last Name"
                        autocomplete="off"
                        maxlength="20"
                      />
                      {errors.last_name && touched.last_name ? (
                        <div style={{ color: "red" }}>{errors.last_name}</div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        Email <span>*</span>
                      </label>
                      <Field
                        type="text"
                        name="Email"
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>
                    {errors.Email && touched.Email ? (
                      <div style={{ color: "red" }}>{errors.Email}</div>
                    ) : null}
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        Age <span>*</span>
                      </label>
                      <Field
                        type="text"
                        name="age"
                        id="age_tutor"
                        class="form-control Numeric"
                        placeholder="Enter your age"
                        autocomplete="off"
                      />
                      {errors.age && touched.age ? (
                        <div style={{ color: "red" }}>{errors.age}</div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <h2>
                      Highest level of education completed with Specialization?
                    </h2>
                  </div>
                  <div class="row col-md-12">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>
                          Education Level <span>*</span>
                        </label>
                        <Field
                          type="text"
                          name="education_level"
                          id="education_level_tutor"
                          class="form-control"
                          placeholder="Enter your education Level"
                          autocomplete="off"
                        />
                        {errors.education_level && touched.education_level ? (
                          <div style={{ color: "red" }}>
                            {errors.education_level}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>
                          Specialization in any Stream<span>*</span>
                        </label>
                        <Field
                          type="text"
                          name="specialization"
                          id="specialization"
                          class="form-control"
                          placeholder="Enter your specialization"
                          autocomplete="off"
                        />
                        <span class="specialization error"></span>
                      </div>
                      {errors.specialization && touched.specialization ? (
                        <div style={{ color: "red" }}>
                          {errors.specialization}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <h2>Describe your teaching or tutoring experience</h2>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Teaching Experience <span>*</span>
                      </label>
                      <Field
                        name="teaching_experience"
                        as="textarea"
                        style={{ height: "100%", width: "100%" }}
                        id="teaching_experience_tutor"
                        class="form-control"
                        placeholder="Enter your experence..."
                        //   maxlength="500"
                      ></Field>
                      {errors.teaching_experience &&
                      touched.teaching_experience ? (
                        <div style={{ color: "red" }}>
                          {errors.teaching_experience}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <h2>About</h2>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        About yourself<span>*</span>
                      </label>
                      <Field
                        as="textarea"
                        style={{ height: "100%", width: "100%" }}
                        name="about"
                        id="about_student"
                        class="form-control"
                        placeholder="Enter something about yourself..."
                      ></Field>
                      {errors.about && touched.about ? (
                        <div style={{ color: "red" }}>{errors.about}</div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <h2>Your certifications</h2>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Attach Document <span>*</span>
                      </label>
                      <div class="row">
                        <div class="col-md-5">
                          <input
                            id="attached_doc_tutor"
                            type="file"
                            onChange={(e) =>
                              setFieldValue("myfile", e.target.files[0])
                            }
                          />
                          {errors.myfile && touched.myfile ? (
                            <div style={{ color: "red" }}>{errors.myfile}</div>
                          ) : null}
                        </div>
                        <div class="col-md-5">
                          <Field
                            type="text"
                            class="form-control"
                            placeholder="Document description"
                            id="Document_Discription"
                            name="Document_Discription"
                            autocomplete="off"
                            maxlength="100"
                          />
                          {errors.Document_Discription &&
                          touched.Document_Discription ? (
                            <div style={{ color: "red" }}>
                              {errors.Document_Discription}
                            </div>
                          ) : null}
                        </div>
                        <div class="col-md-2">
                          <input
                            type="submit"
                            class="btn"
                            //   disabled={issubmit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  -
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default BecomeTutor;
