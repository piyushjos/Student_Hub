import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import constant from "../utils/constants";
import { message, Spin } from "antd";

const SignupSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  book: Yup.string().required("Book type is required"),
  subject: Yup.string().required("Book subject is required"),
  myfile: Yup.string().required("Sample file is required"),
  mySalefile: Yup.string().required("Sample file is required"),
  price: Yup.string().required("Price is required"),
  tag: Yup.string().required("Tags is required"),
  AboutBook: Yup.string().required("About book is required"),
});
function TutoraddNewbook(props) {
  const [spinflag, setSpinflag] = useState(true);
  const [issubmit, setIssubmit] = useState(false);

  const onSubmitSuccess = async (values) => {
    setSpinflag(false);
    setIssubmit(true);
    var formData = new FormData();
    // console.log("dfhdiufhdiufdifudiufh");
    // console.log("1", values);
    // console.log("2", JSON.stringify(values));
    // console.log("3", values.myfile);
    // console.log("4", localStorage.getItem("id"));
    // console.log("5", localStorage.getItem("email"));
    // console.log("6", localStorage.getItem("name"));
    // console.log("3", values.mySalefile);
    formData.append("values", JSON.stringify(values));
    formData.append("samplefile", values.myfile);
    formData.append("bookforsale", values.mySalefile);
    formData.append("_id", localStorage.getItem("id"));
    formData.append("email", localStorage.getItem("email"));
    formData.append("name", localStorage.getItem("name"));
    console.log(formData);
    console.log(JSON.stringify(formData));
    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/add_book`,
        formData
      );
      console.log("response", response.data.status);
      if (response.data.status == 200) {
        setSpinflag(true);
        message.success("Data added successfully");

        props.handleClose();
      } else {
        message.error(response.data.message);
        setIssubmit(false);
      }
    } catch (err) {
      setIssubmit(false);
      alert(err);
    }
  };
  return (
    <div id="myModal3">
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: "",
          book: "",
          subject: "",
          myfile: "",
          mySalefile: "",
          price: "",
          tag: "",
          AboutBook: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          onSubmitSuccess(values);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-sign-div">
                <div class="modal-sign-up">
                  <div class="modal-sign-head">
                    <h2>Add New Book</h2>
                  </div>

                  <div class="modal-sign-body">
                    <div class="add-form">
                      <Form>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>Title</label>
                                </div>
                                <div class="col-md-9">
                                  <Field
                                    name="title"
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    autocomplete="off"
                                  />
                                  {errors.title && touched.title ? (
                                    <div style={{ color: "red" }}>
                                      {errors.title}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          {spinflag ? (
                            ""
                          ) : (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Spin />{" "}
                            </span>
                          )}
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>Book Type</label>
                                </div>
                                <div class="col-md-9">
                                  <Field
                                    as="select"
                                    name="book"
                                    className="form-control"
                                  >
                                    <option label="Topic/Subtopic"></option>
                                    <option value="Biology">Biology</option>
                                    <option value="Business">Business</option>
                                    <option value="Phycology">Phycology</option>
                                    <option value="Chemistry">Chemistry</option>
                                  </Field>
                                  {errors.book && touched.book ? (
                                    <div style={{ color: "red" }}>
                                      {errors.book}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>Book subject</label>
                                </div>
                                <div class="col-md-9">
                                  <Field
                                    as="select"
                                    name="subject"
                                    className="form-control"
                                  >
                                    <option label="Topic/Subtopic"></option>
                                    <option value="English">English</option>
                                    <option value="Maths">Maths</option>
                                    <option value="Physics">Physics</option>
                                  </Field>
                                  {errors.subject && touched.subject ? (
                                    <div style={{ color: "red" }}>
                                      {errors.subject}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>Sample File</label>
                                </div>
                                <div class="col-md-9">
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
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>Book for Sale</label>
                                </div>
                                <div class="col-md-9">
                                  {" "}
                                  <input
                                    type="file"
                                    title="&nbsp;"
                                    onChange={(e) =>
                                      setFieldValue(
                                        "mySalefile",
                                        e.target.files[0]
                                      )
                                    }
                                  />
                                  {errors.mySalefile && touched.mySalefile ? (
                                    <div style={{ color: "red" }}>
                                      {errors.mySalefile}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>Price</label>
                                </div>
                                <div class="col-md-9">
                                  <Field
                                    name="price"
                                    type="number"
                                    className="form-control"
                                    placeholder="Price in Rupee"
                                    autocomplete="off"
                                  />
                                  {errors.price && touched.price ? (
                                    <div style={{ color: "red" }}>
                                      {errors.price}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>Tags</label>
                                </div>
                                <div class="col-md-9">
                                  <Field
                                    as="select"
                                    name="tag"
                                    className="form-control"
                                  >
                                    <option label="Topic/Subtopic"></option>
                                    <option value="Biology">Biology</option>
                                    <option value="Business">Business</option>
                                    <option value="Phycology">Phycology</option>
                                    <option value="Chemistry">Chemistry</option>
                                  </Field>
                                  {errors.tag && touched.tag ? (
                                    <div style={{ color: "red" }}>
                                      {errors.tag}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label>About Book</label>
                                </div>
                                <div class="col-md-9">
                                  <Field
                                    as="textarea"
                                    name="AboutBook"
                                    style={{ height: "100%", width: "100%" }}
                                  ></Field>
                                  {errors.AboutBook && touched.AboutBook ? (
                                    <div style={{ color: "red" }}>
                                      {errors.AboutBook}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <input
                                type="submit"
                                class="btn"
                                disabled={issubmit}
                              />
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
    </div>
  );
}

export default TutoraddNewbook;
