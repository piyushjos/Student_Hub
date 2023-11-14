import React from "react";

import { useState, useEffect } from "react";

import axios from "axios";
import constant from "../utils/constants";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { Link } from "react-router-dom";
import { DatePicker, Space } from "antd";

import ShowMoreText from "react-show-more-text";

const { RangePicker } = DatePicker;

const BidSection = () => {
  const [data, showdata] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [page, settotalPage] = useState(0);
  const [flag, setflag] = useState(true);
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  //const[showmore, setshowmore] = useState(false);
  const [search, setsearch] = useState("");
  const [editdata1, seteditData] = useState("");

  const fetchingdata = async () => {
    const Formdata = new FormData();
    Formdata.append("_id", localStorage.getItem("id"));
    Formdata.append("page", pageNumber);
    Formdata.append("fromdate", startdate);
    Formdata.append("todate", enddate);

    Formdata.append("searching", search);

    console.log("hittingapi  of my question page");
    await axios
      .post(`${constant.BASE_IP}/webapi/getall_question`, Formdata)
      .then((response) => {
        if (response.data.status === 200) {
          console.log("response", response);
          showdata(response.data.data);
          settotalPage(response.data.totalPages);
          console.log(" my string", data[0].Question);
          console.log("settingingdata", data);
        } else if (response.data.status === 400) {
          alert("oops");
        } else {
          console.log("nothing");
        }
      })
      .catch((error) => console.log(error));
  };
  const handlePageClick = (e) => {
    console.log("e", e);
    console.log("i am runnung");
    const selectedPage = e.selected;
    //console.log(selectedPage)
    setPageNumber(selectedPage);
    console.log(page);
    fetchingdata();
  };
  useEffect(() => {
    fetchingdata();
    setflag(true);
  }, [flag, pageNumber]);

  const handlesearch = async () => {
    fetchingdata();
  };
  // const onChangeDate = (value) => {
  //   console.log("mydate", value[0]._d);
  //   console.log(value[1]._d);
  //   if (value == "") {
  //     setstartdate("");
  //     setenddate("");
  //   } else {
  //     setstartdate(value[0]._d);
  //     setenddate(value[1]._d);
  //   }
  // };
  const handleselectChange = (event) => {
    console.log("handleselectChange", event.target.value);
    if (event.target.value == "") {
      // console.log("NULL");
      setsearch("");
    } else {
      setsearch(event.target.value);
    }
  };
  const onChangeDate = (value) => {
    console.log("oooooooooooooooooooooooo");
    // console.log(value);
    if (value == null) {
      // console.log("numm");
      setstartdate("");
      setenddate("");
    } else {
      console.log(value[0]._d);
      console.log(value[1]._d);
      setstartdate(value[0]._d);
      setenddate(value[1]._d);
    }
  };

  return (
    <div class="col-md-9">
      <div class="uploads-right-area">
        <div class="uploads-right-top">
          <div class="row">
            <div class="col-md-8">
              <div class="uploads-top-left">
                <span>
                  <Space direction="vertical" size={12}>
                    <RangePicker
                      onChange={(value, e) => onChangeDate(value, e)}
                    />
                  </Space>
                </span>
                <span class="select-picker">
                  <select
                    data-live-search="true"
                    class="selectpicker"
                    onChange={handleselectChange}
                    // onChange={(e) => setsearch(e.target.value)}
                  >
                    <option value="" selected="">
                      Topic / Sub topic
                    </option>
                    <option value="Biology">Biology</option>
                    <option value="Business">Business</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Biology">Biology</option>
                    <option value="Business">Business</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Psychology">Psychology</option>
                  </select>
                </span>
                <span class="date-select-btn">
                  <button
                    class="btn"
                    onClick={() => {
                      handlesearch();
                    }}
                  >
                    Search
                  </button>
                </span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="uploads-top-right"></div>
            </div>
          </div>
        </div>
        <div class="uploads-right-main">
          <div class="uploads-right-main-top">
            <div class="row">
              <div class="col-md-5">
                <div class="up-ct">Questions : 1-3 of 15</div>
              </div>
            </div>
          </div>
          <div class="uploads-right-main-items">
            <div class="uploads-tabs">
              {data.length > 0 && (
                <ul>
                  {data.map((user, index) => (
                    <div class="tab-content">
                      <div id="active" class="tab-pane active">
                        <div class="question-active-area">
                          <div class="questions-items">
                            <div class="question-item">
                              <div class="question-top">
                                <div className="d-flex justify-content-between mb-2">
                                  <h2>Question - 1 {user.title}</h2>
                                  <div class="ttl-bid">
                                    Total Bid : <span>15</span>
                                  </div>
                                </div>
                                <div class="uploads-item-right d-flex justify-content-between">
                                  <h3>Description</h3>
                                </div>
                              </div>

                              <p>
                                <div class="see-more-btn">
                                  <ShowMoreText
                                    lines={3}
                                    more="Show more"
                                    less="Show less"
                                    className="content-css"
                                    anchorClass="my-anchor-css-class"
                                    expanded={false}
                                    width={300}
                                    truncatedEndingComponent={"... "}
                                  >
                                    {" "}
                                    <p>{user.Question}</p>
                                  </ShowMoreText>
                                  {/* <Button Style={{color:"#2c2f8c"}}>
                                        <Link to ={`/BiddingList?id=${user._id}`}>Add Your Bid</Link></Button>{' '}
                                        <Link
                                to={`/bookProductdetails?id=${user._id}`}
                                class="btn"
                              > */}
                                  <div class="uploads-item-btn">
                                    <Link
                                      to={`/tutor-help/BiddingList?id=${user._id}`}
                                      class="btn"
                                    >
                                      {" "}
                                      Add Bid
                                    </Link>
                                  </div>
                                </div>

                                {user.bidAccepted ? (
                                  <div style={{ background: "red" }}>
                                    <h6 style={{ marginLeft: 350 }}>CLOSED</h6>
                                  </div>
                                ) : (
                                  <div style={{ background: "green" }}>
                                    <h6 style={{ marginLeft: 350 }}>OPEN</h6>
                                  </div>
                                )}
                              </p>

                              <div class="question-dates">
                                <ul>
                                  <li>
                                    <b>Expected Date</b>:
                                    {moment(user.deadline_date).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </li>
                                  <li>
                                    <b>Expected Budget :&#8377;</b>:{" "}
                                    {user.price}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          {/*
                           */}
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={page}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidSection;
