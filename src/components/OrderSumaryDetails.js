import React, { useEffect, useState } from "react";
import axios from "axios";
import constant from "../utils/constants";
import { message, Popconfirm } from "antd";
import moment from "moment";

import { Link } from "react-router-dom";

const OrderSummeryDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  const orderSummery = async () => {
    const Formdata = new FormData();

    Formdata.append("_id", localStorage.getItem("id"));
    await axios
      .post(`${constant.BASE_IP}/webapi/fetchingOrders`, Formdata)
      .then((response) => {
        if (response.data.status === 200) {
          console.log("ordereDetails response", response.data.data);
          setOrderDetails(response.data.data);
        } else if (response.data.status === 400) {
          message.error("Something went wrong");
        } else {
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    orderSummery();
  }, []);

  return (
    <>
      <div class="col-md-9">
        <div class="uploads-right-area">
          <div class="uploads-right-top"></div>

          <div>
            <div class="uploads-right-main-top">
              <div class="row">
                <div class="col-md-5">
                  <div class="up-ct">Total Orders : 1 to 2 of 2 </div>
                </div>
                <div class="col-md-7"></div>
              </div>
            </div>

            <div class="uploads-right-main-items my-Orders">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th>S&nbsp;No.</th>
                    <th>Order Id</th>
                    <th>Payment Id</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Purchased Date</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>
                  {orderDetails.length > 0 && (
                    <>
                      {orderDetails.map((user, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`mypuchasedOrder?id=${user.OrderNo}`}>
                              {user.OrderNo}
                            </Link>
                          </td>
                          <td class="tr-ID">
                            <div> {user.paymentId} </div>
                          </td>
                          <td>
                            <div>{user.paymentMethod}</div>
                          </td>
                          <td>
                            {" "}
                            <span class="btn btn-success">Success</span>
                          </td>
                          <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                          <td>
                            <Link to={`mypuchasedOrder?id=${user.OrderNo}`}>
                              <i class="fa fa-eye"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummeryDetail;
