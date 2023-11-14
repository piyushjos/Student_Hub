import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import { Formik, Form, Field, Dropdown } from "formik";
import * as Yup from "yup";
import axios from "axios";
import constant from "../utils/constants";
import { message, Popconfirm } from "antd";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_IP } from "../utils/constants";
import { socket } from "../App";
import { useSelector, useDispatch } from "react-redux";

const validatio12 = Yup.object().shape({
  bidDate: Yup.string().required("Required"),

  bidAmount: Yup.number().required("Price is Required"),
});

const BiddingListview = () => {
  const [data, setMessageReceived] = useState([]);
  const [flag, setFlag] = useState(0);
  const [flag1, setFlag1] = useState(0);
  const [searchParams] = useSearchParams(); // use for getting Tuple Id
  let room = searchParams.get("id");
  let bidder_id = localStorage.getItem("id");
  let bidder_name = localStorage.getItem("name");

  const joinRoom = () => {
    console.log("room");
    socket.emit("join_room", room);
  };
  const sendMessage = (values) => {
    socket.emit("send_message", { values, room, bidder_id, bidder_name });
  };
  useEffect(() => {
    if (flag == 0) {
      joinRoom();
      setFlag(1);
    }
    socket.on("receive_message", (result) => {
      console.log("result", result);
      setMessageReceived(result);
      console.log("ooo", result[0].QuestionData[0].bidAccepted);
      setFlag1(result[0].QuestionData[0].bidAccepted);
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.on("receive_message", (result) => {
  //     console.log(result);
  //     // setMessageReceived(data);
  //   });
  // }, [socket]);
  //   const [data, showdata] = useState("");
  //   const [flag, showflag] = useState(false);
  //   const [searchParams] = useSearchParams(); // use for getting Tuple Id
  //   let myid = searchParams.get("id");

  //   //Function for fetching data and Listing of bidders on user Interface

  //   const fetchingAllBid = async () => {
  //     const Formdata = new FormData();
  //     Formdata.append("_id", myid);

  //     console.log("hittingapi  of my question page");
  //     await axios
  //       .post(`${constant.BASE_IP}/webapi/fetchbid_byquestionid`, Formdata)
  //       .then((response) => {
  //         if (response.data.status === 200) {
  //           console.log("response", response);
  //           showdata(response.data.data);

  //           console.log("settingingdata", data);
  //         } else if (response.data.status === 400) {
  //           alert("oops");
  //         } else {
  //           console.log("nothing");
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   };
  //   useEffect(() => {
  //     fetchingAllBid();
  //     showflag(false);
  //   }, [flag]);

  //   //Function for sending  Formdata to backend
  //   const submitForm = async (values) => {
  //     console.log(values);

  //     var formData = new FormData();
  //     formData.append("values", JSON.stringify(values));

  //     formData.append("_id", localStorage.getItem("id"));

  //     formData.append("name", localStorage.getItem("name"));
  //     formData.append("Que_id", myid);

  //     await axios
  //       .post(`${constant.BASE_IP}/webapi/add_bid`, formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       })
  //       .then((res) => {
  //         console.log("checkresponse", res);
  //         if (res.status === 200) {
  //           message.success("Bid uploaded Succesfully");
  //           showflag(true);
  //         }
  //         if (res.data.status === 400) {
  //           console.log("res");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  return (
    <Formik
      initialValues={{
        bidAmount: "",
        bidDate: "",
      }}
      validationSchema={validatio12}
      onSubmit={(values) => {
        console.log(values);
        sendMessage(values);
      }}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <div class="col-md-9">
          <div class="uploads-right-area">
            <div class="uploads-right-top">
              <Form>
                <div class="uploads-top-left">
                  <Field
                    type="number"
                    name="bidAmount"
                    placeholder="Bid Amount"
                    class="form-control"
                  />
                  {errors.bidAmount && touched.bidAmount ? (
                    <div style={{ color: "red" }}>{errors.bidAmount}</div>
                  ) : null}

                  <span class="select-picker">
                    <DatePicker
                      selected={values.bidDate}
                      placeholderText="Please select a date"
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      name="bidDate"
                      onChange={(date) => setFieldValue("bidDate", date)}
                      autoComplete="off"
                      minDate={moment().toDate()}
                    />
                  </span>
                  {errors.bidDate && touched.bidDate ? (
                    <div style={{ color: "red" }}>{errors.bidDate}</div>
                  ) : null}
                  <span class="date-select-btn">
                    <button class="btn" type="submit" disabled={flag1}>
                      Add / Update
                    </button>
                  </span>
                </div>
              </Form>
            </div>
          </div>

          {flag1 ? (
            <div
              className="d-flex align-items-center justify-content-center text-center not-found-container"
              style={{
                backgroundColor: "red",
              }}
            >
              <h1>Bid Closed </h1>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center text-center not-found-container"
              style={{
                backgroundColor: "pink",
              }}
            >
              <h1>Bidder List</h1>
            </div>
          )}
          {flag1 ? (
            ""
          ) : (
            <div class="row ">
              <div class="col-md-12">
                <table
                  class="table table-striped"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Bidder Name</th>
                      <th scope="col">Bid Amount</th>
                      <th scope="col">Deadline Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 && (
                      <>
                        {data.map((user, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{user.solvername}</td>
                            <td>
                              {" "}
                              <del>₹</del> {user.budget}
                            </td>
                            <td>
                              {moment(user.deliverydate).format("DD/MM/YYYY")}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default BiddingListview;
