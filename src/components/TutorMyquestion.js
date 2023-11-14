import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import constant from "../utils/constants";
import axios from "axios";
import TutoraddNewQuestion from "./TutoraddnewQuestion";
import ShowMoreText from "react-show-more-text";
import ReactPaginate from "react-paginate";
import Update from "./TutorUpdatequestion";
import { message, Spin, DatePicker, Space, Popconfirm } from "antd";
var moment = require("moment");
const { RangePicker } = DatePicker;

function TutorMyquestion(props) {
  const [flag, setFlag] = useState(true);
  const [spinflag, setSpinflag] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState();
  const [data1, setData1] = useState([]);
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [selected, setSelected] = useState("");
  const [id, setId] = useState("");
  const [isActive1, setIsActive1] = useState(false);
  const [link, setLink] = useState(
    localStorage.getItem("role") == "tutor" ? "tutor-help" : "student-help"
  );

  //Handle function for adding new questions
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setFlag(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  //Handle function for updating questions
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setShow1(false);
    setFlag(false);
  };
  const handleshow = (id) => {
    console.log(id);
    setId(id);
    setShow1(true);
  };

  const onSignSuccess = async () => {
    console.log("hello");
    setSpinflag(false);
    try {
      const Formdata = new FormData();
      Formdata.append("_id", localStorage.getItem("id"));
      Formdata.append("page", pageNumber);
      Formdata.append("fromdate", startdate);
      Formdata.append("todate", enddate);
      Formdata.append("searching", selected);

      console.log("hittingapi");

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetch_myquestion`,
        Formdata
      );
      console.log(response);
      if (response.data.status == 200) {
        setSpinflag(true);
        setNumberOfPages(response.data.totalPages);
        setData1(response.data.data);
      } else {
        setSpinflag(true);
        message.error(response.data.message);
      }
    } catch (err) {
      setSpinflag(true);
      alert(err);
    }
  };

  useEffect(() => {
    onSignSuccess();
    setFlag(true);
  }, [flag, pageNumber]);

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  };

  const handlePageClick = (event) => {
    console.log("hello handlePageClick");
    console.log("1", event.selected);
    setPageNumber(event.selected);
  };
  const onChangeDate = (value) => {
    console.log("oooooooooooooooooooooooo");
    // console.log(value);
    if (value == null) {
      // console.log("numm");
      setStartdate("");
      setEnddate("");
    } else {
      console.log(value[0]._d);
      console.log(value[1]._d);
      setStartdate(value[0]._d);
      setEnddate(value[1]._d);
    }
  };
  const handleselectChange = (event) => {
    console.log("handleselectChange", event.target.value);

    if (event.target.value == "") {
      // console.log("NULL");
      setSelected("");
    } else {
      setSelected(event.target.value);
    }
  };
  const handlesearchClick = (event) => {
    setFlag(false);
  };
  const handleShow1 = async (value, id) => {
    // setFlag(false);
    console.log("value", value);
    console.log("id", id);
    try {
      var formData = new FormData();
      if (value === 1) {
        formData.append("value", 0);
      } else {
        formData.append("value", 1);
      }
      formData.append("id", id);
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/update_active`,
        formData
      );
      console.log(response.data.status);
      if (response.data.status == 200) {
        message.success("successfully state updated");
        setFlag(false);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };
  const cancel = (e) => {
    // console.log("cancel");
    // console.log(e);
    // message.error("Click on No");
  };
  const confirm = async (e) => {
    console.log("ppppppppppppppp");
    console.log(e);
    try {
      var formData = new FormData();

      formData.append("_id", e);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/delete_tuplemyquestion`,
        formData
      );
      console.log(response.data.status);
      if (response.data.status == 200) {
        message.success("Data deleted successfully");
        setFlag(false);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div class="col-md-9">
        <div class="uploads-right-area">
          <div class="uploads-right-top">
            <div class="row">
              <div class="col-md-8">
                <div class="uploads-top-left">
                  <span class="date-picker">
                    <Space direction="horizontal" size={12}>
                      <RangePicker
                        format="DD-MM-YYYY "
                        onChange={(value, e) => onChangeDate(value, e)}
                      />
                    </Space>
                  </span>
                  <span class="select-picker">
                    <select
                      class="selectpicker"
                      data-live-search="true"
                      onChange={handleselectChange}
                    >
                      <option value="" selected="">
                        Topic / Sub topic
                      </option>
                      <option value="English">English</option>
                      <option value="Maths">Maths</option>
                      <option value="Physics">Physics</option>
                      <option value="Biology">Biology</option>
                      <option value="Business">Business</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Psychology">Psychology</option>
                    </select>
                  </span>
                  <button class="btn" onClick={handlesearchClick}>
                    Search
                  </button>
                </div>
              </div>
              <div class="col-md-4">
                <div class="uploads-top-right">
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="signup-btn btn"
                    data-toggle="modal"
                    data-target="#myModal"
                    style={{ backgroundColor: "#2c2f8c" }}
                  >
                    <i class="fas fa-plus-circle"></i> Post new Question
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div class="uploads-right-main">
            <div class="uploads-right-main-top">
              <div class="row">
                <div class="col-md-5">
                  <div class="up-ct">Questions : 1-3 of 15</div>
                </div>
                <div class="col-md-7">
                  <div class="earnings-right">
                    <div class="earnings">
                      Total Spent : <span>$210.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {spinflag ? (
              ""
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "100px",
                }}
              >
                <Spin />{" "}
              </div>
            )}

            {data1.length > 0 && spinflag && (
              <ul>
                {data1.map((user) => (
                  <div class="uploads-right-main-items">
                    <div class="uploads-tabs">
                      <div>
                        <div
                          style={{
                            backgroundColor: user.isquestion_active
                              ? ""
                              : "#D3D3D3",
                          }}
                        >
                          <ul class="nav nav-tabs">
                            <li class="nav-item">
                              {user.isquestion_active ? (
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    handleShow1(
                                      user.isquestion_active,
                                      user._id
                                    )
                                  }
                                  className="signup-btn btn"
                                  data-toggle="modal"
                                  data-target="#myModal"
                                  style={{ backgroundColor: "#2c2f8c" }}
                                >
                                  Deactive
                                </Button>
                              ) : (
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    handleShow1(
                                      user.isquestion_active,
                                      user._id
                                    )
                                  }
                                  className="signup-btn btn"
                                  data-toggle="modal"
                                  data-target="#myModal"
                                  style={{ backgroundColor: "#545454" }}
                                >
                                  Active
                                </Button>
                              )}
                            </li>
                            <>&nbsp;</>

                            <>&nbsp;</>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#completed"
                              >
                                Completed
                              </a>
                            </li>
                            <>&nbsp;</>
                            <li class="nav-item">
                              <Popconfirm
                                title="Are you sure to delete this Question?"
                                onConfirm={() => confirm(user._id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Button
                                  variant="primary"
                                  className="signup-btn btn"
                                  data-toggle="modal"
                                  data-target="#myModal"
                                  style={{ backgroundColor: "#2c2f8c" }}
                                >
                                  DELETE
                                </Button>
                              </Popconfirm>
                            </li>
                            <>&nbsp;</>
                            <li>
                              <Button
                                variant="primary"
                                onClick={() => handleshow(user._id)}
                                className="signup-btn btn"
                                data-toggle="modal"
                                data-target="#myModal"
                                style={{ backgroundColor: "#2c2f8c" }}
                              >
                                UPDATE
                              </Button>
                            </li>
                            <>&nbsp;</>
                          </ul>

                          <div class="tab-content">
                            <div id="active" class="tab-pane active">
                              <div class="question-active-area">
                                <div class="questions-items">
                                  <div class="question-item">
                                    <div class="question-top">
                                      <h2>
                                        Question related to --{user.title}--
                                        subject
                                      </h2>
                                      <div class="ttl-bid">
                                        <Link
                                          to={`/${link}/Bidquestiondetails?id=${user._id}`}
                                        >
                                          Total Bid :{" "}
                                        </Link>
                                        <span>{user.data.length}</span>
                                      </div>
                                    </div>

                                    <h3>Description</h3>
                                    <ShowMoreText
                                      lines={3}
                                      more="Show more"
                                      less="Show less"
                                      className="content-css"
                                      anchorClass="my-anchor-css-class"
                                      onClick={executeOnClick}
                                      expanded={false}
                                      width={300}
                                      truncatedEndingComponent={"... "}
                                    >
                                      {" "}
                                      <p>{user.Question}</p>
                                    </ShowMoreText>

                                    <div class="question-dates">
                                      <ul>
                                        <li>
                                          <b>Start Date</b>:{" "}
                                          {moment(user.createdAt).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </li>
                                        <li>
                                          <b>End Date</b>:{" "}
                                          {moment(user.deadline_date).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </li>
                                        <li>
                                          <b>Budget</b>:{" "}
                                          <i class="fas fa-rupee-sign"></i>
                                          {user.price}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/*popup for add new question */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton> </Modal.Header>
          <Modal.Body>
            {<TutoraddNewQuestion handleClose={handleClose} />}
          </Modal.Body>

          {/*popup for update question */}
        </Modal>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton> </Modal.Header>
          <Modal.Body>
            {<Update id={id} handleClose1={handleClose1} />}
            {/* {<AddNewbook handleClose={handleClose} flag={flag} />} */}
          </Modal.Body>
        </Modal>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={numberOfPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}

export default TutorMyquestion;
