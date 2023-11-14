import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Button } from "react-bootstrap";
import constant, { BASE_URL } from "../utils/constants";
import { Modal } from "react-bootstrap";
import UploadpageEdit from "./UploadpageEdit";
import { useNavigate } from "react-router-dom";
//import Pagination from "@mui/material/Pagination";
import ReactPaginate from "react-paginate";
import "antd/dist/antd.css";
import { DatePicker, Space, Popconfirm, message, Spin } from "antd";
const { RangePicker } = DatePicker;

function TutorMyUpload(props) {
  const [data1, setData1] = useState([]);
  const [id, setId] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState();
  const [flag, setFlag] = useState(true);
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [selected, setSelected] = useState("");
  const [spinflag, setSpinflag] = useState(true);
  const [text, setText] = useState("");
  const [link, setLink] = useState(
    localStorage.getItem("role") == "tutor" ? "tutor-help" : "student-help"
  );

  const onSignSuccess = async () => {
    try {
      // console.log("pagenumber", pageNumber);
      // console.log("fromdate", fromdate);
      // console.log("todate", todate);
      // console.log("searching", selected);

      var formData = new FormData();
      formData.append("fromdate", fromdate);
      formData.append("todate", todate);
      formData.append("searching", selected);
      formData.append("_id", localStorage.getItem("id"));
      formData.append("page", pageNumber);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetch_document`,
        formData
      );
      // console.log(response);
      // console.log(response.data.status);
      // console.log(response.data.totalPages);

      if (response.data.status == 200) {
        setSpinflag(true);
        setNumberOfPages(response.data.totalPages);
        setData1(response.data.data);
      } else {
        alert(response.data.message);
      }
      // console.log(data1.length > 0 ? data1 : null);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    onSignSuccess();
    setSpinflag(false);
    setFlag(true);
  }, [pageNumber, flag]);

  {
    /*handle close function for update popup*/
  }
  // const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    // navigate(0);
    setFlag(false);
    setShow(false);
  };
  const handleClick = (values) => {
    //console.log(values);
    setShow(true);
    setId(values);
  };
  const handlePageClick = (event) => {
    // console.log("1", event.selected);
    setPageNumber(event.selected);
  };
  // const handleChange = (event, value) => {
  //   console.log("handle", value);
  //   setFromdate(value[0]);
  //   setTodate(value[1]);
  // };
  const onChangeDate = (value) => {
    console.log("oooooooooooooooooooooooo");
    console.log(value);
    if (value == null) {
      console.log("numm");
      setFromdate("");
      setTodate("");
    } else {
      console.log(value[0]._d);
      console.log(value[1]._d);
      setFromdate(value[0]._d);
      setTodate(value[1]._d);
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

  const onDate = () => {
    console.log("1111111111111111111111");
    // setFlag(false);
  };

  const confirm = async (e) => {
    console.log(e);

    try {
      var formData = new FormData();

      formData.append("_id", e);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/delete_tupleData`,
        formData
      );
      console.log(response.data.status);
      if (response.data.status == 200) {
        message.success("Data deleted successfully");
        setFlag(false);
      } else {
        message.success(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleChangeChk = async (value, id) => {
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
        `${constant.BASE_IP}/webapi/update_stockdocument`,
        formData
      );
      console.log(response.data.status);
      if (response.data.status == 200) {
        message.success("stock updated successfully");
        setFlag(false);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };
  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
  };

  return (
    <>
      <div class="col-md-9">
        <div class="uploads-right-area">
          <div class="uploads-right-top">
            <div class="loader"></div>

            <div class="row">
              <div class="col-md-8">
                <div class="uploads-top-left">
                  <Space direction="horizontal" size={12}>
                    <RangePicker
                      format="DD-MM-YYYY "
                      // onCalendarChange={() => onDate()}
                      onChange={(value, e) => onChangeDate(value, e)}
                      // onOpenChange={() => onDate()}
                    />
                  </Space>
                  <div>&nbsp;&nbsp;</div>
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
                    </select>
                  </span>
                  <br />
                  <br />
                  <div class="date-select-btn">
                    <button class="btn" onClick={handlesearchClick}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="uploads-top-right">
                  <Link to={`/${link}/add-document`} class="btn">
                    <i class="fas fa-plus-circle"></i> Add new document
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="uploads-right-main">
            <div class="uploads-right-main-top">
              <div class="row">
                <div class="col-md-5">
                  <div class="up-ct">Uploads : 1-3 of 15</div>
                </div>
                <div class="col-md-7">
                  <div class="earnings-right">
                    <div class="earnings">
                      Toral Earnings : <span>$240.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
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
                      <div class="uploads-right-main-item box-sh card card-body">
                        <div class="row">
                          <div class="col-md-2">
                            <div class="uploads-item-img">
                              {/* <img
                                src={require(`file:///home/asus/Desktop/abc/api_async+awit27-6-22/uploads/TutorAddDocumentImage/${user.image_name}`)}
                                alt=""
                              /> */}
                              <img
                                src={`${constant.BASE_URL}/uploads/TutorAddDocumentImage/${user.image_name}`}
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="col-md-8">
                            <div class="uploads-item-cont">
                              <div class="uploads-item-title">{user.title}</div>
                              <div class="uploads-item-dtls">
                                <div class="uploads-item-dtls-left">
                                  <div class="uploads-item-price">
                                    <i class="fas fa-rupee-sign"></i>
                                    <span>{user.price}</span>
                                  </div>
                                  <div class="reviews-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                  </div>
                                </div>
                                <div class="uploads-item-dtls-right">
                                  <p>
                                    10 Sales
                                    <br />
                                    Date uploaded :{" "}
                                    {moment(user.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div class="uploads-item-tags">
                                <label>Tags -</label>
                                <p>
                                  <span>{user.tag}</span>
                                </p>
                              </div>
                              <div class="uploads-item-tags">
                                <label>Subject -</label>
                                <p>
                                  <span>{user.subject}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-2">
                            <div class="uploads-item-right">
                              <div class="uploads-item-edit">
                                {/* <a href="#" data-toggle="tooltip" title="Edit"> */}
                                {/* <Link to={`/users/${user._id}`}>
                                  {" "}
                                  <i class="far fa-edit"></i>
                                </Link> */}

                                <Button
                                  onClick={() => handleClick(user._id)}
                                  style={{ backgroundColor: "#2c2f8c" }}
                                >
                                  <i class="far fa-edit"></i>
                                </Button>

                                {/* </a> */}
                              </div>
                              <div class="uploads-item-active-inactive">
                                <label>
                                  <input
                                    type="checkbox"
                                    defaultChecked={user.isstock_active}
                                    onClick={() =>
                                      handleChangeChk(
                                        user.isstock_active,
                                        user._id
                                      )
                                    }
                                  />
                                  <span>
                                    <small></small>
                                  </span>
                                </label>
                              </div>
                              <div class="uploads-item-btn">
                                <Link
                                  to={`/tutor-help/TutorProduct?id=${user._id}`}
                                  class="btn"
                                >
                                  {" "}
                                  More...
                                </Link>{" "}
                              </div>
                              <br />
                              <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => confirm(user._id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Button variant="outline-danger">DELETE</Button>
                              </Popconfirm>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
            </div>
            {/* 
            <Pagination
              count={numberOfPages - 1}
              variant="outlined"
              shape="rounded"
              color="secondary"
              onChange={handleChange}
            /> */}
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

      {/*popup model for update data*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <UploadpageEdit id={id} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TutorMyUpload;
