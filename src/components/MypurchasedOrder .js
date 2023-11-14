import React, { useEffect, useState } from "react";
import axios from "axios";
import constant from "../utils/constants";
import { message, Popconfirm } from "antd";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import fileDownload from "js-file-download";
import { Button } from "react-bootstrap";

const MypurchasedOrder = () => {
  const [searchParams] = useSearchParams();
  const [purchasedetails, setPurchaseDetails] = useState([]);
  let OrderId = searchParams.get("id");

  const PurchasedOrderSummery = async () => {
    console.log("in-function", OrderId);

    const Formdata = new FormData();

    Formdata.append("OrderNo", OrderId);

    await axios
      .post(`${constant.BASE_IP}/webapi/fetchingOrdersbyorderid`, Formdata)
      .then((response) => {
        if (response.data.status === 200) {
          console.log("ordereDetails response", response.data.data);
          setPurchaseDetails(response.data.data);
        } else if (response.data.status === 400) {
          message.error("Something went wrong");
        } else {
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    PurchasedOrderSummery();
  }, []);
  //function for downloading the file
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div class="col-lg-9 ">
      <div class="uploads-right-area">
        <div class="uploads-right-main">
          {purchasedetails.length > 0 && (
            <>
              {purchasedetails.map((user, index) => (
                <>
                  {user.BookData.length != 0 ? (
                    <>
                      <div class="uploads-right-main-items">
                        <div class="transaction-id">
                          <span>OrderNo:</span> : {user.OrderNo}
                        </div>

                        <div class="uploads-right-main-item box-sh card card-body">
                          <div class="row">
                            <div class="col-md-2">
                              <div class="uploads-item-img">
                                <a href="https://www.secure-gs.framework.infowindtech.biz/detail/eyJpdiI6ImE5OHYxYXpnSnRzdDZFZ3ZoWTlvUGc9PSIsInZhbHVlIjoiV3EyZmhnS0QzUXVHQjV6UUl5eHhHdz09IiwibWFjIjoiY2VlZWY0YmQwMWI5ZmY1NWY3ZjM1NTExNTkyMjBiZTJmZWQwOTdmNjQ1ZDY5M2Y2YTBkZjkzNzBlZGZmOWUyNCJ9">
                                  <img
                                    src={`${constant.BASE_URL}/uploads/TutorbookImages/${user.BookData[0].book_image}`}
                                    alt=""
                                  />
                                </a>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="uploads-item-cont">
                                <div class="uploads-item-title">
                                  <a href="https://www.secure-gs.framework.infowindtech.biz/detail/eyJpdiI6IjNnSVwvd1BWSzBNbStKajZ0YlN3bGtnPT0iLCJ2YWx1ZSI6IjVDTlFaTWxoXC9aK0E0Y3RvRDdmOFlRPT0iLCJtYWMiOiI4Yjg2Mjg0NDcyZDE2NGVmYTczMWIxNDEwOWVkZWU2MzM1ODlhNjEyZWViY2ZiNjU1MTc1NTVmMzYwMTdhMDIxIn0=">
                                    Affaires.Com{" "}
                                  </a>
                                </div>
                                <div class="uploads-item-dtls">
                                  <div class="uploads-item-dtls-left">
                                    <div class="uploads-item-price">
                                      $ <span>{user.BookData[0].price}</span>
                                    </div>
                                    <div class="uploads-item-author">
                                      <p>
                                        <a href="https://www.secure-gs.framework.infowindtech.biz/profile/eyJpdiI6ImhiaW1jRktjRVByWVI1SG1lTlhCOGc9PSIsInZhbHVlIjoibkM1TXpLWFhIRjU2K1p1UkxIUzZmdz09IiwibWFjIjoiNmRhMDUzZjI3NzIwMTQwMDdkOTMxOTkxOTZiNTFlNzYzNWM4N2VjNjBiN2Q3NWI2NmZhZjhkMDkzYjQ4ZmI2OCJ9">
                                          {user.BookData[0].seller_name}{" "}
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="payment-div">
                                <figure>
                                  {/* <img
                        src="https://www.secure-gs.framework.infowindtech.biz/public/images/payment_07.png"
                        alt=""
                      /> */}
                                </figure>

                                <p>
                                  <b>Purchase Date</b> :{" "}
                                  {moment(user.createdAt).format("DD/MM/YYYY")}
                                </p>
                                <p>
                                  <b>Transaction Id</b> : #
                                </p>
                                <p>
                                  <b>Status</b> : Pending
                                </p>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="uploads-item-right">
                                <div class="review-btn-div"></div>

                                <Button
                                  class="btn btn-warning"
                                  onClick={() => {
                                    handleDownload(
                                      `${constant.BASE_IP}/uploads/TutorbookImages/${user.BookData[0].book_image}`,
                                      "Book-download.pdf"
                                    );
                                  }}
                                >
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div class="uploads-right-main-items">
                      <div class="transaction-id">
                        <span>OrderNo:</span> : {user.OrderNo}
                      </div>

                      <div class="uploads-right-main-item box-sh card card-body">
                        <div class="row">
                          <div class="col-md-2">
                            <div class="uploads-item-img">
                              <a href="https://www.secure-gs.framework.infowindtech.biz/detail/eyJpdiI6ImE5OHYxYXpnSnRzdDZFZ3ZoWTlvUGc9PSIsInZhbHVlIjoiV3EyZmhnS0QzUXVHQjV6UUl5eHhHdz09IiwibWFjIjoiY2VlZWY0YmQwMWI5ZmY1NWY3ZjM1NTExNTkyMjBiZTJmZWQwOTdmNjQ1ZDY5M2Y2YTBkZjkzNzBlZGZmOWUyNCJ9">
                                <img
                                  src={`${constant.BASE_URL}/uploads/TutorAddDocumentImage/${user.DocumentData[0].image_name}`}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="uploads-item-cont">
                              <div class="uploads-item-title">
                                <a href="https://www.secure-gs.framework.infowindtech.biz/detail/eyJpdiI6IjNnSVwvd1BWSzBNbStKajZ0YlN3bGtnPT0iLCJ2YWx1ZSI6IjVDTlFaTWxoXC9aK0E0Y3RvRDdmOFlRPT0iLCJtYWMiOiI4Yjg2Mjg0NDcyZDE2NGVmYTczMWIxNDEwOWVkZWU2MzM1ODlhNjEyZWViY2ZiNjU1MTc1NTVmMzYwMTdhMDIxIn0=">
                                  {user.DocumentData[0].title}{" "}
                                </a>
                              </div>
                              <div class="uploads-item-dtls">
                                <div class="uploads-item-dtls-left">
                                  <div class="uploads-item-price">
                                    $ <span>{user.DocumentData[0].price}</span>
                                  </div>
                                  <div class="uploads-item-author">
                                    <p>
                                      <a href="https://www.secure-gs.framework.infowindtech.biz/profile/eyJpdiI6ImhiaW1jRktjRVByWVI1SG1lTlhCOGc9PSIsInZhbHVlIjoibkM1TXpLWFhIRjU2K1p1UkxIUzZmdz09IiwibWFjIjoiNmRhMDUzZjI3NzIwMTQwMDdkOTMxOTkxOTZiNTFlNzYzNWM4N2VjNjBiN2Q3NWI2NmZhZjhkMDkzYjQ4ZmI2OCJ9">
                                        {user.DocumentData[0].seller_name}{" "}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6">
                            <div class="payment-div">
                              <p>
                                <b>Purchase Date</b> :{" "}
                                {moment(user.createdAt).format("DD/MM/YYYY")}
                              </p>
                              <p>
                                <b>Transaction Id</b> : #
                              </p>
                              <p>
                                <b>Status</b> : Pending
                              </p>
                            </div>
                          </div>

                          <div class="col-md-12">
                            <div class="uploads-item-right">
                              <div class="review-btn-div"></div>
                              <div class="downloas-item-btn btnt">
                                <Button
                                  class="btn btn-warning"
                                  onClick={() => {
                                    handleDownload(
                                      `${constant.BASE_IP}/uploads/TutorAddDocumentImage/${user.DocumentData[0].image_name}`,
                                      "Document-download.pdf"
                                    );
                                  }}
                                >
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MypurchasedOrder;
