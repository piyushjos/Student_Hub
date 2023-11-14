import axios from "axios";
import { useSearchParams } from "react-router-dom";
import constant from "../utils/constants";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import { message, Popconfirm } from "antd";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { Collapse } from "antd";
import fileDownload from "js-file-download";
import { socket } from "../App";

// const socket = io.connect(`${constant.BASE_IP}`);
const { Panel } = Collapse;

const MyBidQuestionDetails = () => {
  const [normaldata, setNormalData] = useState({});
  const [disable, setDisable] = useState(false);
  const [flag, setFlag] = useState(0);
  const [solutionUpload, setSolutionUpload] = useState();
  const [Bidderdata, setBidderData] = useState([]);
  const [isSolutionAvailable, setIsSolutionAvailable] = useState(false);
  const [solution, setSolution] = useState("");

  const [searchParams] = useSearchParams();
  let myid = searchParams.get("id");
  console.log("bidding question Id", myid);

  const joinRoom = () => {
    console.log("room");
    socket.emit("join_room", myid);
  };

  useEffect(() => {
    if (flag == 0) {
      joinRoom();
      setFlag(1);
    }
    socket.on("receive_message", (result) => {
      console.log("resultsdsasdsad", result);
      productdetails();
    });
    productdetails();
  }, [socket]);

  const productdetails = async () => {
    const Formdata = new FormData();
    Formdata.append("_id", myid);

    console.log(Formdata);
    await axios
      .post(
        `${constant.BASE_IP}/webapi/fetchBid_ByQuestionIdWithTutorDetails`,
        Formdata,
        {}
      )
      .then((response) => {
        console.log("pppppppp", response.data.result);
        if (response.data.status === 200) {
          console.log("rsponse productdetails", response);
          setNormalData(response.data.Questionsdata[0]);
          setSolutionUpload(response.data.Questionsdata[0].SloutionDeployed);
          setBidderData(response.data.result);
        } else if (response.data.status === 400) {
          alert("oops");
        } else {
          console.log("nothing");
        }
      })
      .catch((error) => console.log(error));
  };

  const AcceptBidToggler = async (solverid) => {
    console.log("hey you called me solver id", solverid);
    const Formdata = new FormData();
    Formdata.append("_id", myid);
    Formdata.append("solver_id", solverid);

    await axios
      .post(`${constant.BASE_IP}/webapi/bid_accepted`, Formdata, {})
      .then((response) => {
        if (response.data.status === 200) {
          console.log("Bid Accepted response", response);
          setDisable(true);
        } else if (response.data.status === 400) {
          alert("oops");
        } else {
          console.log("nothing");
        }
      })
      .catch((error) => console.log(error));
  };
  const onUploadSuccess = async () => {
    console.log("hello");

    try {
      const Formdata = new FormData();
      Formdata.append("_id", myid);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/download_solution`,
        Formdata
      );
      console.log(response);
      if (response.data.status == 200) {
        if (response.data.data.length !== 0) {
          setIsSolutionAvailable(true);
          setSolution(response.data.data[0].solution_documentName);
        }
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  const onChange = () => {
    onUploadSuccess();
  };

  return (
    <div className="col-md-9">
      <div className="uploads-right-main-items">
        <div className="uploads-tabs">
          <div className="tab-content">
            <div id="active" className="tab-pane active">
              <div className="question-active-area">
                <div className="questions-items">
                  <div className="question-item">
                    <div className="question-top">
                      <h2>Question</h2>
                    </div>
                    <p className="more">
                      <span className="Queation-number"></span>
                      {normaldata.Question}
                    </p>
                    <div className="question-dates-card">
                      <div className="">
                        <div className="">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="question-card-dtl">
                                {/* <span className="fc">closed</span> */}

                                <p>
                                  <label>
                                    Budget :{normaldata.price}&#8377;
                                  </label>
                                </p>
                                <p>
                                  <b>Max Completion Date</b>:
                                  <span className="">
                                    {" "}
                                    {moment(normaldata.deadline_date).format(
                                      "DD/MM/YYYY"
                                    )}{" "}
                                  </span>
                                </p>
                                <p></p>
                                {normaldata.bidAccepted ? (
                                  <Collapse onChange={onChange}>
                                    <Panel header="DOWNLOAD SOLUTIONS" key="1">
                                      <br />
                                      {isSolutionAvailable ? (
                                        <>
                                          <Button
                                            class="btn btn-warning"
                                            onClick={() => {
                                              handleDownload(
                                                `${constant.BASE_IP}/uploads/Solutiondata/${solution}`,
                                                "Solution-download.pdf"
                                              );
                                            }}
                                          >
                                            Download Solution
                                          </Button>
                                          <>&nbsp;&nbsp;</>
                                          <Button class="btn btn-success">
                                            Solution Accept
                                          </Button>
                                        </>
                                      ) : (
                                        "Solution not uploaded yet"
                                      )}
                                    </Panel>
                                  </Collapse>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="reviews-sec-divs"
                    style={{ position: "relative" }}
                  >
                    <div className="ajax-loader">
                      <span>
                        <img src="" />
                      </span>
                    </div>
                    {Bidderdata.length > 0 && (
                      <ul>
                        {Bidderdata.map((user) => (
                          <div className="reviews-sec-div box-sh card card-body Project-bided">
                            <div className="reviews-ur-img">
                              <span>
                                <img
                                  src={`${constant.BASE_URL}/uploads/RegistrationImages/${user.userdata[0].ProfilePickName}`}
                                  alt=""
                                />
                              </span>
                            </div>

                            <div className="reviews-ur-cont">
                              <div className="reviews-ur-nm">
                                <p>
                                  <a href="#"></a>
                                </p>
                              </div>
                              <div className="reviews-stars">
                                <i className="fas fa-star active"></i>
                                <i className="fas fa-star active"></i>
                                <i className="fas fa-star "></i>
                                <i className="fas fa-star "></i>
                                <i className="fas fa-star "></i>
                                <div>
                                  {user.userdata[0].FirstName}{" "}
                                  {user.userdata[0].LastName}{" "}
                                </div>
                              </div>
                              {/* <div>{user.userdata[0].FirstName} {user.userdata[0].LastName} </div> */}
                            </div>
                            <div
                              className="Bd-time"
                              style={{ marginLeft: 500 }}
                            >
                              <p>
                                <span>Budget :</span>
                                <span>{user.budget} &#8377;</span>
                              </p>
                              <p>
                                <span>Delivery Date :</span>
                                <span>
                                  {moment(user.deliverydate).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </p>
                            </div>

                            <div>
                              <div></div>

                              <Popconfirm
                                title="Are you sure to accept this task?"
                                onConfirm={() =>
                                  AcceptBidToggler(user.solverid)
                                }
                                okText="Yes"
                                cancelText="No"
                              >
                                {normaldata.bidAccepted ? (
                                  <Button
                                    disabled={normaldata.bidAccepted}
                                    className="solution-btn"
                                    style={{ marginLeft: 500 }}
                                  >
                                    {" "}
                                    Bid Closed
                                  </Button>
                                ) : (
                                  <Button
                                    className="solution-btn"
                                    style={{ marginLeft: 500 }}
                                  >
                                    Accept Bid
                                  </Button>
                                )}
                              </Popconfirm>
                              {normaldata.bidAccepted ? (
                                user.WhoseBidAccepted ? (
                                  <>
                                    <div style={{ background: "green" }}>
                                      <h6 style={{ marginLeft: 350 }}>
                                        ACCPTED
                                      </h6>
                                    </div>
                                  </>
                                ) : (
                                  <div style={{ background: "red" }}>
                                    <h6 style={{ marginLeft: 350 }}>
                                      NOT ACCPTED
                                    </h6>
                                  </div>
                                )
                              ) : (
                                ""
                              )}

                              <div></div>
                            </div>
                          </div>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    //       </div>
    //     </div>
    //   </div>
  );
};

export default MyBidQuestionDetails;
