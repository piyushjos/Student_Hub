import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import constant from "../utils/constants";
import axios from "axios";
import { message, Spin } from "antd";
var moment = require("moment");

const SignupSchema = Yup.object().shape({
  Title: Yup.string()
    .required("Subject is required")
    .min(2, "Subject should minimun 5 character long")
    .max(35, "Subject should maximum 35 character long"),
  price: Yup.string().required("Price is required"),
  startDate: Yup.string().required("Date is required"),
  Question: Yup.string().required("My question is required"),
});
function TutoraddnewQuestion(props) {
  const [spinflag, setSpinflag] = useState(true);
  const [issubmit, setIssubmit] = useState(false);
  const [title1, settitle] = useState("");
  const [price1, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [question, setQuestion] = useState("");

  const onSubmitSuccess = async (values) => {
    console.log("hjgsdghdshdsdgfdg");
    console.log(values);
    setIssubmit(true);
    setSpinflag(false);
    var formData = new FormData();
    formData.append("values", JSON.stringify(values));
    formData.append("_id", props.id);
    formData.append("email", localStorage.getItem("email"));
    formData.append("name", localStorage.getItem("name"));

    try {
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/update_tuplemyquestion`,
        formData
      );
      console.log("response", response.data.status);
      if (response.data.status == 200) {
        setSpinflag(true);
        message.success("Data updated successfully");
        props.handleClose1();
      } else {
        console.log("lllllllllllllllllll");
        // message.error(response.data.message);
        alert(response.data.message);
        setIssubmit(false);
        setSpinflag(true);
      }
    } catch (err) {
      setIssubmit(false);
      setSpinflag(true);
      alert(err);
    }
  };

  const onEditbookForm = async () => {
    const Formdata = new FormData();
    Formdata.append("_id", props.id);
    await axios
      .post(`${constant.BASE_IP}/webapi/fetch_tuplemyquestion`, Formdata, {})
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          console.log(response.data.data);
          settitle(response.data.data[0].title);
          setDate(
            moment(response.data.data[0].deadline_date).format("DD/MM/YYYY")
          );
          setPrice(response.data.data[0].price);
          setQuestion(response.data.data[0].Question);
        } else if (response.data.status === 400) {
          alert("oops");
        } else {
          alert("oops");
        }
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    onEditbookForm();
  }, []);
  return (
    <div>
      {date}
      <Formik
        enableReinitialize={true}
        initialValues={{
          Title: String(title1),
          price: String(price1),
          Question: String(question),
          startDate: date,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          onSubmitSuccess(values);
        }}
      >
        {({
          errors,
          touched,
          setFieldValue,
          values,
          DateTimeField,
          DefaultTz,
        }) => (
          <div class="modal-dialog">
            <div class="modal-content">
              {values.startDate}
              <div class="modal-sign-div">
                <div class="modal-sign-in">
                  <div class="modal-sign-head">
                    <h2>Update your Question</h2>
                  </div>
                  <div class="modal-sign-body modal-post-body">
                    <Form>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <div class="row">
                              <div class="col-md-3">
                                <label>Subject</label>
                              </div>
                              <div class="col-md-9">
                                <Field
                                  as="select"
                                  name="Title"
                                  className="form-control"
                                >
                                  <option label="Topic/Subtopic"></option>
                                  <option value="Biology">Biology</option>
                                  <option value="Business">Business</option>
                                  <option value="Phycology">Phycology</option>
                                  <option value="Chemistry">Chemistry</option>
                                  <option value="English">English</option>
                                  <option value="Maths">Maths</option>
                                  <option value="Physics">Physics</option>
                                </Field>
                                {errors.Title && touched.Title ? (
                                  <div style={{ color: "red" }}>
                                    {errors.Title}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="col-md-12">
                          <div class="form-group">
                            <label>Type your question here</label>
                            <textarea
                              class="form-control"
                              placeholder="Type your question here..."
                            ></textarea>
                          </div>
                        </div> */}
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
                                <label>Price</label>
                              </div>
                              <div class="col-md-9">
                                <Field
                                  name="price"
                                  type="number"
                                  className="form-control"
                                  placeholder="Price"
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
                                <label>Deadline</label>
                              </div>
                              <div class="col-md-9">
                                {/* <input
                                  class="form-control"
                                  type="date"
                                  placeholder="$"
                                /> */}
                                <Field
                                  name="startDate"
                                  type="date"
                                  className="form-control"
                                  placeholder="Date"
                                  autocomplete="off"
                                />
                                {errors.startDate && touched.startDate ? (
                                  <div style={{ color: "red" }}>
                                    {errors.startDate}
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
                                <label>Question</label>
                              </div>
                              <div class="col-md-9">
                                <Field
                                  as="textarea"
                                  name="Question"
                                  placeholder="Put your question here"
                                  style={{ height: "100%", width: "100%" }}
                                ></Field>
                                {errors.Question && touched.Question ? (
                                  <div style={{ color: "red" }}>
                                    {errors.Question}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <div class="row">
                              <div class="col-md-9">
                                <div class="form-group">
                                  <input
                                    type="submit"
                                    value="UPDATE"
                                    class="btn"
                                    disabled={issubmit}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
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

export default TutoraddnewQuestion;
