import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, clearcart } from "../store/cartSlice";
import constant from "../utils/constants";
import { Spin, Slider, message } from "antd";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Paymentpopup from "../components/PaymentPopup";

const CartBook = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  console.log("checking for CartBook Data", products);

  const [total, setTotal] = useState(
    products.reduce((total, item) => total + item.price, 0)
  );

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // props.handleClose1();
  };
  const handleShow = () => {
    if (total === 0) {
      setShow(false);
    } else {
      setShow(true);
    }

    // props.handleClose1();
  };

  const handleRemove = async (productId, price) => {
    try {
      var formData = new FormData();
      formData.append("P_id", productId);
      formData.append("U_id", localStorage.getItem("id"));
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/Delete_to_cart`,
        formData
      );
      console.log(response);
      if (response.data.status == 200) {
        dispatch(remove(productId));
        console.log("its my product Id", productId);
        setTotal(total - price);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  const EmptyCart = async () => {
    console.log("i am empty cart");

    try {
      var formData = new FormData();

      formData.append("U_id", localStorage.getItem("id"));
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/Clear_cart`,
        formData
      );
      console.log(response);
      if (response.data.status == 200) {
        dispatch(clearcart());
        setTotal(0);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <section class="section-middle" />
      <div class="page-title">
        <div class="container">
          <div class="page-title-in">
            <h2>My Cart</h2>
          </div>
        </div>
      </div>

      <div class="my-cart-content">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="my-cart-left">
                <div class="my-cart-header">
                  <div class="continue-shop">
                    <a href="#">Continue Shopping</a>
                  </div>

                  <div class="Total-item">
                    You have {products.length} items in your cart
                  </div>

                  <div class="Empty-Cart">
                    <a onClick={() => EmptyCart()}>Clear Cart</a>
                  </div>
                </div>
                {products.map((product) => (
                  <div class="cart-prodcut-list" key={product.id}>
                    <div class="uploads-right-main-items">
                      <div class="uploads-right-main-item box-sh card card-body">
                        <div class="row">
                          <div class="col-md-2">
                            <div class="uploads-item-img">
                              {product.samplefile_image ? (
                                <img
                                  src={`${constant.BASE_URL}/uploads/TutorbookImages/${product.samplefile_image}`}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src={`${constant.BASE_URL}/uploads/TutorAddDocumentImage/${product.image_name}`}
                                  alt=""
                                />
                              )}
                            </div>
                          </div>

                          <div class="col-md-8" key={product.id}>
                            <div class="uploads-item-cont">
                              <div class="uploads-item-title">
                                <a href="product_detail_page.html">
                                  {product.title}
                                </a>
                              </div>
                              <div class="uploads-item-dtls">
                                <div class="uploads-item-dtls-left">
                                  <div class="uploads-item-price">
                                    <i class="fas fa-rupee-sign"></i>{" "}
                                    <span>{product.price}</span>
                                  </div>
                                  <div class="uploads-item-author">
                                    <p>Seller : {product.seller_name}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-2">
                            <div class="uploads-item-right">
                              <div class="subject-delete">
                                <a
                                  onClick={() =>
                                    handleRemove(product._id, product.price)
                                  }
                                  class="btn"
                                >
                                  <i class="far fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div></div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="my-cart-right">
                <div class="choose-your-payment aside-card card card-body">
                  <div class="cart-head">Choose your payment method</div>

                  <div class="currently-div payment">
                    <ul>
                      <li>
                        <label>
                          <input type="radio" name="currently" />
                          <span>
                            <img src="images/payment_03.png" alt="" />
                          </span>
                        </label>
                      </li>

                      <li>
                        <label>
                          <input type="radio" name="currently" />
                          <span>
                            <img src="images/payment_07.png" alt="" />
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="choose-your-payment text-center aside-card card card-body">
                  <div class="cart-head">Your Cart Total</div>

                  <div class="Total-item-count">Total : {products.length}</div>

                  <div class="Total-item-amount">
                    <i class="fas fa-rupee-sign"></i>
                    {total}
                  </div>

                  <div class="Proceed-with-checkout">
                    <Button
                      style={{ background: "#2c2f8c" }}
                      onClick={handleShow}
                    >
                      <i class="fas fa-shopping-cart"></i> &nbsp;
                      <b>Proceed with checkout</b>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*pop for randering payment page */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {<Paymentpopup amount={total} handleClose={handleClose} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartBook;
