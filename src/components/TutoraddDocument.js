import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { withRouter } from "./withRouter";
import axios from "axios";
import constant from "../utils/constants";
import { message } from "antd";

export class TutoraddDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputList: [
        {
          title: "",
          book: "",
          subject: "",
          course: "",
          myfile: "",
          price: "",
          tag: "",
          email: "",
          user_id: "",
          titleErr: "",
          bookErr: "",
          subjectErr: "",
          courseErr: "",
          myfileErr: "",
          priceErr: "",
          tagErr: "",
          name: "",
        },
      ],
    };
  }

  // handle click event of the Remove button
  handleRemoveClick = (index) => {
    // console.log("index", index);
    const { inputList } = this.state;
    const list = [...inputList];
    // console.log(list);
    list.splice(index, 1);
    this.setState({ inputList: list });
  };

  // handle click event of the Add button
  handleAddClick = () => {
    let list = this.state.inputList;
    list.push({
      title: "",
      book: "",
      subject: "",
      course: "",
      myfile: "",
      price: "",
      email: "",
      user_id: "",
      tag: "",
      titleErr: "",
      bookErr: "",
      subjectErr: "",
      courseErr: "",
      myfileErr: "",
      priceErr: "",
      tagErr: "",
      name: "",
    });
    this.setState(list);
  };

  // Call Submit api After handle submit request.
  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.handleValidation()) {
      return true;
    }

    console.log(this.state.inputList);
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("data", JSON.stringify(this.state.inputList));

      const { inputList } = this.state;
      const list = [...inputList];
      for (let i = 0; i < inputList.length; i++) {
        for (var key in inputList[i]) {
          if (key === "myfile") {
            console.log("abc");
            //console.log(this.state.inputList[i].myfile);
            bodyFormData.append("data", this.state.inputList[i].myfile);
          }
        }
      }

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/add_document`,
        bodyFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.status == 200) {
        // alert("data successfully inserted");
        message.success("stock updated successfully");
        this.props.navigate(-1);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // handle input change
  handleInputChange = (e, index) => {
    const { inputList } = this.state;
    const { name, value } = e.target;
    const list = [...inputList];
    if (name == "myfile") {
      let fileObj = e.target.files[0];
      list[index]["myfile"] = fileObj;

      this.setState({ inputList: list });
    } else {
      list[index][name] = value;
      this.setState({ inputList: list });
    }
    list[index]["email"] = localStorage.getItem("email");
    list[index]["user_id"] = localStorage.getItem("id");
    list[index]["name"] = localStorage.getItem("name");
    this.setState({ inputList: list });
  };

  // Handle validation form before call submit
  handleValidation = () => {
    var formIsValid = true;
    const { inputList } = this.state;
    const list = [...inputList];
    for (let i = 0; i < inputList.length; i++) {
      for (var key in inputList[i]) {
        if (key === "title") {
          if (list[i]["title"] === "") {
            list[i]["titleErr"] = "Please enter title";
            formIsValid = false;
            this.setState({ inputList: list });
          } else {
            list[i]["titleErr"] = "";
            this.setState({ inputList: list });
          }
        } else if (key === "book") {
          if (list[i]["book"] === "") {
            list[i]["bookErr"] = "Please enter book";
            formIsValid = false;
            this.setState({ inputList: list });
          } else {
            list[i]["bookErr"] = "";
            this.setState({ inputList: list });
          }
        } else if (key === "subject") {
          // console.log("abc");
          if (list[i]["subject"] === "") {
            list[i]["subjectErr"] = "Please enter subject";
            formIsValid = false;
            this.setState({ inputList: list });
          } else {
            list[i]["subjectErr"] = "";
            this.setState({ inputList: list });
          }
        } else if (key === "course") {
          // console.log("abc");
          if (list[i]["course"] === "") {
            list[i]["courseErr"] = "Please enter course";
            formIsValid = false;
            this.setState({ inputList: list });
          } else {
            list[i]["courseErr"] = "";
            this.setState({ inputList: list });
          }
        } else if (key === "myfile") {
          // console.log("abc");
          if (list[i]["myfile"] === "") {
            list[i]["myfileErr"] = "Please select file";
            formIsValid = false;
            this.setState({ inputList: list });
          } else {
            list[i]["myfileErr"] = "";
            this.setState({ inputList: list });
          }
        } else if (key === "price") {
          // console.log("abc");
          if (list[i]["price"] === "") {
            list[i]["priceErr"] = "Please enter price";
            formIsValid = false;
            this.setState({ inputList: list });
          } else {
            list[i]["priceErr"] = "";
            this.setState({ inputList: list });
          }
        } else if (key === "tag") {
          // console.log("abc");
          if (list[i]["tag"] === "") {
            list[i]["tagErr"] = "Please enter price";
            formIsValid = false;
            this.setState({ inputList: list });
          } else {
            list[i]["tagErr"] = "";
            this.setState({ inputList: list });
          }
        } // else {
        //   list[i][" descriptionErr"] = "";
        //   this.setState({ inputList: list });
        // }
        this.setState({ inputList: list });
      }
    }
    return formIsValid;
  };

  render() {
    const { inputList } = this.state;
    const { classes } = this.props;
    return (
      <div class="col-md-9">
        <div class="uploads-right-area">
          <div class="uploads-right-top">
            <div class="sec-head">
              <h2>Add new document</h2>
            </div>
            <div class="upload-dock-top card card-body box-sh">
              Drag & Drop Document here
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
                      <Form
                        onSubmit={(e) => this.handleSubmit(e)}
                        class="uploads-document-form"
                      >
                        {inputList.length > 0 && (
                          <>
                            {inputList.map((field, index) => (
                              <>
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label>Title</label>
                                      {/* <input
                                        type="text"
                                        name="title"
                                        class="form-control"
                                        placeholder="Enter title"
                                        value=""
                                      />
                                      <div style={{ color: "red" }}>
                                        {field.nameErr}
                                      </div> */}
                                      <input
                                        type="text"
                                        class="form-control"
                                        name="title"
                                        placeholder="Enter Name"
                                        value={field.title}
                                        onChange={(event) =>
                                          this.handleInputChange(event, index)
                                        }
                                      />
                                      <div style={{ color: "red" }}>
                                        {field.titleErr}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <div class="form-group">
                                        <label>Book</label>
                                        <select
                                          class="form-control"
                                          name="book"
                                          value={field.book}
                                          onChange={(event) =>
                                            this.handleInputChange(event, index)
                                          }
                                        >
                                          <option selected="">
                                            Select Book
                                          </option>
                                          <option value="Fiction Book">
                                            Fiction Book
                                          </option>
                                          <option value="Non-Fiction Book">
                                            Non-Fiction Book
                                          </option>
                                          <option value="Text Book">
                                            Text Book
                                          </option>
                                        </select>
                                        <div style={{ color: "red" }}>
                                          {field.bookErr}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label>Subject</label>
                                      <select
                                        class="form-control"
                                        name="subject"
                                        value={field.subject}
                                        onChange={(event) =>
                                          this.handleInputChange(event, index)
                                        }
                                      >
                                        <option value="" selected="">
                                          Select Subject
                                        </option>
                                        <option value="English">English</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Physics">Physics</option>
                                      </select>
                                      <div style={{ color: "red" }}>
                                        {field.subjectErr}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label>Course</label>
                                      <select
                                        class="form-control"
                                        name="course"
                                        value={field.course}
                                        onChange={(event) =>
                                          this.handleInputChange(event, index)
                                        }
                                      >
                                        <option value="" selected="">
                                          Select Course
                                        </option>
                                        <option value="English">English</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Physics">Physics</option>
                                      </select>
                                      <div style={{ color: "red" }}>
                                        {field.courseErr}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label>Sample Documents</label>

                                      <label
                                        class="inputfile-label"
                                        for="file-1"
                                      >
                                        <input
                                          type="file"
                                          name="myfile"
                                          defaultValue={field.myfile}
                                          onChange={(event) =>
                                            this.handleInputChange(event, index)
                                          }
                                        />

                                        <span>Sample Documents</span>
                                      </label>
                                      <div style={{ color: "red" }}>
                                        {field.myfileErr}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label>Price</label>
                                      <input
                                        type="number"
                                        name="price"
                                        class="form-control"
                                        placeholder="Price in Rupee"
                                        value={field.price}
                                        onChange={(event) =>
                                          this.handleInputChange(event, index)
                                        }
                                      />
                                      <div style={{ color: "red" }}>
                                        {field.priceErr}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label>Tags</label>

                                      <select
                                        class="form-control"
                                        name="tag"
                                        value={field.tag}
                                        onChange={(event) =>
                                          this.handleInputChange(event, index)
                                        }
                                      >
                                        <option value="" selected="">
                                          Tag
                                        </option>
                                        <option value="English">English</option>
                                        <option value="Maths">Maths</option>
                                        <option value="Physics">Physics</option>
                                      </select>
                                      <div style={{ color: "red" }}>
                                        {field.tagErr}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      {/* <input
                                        type="submit"
                                        class="btn"
                                        value="Upload"
                                      /> */}
                                      {this.state.inputList.length - 1 ===
                                        index && (
                                        <Button
                                          variant="primary"
                                          onClick={this.handleAddClick}
                                          style={{ margin: "5px" }}
                                        >
                                          ADD
                                        </Button>
                                      )}
                                      {this.state.inputList.length !== 1 && (
                                        <Button
                                          variant="warning"
                                          onClick={() =>
                                            this.handleRemoveClick(index)
                                          }
                                          style={{ margin: "5px" }}
                                        >
                                          REMOVE
                                        </Button>
                                      )}
                                      {/* <input
                                        type="submit"
                                        class="btn btn-danger"
                                        value="Delete"
                                      /> */}
                                    </div>
                                    <hr />
                                  </div>
                                </div>
                              </>
                            ))}
                          </>
                        )}
                        <input
                          type="submit"
                          className="btn"
                          value="submit"
                          class="btn btn-danger"
                        />
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TutoraddDocument);
