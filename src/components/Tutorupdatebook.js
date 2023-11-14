import React from "react";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Formik, Form, Field, Dropdown } from "formik";
import * as Yup from "yup";
import axios from "axios";
import constant from "../utils/constants";
import { Link } from "react-router-dom";

const validatio12 = Yup.object().shape({
  book: Yup.string().required("Book is Required"),

  myfile: Yup.string(),
  myfile1: Yup.string(),

  subject: Yup.string().required("subject is Required"),

  price: Yup.string().required("Price is Required"),
  tag: Yup.string().required("Tag is Required"),
  title: Yup.string().required("Title is Required"),
  AboutBook: Yup.string().required("About book is Required"),
});

const EditAddnewBookForm = (props) => {
  const [title1, settitle] = useState("");
  const [subject1, setsubject] = useState("");
  const [course1, setcourse] = useState("");
  const [price1, setprice] = useState("");
  const [Tag1, setTag] = useState("");
  const [Book1, setBook] = useState("");
  const [image1, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [about, setAbout] = useState("");

  const onEditbookForm = async () => {
    console.log("hello");
    console.log(props.IdforEdit);
    const Formdata = new FormData();
    Formdata.append("_id", props.IdforEdit);
    console.log(Formdata);
    await axios
      .post(`${constant.BASE_IP}/webapi/fetch_booktupleData`, Formdata, {})
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          console.log(response.data.data);
          settitle(response.data.data[0].title);
          setsubject(response.data.data[0].subject);
          setcourse(response.data.data[0].course);
          setprice(response.data.data[0].price);
          setTag(response.data.data[0].tag);
          setBook(response.data.data[0].book);
          setImage(response.data.data[0].book_image);
          setImage2(response.data.data[0].samplefile_image);
          setAbout(response.data.data[0].AboutBook);
        } else if (response.data.status === 400) {
        } else {
          alert("oops");
        }
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    onEditbookForm();
  }, []);

  const submitForm = async (values) => {
    console.log("edit form check", props.IdforEdit);
    const Formdata = new FormData();
    Formdata.append("_id", props.IdforEdit);
    Formdata.append("values", JSON.stringify(values));
    Formdata.append("samplefile", values.myfile);
    Formdata.append("bookforsale", values.myfile1);
    console.log("for id", Formdata);

    await axios
      .post(`${constant.BASE_IP}/webapi/update_booktupleData`, Formdata, {})
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          props.handleClose1();
        }
      })
      .catch((error) => console.log(error));

    console.log(values);
  };
  return (
    <div>
      <Fragment>
        <Formik
          enableReinitialize={true}
          initialValues={{
            book: String(Book1),
            subject: String(subject1),
            myfile: "",
            myfile1: "",
            price: String(price1),
            tag: String(Tag1),
            title: String(title1),
            AboutBook: about,
          }}
          validationSchema={validatio12}
          onSubmit={(values) => {
            console.log(values);
            submitForm(values);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <div>
              <div id="myModal3">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-sign-up">
                      <div className="modal-sign-head">
                        <h2>Edit New Book</h2>
                      </div>
                      <div className="modal-sign-body">
                        <div className="add-form">
                          <Form>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label>Title</label>
                                    </div>
                                    <div className="col-md-9">
                                      <Field
                                        type="text"
                                        className="form-control"
                                        placeholder="Title"
                                        name="title"
                                        value={values.title}
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
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label>Book Type</label>
                                    </div>
                                    <div className="col-md-9">
                                      <Field
                                        as="select"
                                        name="book"
                                        className="form-control"
                                      >
                                        <option label="Select a Book"></option>
                                        <option value="FictionBook">
                                          Fiction Book
                                        </option>
                                        <option value="Non-Fiction Book">
                                          Non-Fiction Book
                                        </option>
                                        <option value="Text Book">
                                          Text Book
                                        </option>

                                        <option value="Business">
                                          Business
                                        </option>
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
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label>Book subject</label>
                                    </div>
                                    <div className="col-md-9">
                                      <Field
                                        as="select"
                                        name="subject"
                                        className="form-control"
                                        value={values.subject}
                                      >
                                        <option label="Select a Subject"></option>
                                        <option value="English">English</option>
                                        <option value="Biology">Biology</option>
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
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label>Sample File</label>
                                    </div>
                                    <div className="col-md-9">
                                      <label
                                        className="inputfile-label"
                                        for="file-1"
                                      >
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" fill="#2c2f8c" viewBox="0 0 20 17">
                                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                                        </svg> */}
                                        <input
                                          type="file"
                                          name="myfile"
                                          defaultValue={values.myfile}
                                          onChange={(e) =>
                                            setFieldValue(
                                              "myfile",
                                              e.target.files[0]
                                            )
                                          }
                                        />
                                        <div style={{ height: 80, width: 80 }}>
                                          {" "}
                                          <img
                                            src={`${constant.BASE_URL}/uploads/TutorbookImages/${image1}`}
                                            alt=""
                                          />
                                        </div>

                                        {errors.myfile && touched.myfile ? (
                                          <div style={{ color: "red" }}>
                                            {errors.myfile}
                                          </div>
                                        ) : null}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label>Book for Sale</label>
                                    </div>
                                    <div className="col-md-9">
                                      <label
                                        className="inputfile-label"
                                        for="file-1"
                                      >
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" fill="#2c2f8c" viewBox="0 0 20 17">
                                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                                        </svg> */}
                                        <input
                                          type="file"
                                          defaultValue={values.myfile}
                                          onChange={(e) =>
                                            setFieldValue(
                                              "myfile1",
                                              e.target.files[0]
                                            )
                                          }
                                        />
                                        <div style={{ height: 80, width: 80 }}>
                                          {" "}
                                          <img
                                            src={`${constant.BASE_URL}/uploads/TutorbookImages/${image2}`}
                                            alt=""
                                          />
                                        </div>

                                        {errors.myfile1 && touched.myfile1 ? (
                                          <div style={{ color: "red" }}>
                                            {errors.myfile1}
                                          </div>
                                        ) : null}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label>Price</label>
                                    </div>
                                    <div className="col-md-9">
                                      <Field
                                        type="number"
                                        className="form-control"
                                        placeholder="$"
                                        name="price"
                                        autocomplete="off"
                                        value={values.price}
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
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <label>Select Tag</label>
                                    </div>
                                    <div className="col-md-9">
                                      <Field
                                        as="select"
                                        name="tag"
                                        className="form-control"
                                        value={values.tag}
                                      >
                                        <option label="Select a Tag"></option>
                                        <option value="English">English</option>
                                        <option value="Biology">Biology</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Business">
                                          Business
                                        </option>
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
                                        style={{
                                          height: "100%",
                                          width: "100%",
                                        }}
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
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="submit"
                                    className="btn"
                                    value="Submit"
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
            </div>
          )}
        </Formik>
      </Fragment>
    </div>
  );
};

export default EditAddnewBookForm;
