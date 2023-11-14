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

import { Collapse } from "antd";
import Update from "./TutorUpdatequestion";
import { message, Spin, DatePicker, Space, Popconfirm } from "antd";
var moment = require("moment");

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

function HelloSolution(props) {
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

  const [fieldValue, setFieldValue] = useState(false);

  const onSignSuccess = async () => {
    console.log("hello");
    setSpinflag(false);
    try {
      const Formdata = new FormData();
      Formdata.append("_id", localStorage.getItem("id"));
      Formdata.append("page", pageNumber);
      Formdata.append("fromdate", startdate);
      Formdata.append("todate", enddate);

      console.log("hittingapi");

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetch_my_bid`,
        Formdata
      );
      console.log(response);

      if (response.data.status == 200) {
        setSpinflag(true);
        setNumberOfPages(response.data.totalPages);
        console.log("ooooppppuuuuu", response.data.data);
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

  const onAcceptedBid = async () => {
    console.log("hello");
    setSpinflag(false);
    try {
      const Formdata = new FormData();
      Formdata.append("_id", localStorage.getItem("id"));
      Formdata.append("page", pageNumber);
      Formdata.append("fromdate", startdate);
      Formdata.append("todate", enddate);
      Formdata.append("flagforacceptedbid", 1);

      console.log("hittingapi");

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetch_my_bid`,
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

  const handlesearchClick = (event) => {
    setFlag(false);
  };

  const UploadSolution = async (id) => {
    console.log("upload solution");
    console.log("upload file", fieldValue);
    console.log("id", id);
    if (fieldValue) {
      console.log("true");
      const Formdata = new FormData();
      Formdata.append("file", fieldValue);
      Formdata.append("_id", id);
      Formdata.append("solverId", localStorage.getItem("id"));
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/upload_solutiion`,
        Formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("ooooooooooooooooooooooooo", response);
      if (response.data.status == 200) {
        setFieldValue(null);
        setFlag(false);
      } else {
        setFieldValue(null);
        setSpinflag(true);
        message.error(response.data.message);
      }
    } else {
      console.log("false");
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

                  <button class="btn" onClick={handlesearchClick}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="uploads-right-main">
            <div class="uploads-right-main-top"></div>

            <ul class="nav nav-tabs">
              <li>
                <Button
                  variant="primary"
                  //   onClick={() => handleshow(user._id)}
                  className="signup-btn btn"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={onSignSuccess}
                  style={{ backgroundColor: "#2c2f8c" }}
                >
                  Active
                </Button>
              </li>

              <>&nbsp;</>
              <li>
                <Button
                  variant="primary"
                  //   onClick={() => handleshow(user._id)}
                  className="signup-btn btn"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={onAcceptedBid}
                  style={{ backgroundColor: "#2c2f8c" }}
                >
                  Accepted Bid
                </Button>
              </li>
              <>&nbsp;</>
              <>&nbsp;</>
              <li>
                <Button
                  variant="primary"
                  //   onClick={() => handleshow(user._id)}
                  className="signup-btn btn"
                  data-toggle="modal"
                  data-target="#myModal"
                  style={{ backgroundColor: "#2c2f8c" }}
                >
                  Completed
                </Button>
              </li>
              <>&nbsp;</>
            </ul>
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
                        <div class="tab-content">
                          <div id="active" class="tab-pane active">
                            <div class="question-active-area">
                              <div class="questions-items">
                                <div class="question-item">
                                  <div class="question-top">
                                    <h2>
                                      Question related to --
                                      {user.QuestionData[0].title}-- subject
                                    </h2>
                                  </div>

                                  <h3>QUESTION</h3>
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
                                    <p>{user.QuestionData[0].Question}</p>
                                  </ShowMoreText>

                                  <div class="question-dates">
                                    <ul>
                                      <li>
                                        <b>Start Date</b>:{" "}
                                        {moment(user.bidDateAt).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </li>
                                      <li>
                                        <b>End Date</b>:{" "}
                                        {moment
                                          .utc(user.deliverydate)
                                          .format("DD/MM/YYYY")}
                                        {/* {moment(user.deliverydate).format(
                                          "DD/MM/YYYY"
                                        )} */}
                                      </li>
                                      <li>
                                        <b>Budget</b>:{" "}
                                        <i class="fas fa-rupee-sign"></i>
                                        {user.budget}
                                      </li>
                                    </ul>
                                  </div>
                                  {user.WhoseBidAccepted ? (
                                    user.SloutionDeployed ? (
                                      <Button variant="success">
                                        {" "}
                                        Solution Uploaded
                                      </Button>
                                    ) : (
                                      <>
                                        <div style={{ background: "orange" }}>
                                          <h6 style={{ marginLeft: 350 }}>
                                            This bid Accepted
                                          </h6>
                                        </div>
                                        <Collapse>
                                          <Panel
                                            header="UPLOAD SOLUTIONS"
                                            key="1"
                                          >
                                            <input
                                              type="file"
                                              className="form-control"
                                              accept="application/pdf"
                                              onChange={(e) =>
                                                setFieldValue(e.target.files[0])
                                              }
                                            />
                                            {"Only Pdf Allowed"}
                                            <br />
                                            <Button
                                              variant="success"
                                              onClick={() =>
                                                UploadSolution(user.Question_id)
                                              }
                                            >
                                              Upload
                                            </Button>
                                          </Panel>
                                        </Collapse>
                                      </>
                                    )
                                  ) : user.QuestionData[0].bidAccepted ? (
                                    <div style={{ background: "red" }}>
                                      <h6 style={{ marginLeft: 350 }}>
                                        CLOSED
                                      </h6>
                                    </div>
                                  ) : (
                                    <div style={{ background: "green" }}>
                                      <h6 style={{ marginLeft: 350 }}>OPEN</h6>
                                    </div>
                                  )}
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

export default HelloSolution;
