import { React, useState, useEffect, useMemo, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import axios from "axios";
import constant from "../utils/constants";
import { message, Spin } from "antd";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import AddextraSchoolInfo from "./AddextraSchoolInfo";
import AddCourse from "../components/AddCourse";
import { MultiSelect } from "react-multi-select-component";
import AddCourseOrignal from "../components/AddCourseOrignal";
import { useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import AddtagOnDoc from "../components/AddtagOnDoc";

const AddnewDocument4 = () => {
  const navigate = useNavigate();

  const styles = {
    searchSection: {
      display: "flex",
    },
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      color: state.isSelected ? "red" : "blue",
    }),
    control: (provided) => ({
      ...provided,
      width: "350px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  const [show1, setshow1] = useState();
  const [show2, setshow2] = useState();
  const [show3, setshow3] = useState();
  const [show4, setshow4] = useState();
  const [course, setcourse] = useState([]);
  const [school, setSchool] = useState([]);
  const [subject, setSubject] = useState([]);
  const [Tag, setTag] = useState([]);
  const [flag, setFlag] = useState(true);

  //====================states for validations===================

  const [title, setTitle] = useState("");
  const [titleErr, SettitleErr] = useState(false);
  const [course1, setCourse] = useState("");
  const [courseErr, SetCourseERR] = useState(false);
  const [school1, setSchool1] = useState("");
  const [SchoolErr, setSchoolERR] = useState(false);
  const [subject1, setSubject1] = useState("");
  const [subjectErr, setSubjectERR] = useState(false);
  const [sampleDocument, setSampleDocument] = useState([]);
  const [sampleDocumentErr, setsampleDocumentERR] = useState(false);
  const [sampleImage, setSampleImage] = useState([]);
  const [sampleImageErr, setsampleImageERR] = useState(false);
  const [Price, setPrice] = useState("");
  const [PriceErr, setPriceERR] = useState(false);
  const [Tag1, setTag1] = useState([]);
  const [TagErr, setTagERR] = useState(false);
  const [dependancystate, setDependancystate] = useState(false);

  function loginHandle(e) {
    console.log("hhhhhh");

    let flag = false;

    if (title == "") {
      SettitleErr(true);
      flag = true;
    }
    if (course1 == "") {
      SetCourseERR(true);
      flag = true;
    }
    if (school1 == "") {
      setSchoolERR(true);
      flag = true;
    }
    if (subject1 == "") {
      setSubjectERR(true);
      flag = true;
    }
    if (sampleDocument.length == 0) {
      setsampleDocumentERR(true);
      flag = true;
    }
    if (sampleImage.length == 0) {
      setsampleImageERR(true);
      flag = true;
    }

    if (Price == "") {
      setPriceERR(true);
      flag = true;
    }
    if (Tag1.length == 0) {
      setTagERR(true);
      flag = true;
    }

    if (flag == false) {
      SettitleErr(false);
      SetCourseERR(false);
      setSchoolERR(false);
      setSubjectERR(false);
      setsampleDocumentERR(false);
      setsampleImageERR(false);
      setPriceERR(false);
      setTagERR(false);
      onloginSucess();
      console.log("title", title);
      console.log("school", school1);
      console.log("course", course1);
      console.log("subject", subject1);
      console.log("sampledocument", sampleDocument);
      console.log("sample image", sampleImage);
      console.log("price", Price);
      console.log("Tag", Tag1);
    }

    e.preventDefault();
  }

  const onloginSucess = async () => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    const Formdata = new FormData();
    Formdata.append("_id", localStorage.getItem("id"));
    Formdata.append("Email", localStorage.getItem("email"));
    Formdata.append("Name", localStorage.getItem("name"));
    Formdata.append("title", title);
    Formdata.append("school", school1);
    Formdata.append("course", course1);
    Formdata.append("subject", subject1);
    Formdata.append("sampledocument", sampleDocument);
    Formdata.append("sampleimage", sampleImage);
    Formdata.append("price", Price);
    Formdata.append("Tag", Tag1);

    await axios
      .post("http://192.168.1.47:3006/webapi/add_document", Formdata)
      .then((response) => {
        if (response.data.status === 200) {
          message.success("Data Uploded Successfully");
          navigate(-1);
          console.log("response custom form", response);
        } else if (response.data.status === 400) {
          alert("oops");
        } else {
          console.log("nothing");
        }
      })
      .catch((error) => console.log(error));
  };

  function userHandler(e) {
    let item = e.target.value;
    if (item.length < 3 || !isNaN(item)) {
      SettitleErr(true);
    } else {
      SettitleErr(false);
    }
    setTitle(item);
  }

  function CourseHandler(e) {
    // console.log(e.value);
    let item = e.value;
    // console.log("course value", item);
    if (item.lenght < 0) {
      SetCourseERR(true);
    } else {
      SetCourseERR(false);
    }
    setCourse(item);
  }
  function SchoolHandler(e) {
    // console.log(e.value);
    let item = e.value;
    // console.log("school value", item);
    if (item.lenght < 0) {
      setSchoolERR(true);
    } else {
      setSchoolERR(false);
    }
    setSchool1(item);
  }
  function SubjectHandler(e) {
    // console.log(e.value);
    let item = e.value;
    // console.log("school value", item);
    if (item.lenght < 0) {
      setSubjectERR(true);
    } else {
      setSubjectERR(false);
    }
    setSubject1(item);
  }
  function SampleDocumentHandler(e) {
    // console.log("eoisuroefy", e.target.files);

    let item = e.target.files;
    // console.log("school value", item);
    if (item.lenght < 0) {
      setsampleDocumentERR(true);
    } else {
      setsampleDocumentERR(false);
    }
    setSampleDocument(item[0]);
  }
  function SampleImageHandler(e) {
    // console.log("eoisuroefy", e.target.files);

    let item = e.target.files;
    // console.log("school value", item);
    if (item.lenght < 0) {
      setsampleImageERR(true);
    } else {
      setsampleImageERR(false);
    }
    setSampleImage(item[0]);
  }

  function PriceHandler(e) {
    let item = e.target.value;
    // console.log("school value", item);
    if (item.lenght < 0) {
      setPriceERR(true);
    } else {
      setPriceERR(false);
    }

    if (!isNaN(e.target.value)) {
      setPrice(item);
    }
  }

  function TagHandler(e) {
    console.log("=========================================================", e);
    console.log(e.length);
    if (e.length == 0) {
      setTag1([]);
      setTagERR(true);
    } else {
      let a = [];
      e.map((x) => {
        a.push(x.value);
      });
      setTag1(a);
      setTagERR(false);
    }
  }

  const handleschool = () => {
    setshow1(true);
  };
  const handlecloseSchool = () => {
    setshow1(false);
    setFlag(false);
  };

  const handleSubject = () => {
    setshow2(true);
  };
  const handlecloseSubject = () => {
    setshow2(false);
    setFlag(false);
  };

  const handleCourse = () => {
    setshow3(true);
  };
  const handlecloseCourse = () => {
    setshow3(false);
    setFlag(false);
  };

  const handleTag = () => {
    setshow4(true);
  };
  const handlecloseTag = () => {
    setshow4(false);
    setFlag(false);
  };

  const fetchingDropdowndata = async () => {
    await axios
      .get(`${constant.BASE_IP}/webapi/fetchdocumentformdata`)
      .then((response) => {
        if (response.data.status === 200) {
          // console.log("response for dropdown", response);
          setcourse(response.data.CourseNames);
          setSchool(response.data.SchoolNames);
          setSubject(response.data.SubjectNames);
          setTag(response.data.Tags);
        } else if (response.data.status === 400) {
          // alert("oops");
        } else {
          // console.log("nothing");
        }
      })
      .catch((error) => console.log(error));
  };
  const Course = course.map((x) => ({ value: x.Name, label: x.Name }));
  const School = school.map((x) => ({ value: x.Name, label: x.Name }));
  const Subject = subject.map((x) => ({ value: x.Name, label: x.Name }));
  const Tags = Tag.map((x) => ({ value: x.Name, label: x.Name }));

  // console.log("my Tag ", Tag);

  useEffect(() => {
    fetchingDropdowndata();
  }, []);

  // use memo on run
  useMemo(() => {
    fetchingDropdowndata();
    setFlag(true);
  }, [flag]);

  // useCallback(() => {
  //  fetchingDropdowndata()

  // }, [flag]);

  console.log("==============================");

  return (
    <>
      <div class="col-md-9">
        <div class="uploads-right-area">
          <div class="uploads-right-top">
            <div class="sec-head">
              <h2>Add new document</h2>
            </div>
          </div>

          <div class="uploads-right-main">
            <div class="uploads-right-main-items">
              <div class="uploads-document-box box-sh card card-body">
                <div class="row">
                  <div class="col-md-3">
                    <div class="uploads-document-lft">
                      <span>
                        <i class="far fa-file"></i>
                      </span>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="uploads-document-area">
                      <form onSubmit={loginHandle}>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Title</label>
                              <input
                                type="text"
                                placeholder="Title"
                                autocomplete="off"
                                onChange={userHandler}
                              />
                              <br></br>
                              {titleErr ? (
                                <span style={{ color: "red" }}>
                                  Title Is Required
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="form-group">
                                <label>Course</label>
                                <div style={{ display: "flex" }}>
                                  <Select
                                    options={Course}
                                    onChange={CourseHandler}
                                    styles={customStyles}
                                  />
                                  &nbsp;
                                  <Button onClick={handleCourse}>
                                    ADD Course
                                  </Button>
                                </div>
                              </div>
                              {courseErr ? (
                                <span style={{ color: "red" }}>
                                  Course Is Required
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div class="form-group">
                                <label>School</label>
                                <div style={{ display: "flex" }}>
                                  <Select
                                    options={School}
                                    onChange={SchoolHandler}
                                    styles={customStyles}
                                  />
                                  &nbsp;
                                  <Button onClick={handleschool}>
                                    ADD School
                                  </Button>
                                </div>
                              </div>
                              {SchoolErr ? (
                                <span style={{ color: "red" }}>
                                  School Is Required
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Subject</label>
                              <div style={{ display: "flex" }}>
                                <Select
                                  options={Subject}
                                  onChange={SubjectHandler}
                                  styles={customStyles}
                                />

                                <Button onClick={handleSubject}>
                                  ADD Subject
                                </Button>
                              </div>
                            </div>
                            {subjectErr ? (
                              <span style={{ color: "red" }}>
                                Subject Is Required
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Sample Documents</label>
                              <input
                                type="file"
                                title="&nbsp;"
                                accept="application/pdf,application/vnd.ms-excel"
                                onChange={SampleDocumentHandler}
                              />
                            </div>
                            {sampleDocumentErr ? (
                              <span style={{ color: "red" }}>
                                Sample Document Is Required
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Image</label>
                              <input
                                type="file"
                                title="&nbsp;"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={SampleImageHandler}
                              />
                            </div>
                            {sampleImageErr ? (
                              <span style={{ color: "red" }}>
                                Sample Image Is Required
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Price</label>
                              <input
                                name="price"
                                type="number"
                                min="0"
                                step="1"
                                className="form-control"
                                placeholder="Price in Rupee"
                                autocomplete="off"
                                onChange={PriceHandler}
                              />
                              {PriceErr ? (
                                <span style={{ color: "red" }}>
                                  Price Is Required
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="form-group">
                              <div style={{ display: "flex" }}>
                                <Select
                                  isMulti
                                  options={Tags}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={TagHandler}
                                  styles={customStyles}
                                />
                                &nbsp;
                                <Button onClick={handleTag}>Add Tag</Button>
                              </div>
                            </div>

                            {TagErr ? (
                              <span style={{ color: "red" }}>
                                Tag Is Required
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          &nbsp;
                          <div class="col-md-12">
                            <div class="form-group">
                              <button type="submit">Submit</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show1} onHide={handlecloseSchool}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {<AddextraSchoolInfo handlecloseSchool={handlecloseSchool} />}
        </Modal.Body>
      </Modal>
      {/* ==========================this is popup for add subject name is add course but it holds subject description */}
      <Modal show={show2} onHide={handlecloseSubject}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {<AddCourse handlecloseSubject={handlecloseSubject} />}
        </Modal.Body>
      </Modal>

      <Modal show={show3} onHide={handlecloseCourse}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {<AddCourseOrignal handlecloseCourse={handlecloseCourse} />}
        </Modal.Body>
      </Modal>

      <Modal show={show4} onHide={handlecloseTag}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {<AddtagOnDoc handlecloseTag={handlecloseTag} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddnewDocument4;
