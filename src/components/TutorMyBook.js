import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import AddNewbook from "./TutoraddNewbook";
import Tupdate from "./Tutorupdatebook";
import axios from "axios";
import constant from "../utils/constants";
import { message, Spin, DatePicker, Space, Popconfirm } from "antd";
import moment from "moment";
import ReactPaginate from "react-paginate";
const { RangePicker } = DatePicker;

function TutorMyBook(props) {
  const [flag, setFlag] = useState(true);
  const [spinflag, setSpinflag] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState();
  const [data1, setData1] = useState([]);
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();
  const [selected, setSelected] = useState("");
  const [id, setId] = useState("");

  // handle function for add new book
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setFlag(false);
  };
  const handleShow = () => setShow(true);

  // handle function for edit/update new book
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setShow1(false);
    setFlag(false);
  };
  const handleShow1 = () => setShow1(true);

  const onSignSuccess = async () => {
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
        `${constant.BASE_IP}/webapi/fetch_book`,
        Formdata
      );
      console.log(response);
      if (response.data.status == 200) {
        setSpinflag(true);
        setNumberOfPages(response.data.totalPages);
        setData1(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };
  const handlePageClick = (event) => {
    // console.log("1", event.selected);
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
        `${constant.BASE_IP}/webapi/update_stockbook`,
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
  const handleClick = (values) => {
    console.log(values);
    handleShow1();
    setId(values);
  };

  useEffect(() => {
    onSignSuccess();
    setFlag(true);
  }, [pageNumber, flag]);

  const confirm = async (e) => {
    console.log("confirm");
    console.log(e);
    // message.success("Click on yse");
    // console.log(e);

    try {
      var formData = new FormData();

      formData.append("_id", e);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/delete_booktupleData`,
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

  const cancel = (e) => {
    // console.log("cancel");
    // console.log(e);
    // message.error("Click on No");
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
                        // onCalendarChange={() => onDate()}
                        onChange={(value, e) => onChangeDate(value, e)}
                        // onOpenChange={() => onDate()}
                      />
                    </Space>
                    <div>&nbsp;&nbsp;</div>
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
                    </select>
                  </span>
                  <span class="date-select-btn">
                    <button class="btn" onClick={handlesearchClick}>
                      Search
                    </button>
                  </span>
                </div>
              </div>
              <div class="col-md-4">
                <div class="uploads-top-right">
                  {/* <button class="btn" data-toggle="modal" data-target="#myModal3"> */}

                  {/* </button> */}
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="signup-btn btn"
                    data-toggle="modal"
                    data-target="#myModal"
                    style={{ backgroundColor: "#2c2f8c" }}
                  >
                    <i class="fas fa-plus-circle"></i> Add new book
                  </Button>
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
                            <img
                              src={`${constant.BASE_URL}/uploads/TutorbookImages/${user.samplefile_image}`}
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
                                  {moment(user.createdAt).format("DD/MM/YYYY")}
                                </p>
                              </div>
                            </div>
                            <div class="uploads-item-tags">
                              <label>Tag -</label>
                              {user.tag}
                            </div>
                            <div class="uploads-item-tags">
                              <label>Subject -</label>
                              {user.subject}
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="uploads-item-right">
                            <div class="uploads-item-edit">
                              <Button
                                onClick={() => handleClick(user._id)}
                                style={{ backgroundColor: "#2c2f8c" }}
                              >
                                <i class="far fa-edit"></i>
                              </Button>
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
                                to={`/tutor-help/tutorbook?id=${user._id}`}
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
            <div></div>
          </div>
        </div>
        {/* popup model for add new book*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton> </Modal.Header>
          <Modal.Body>
            {<AddNewbook handleClose={handleClose} flag={flag} />}
          </Modal.Body>
        </Modal>
        {/* popup model for edit/update new book*/}

        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton> </Modal.Header>
          <Modal.Body>
            {<Tupdate IdforEdit={id} handleClose1={handleClose1} />}{" "}
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

export default TutorMyBook;
