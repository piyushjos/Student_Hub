import React from "react";
import PropTypes from "prop-types";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { remove, clearcart } from "../store/cartSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaymentPopup(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const navigate = useNavigate();
  //Api for order Details coming from stripe payment method
  const PaymentSucessfull = async (paymentMethod1, paymentId1) => {
    console.log(paymentMethod1);
    console.log(paymentId1);

    const Formdata = new FormData();
    Formdata.append("OrderdCardData", JSON.stringify(products));
    Formdata.append("_id", localStorage.getItem("id"));
    Formdata.append("email", localStorage.getItem("email"));

    Formdata.append("paymentMethod", paymentMethod1);
    Formdata.append("paymentId", paymentId1);
    Formdata.append("Amount", props.amount);

    try {
      const response = await axios.post(
        "http://192.168.1.47:3006/webapi/orderDetails",
        Formdata
      );
      console.log(response);
      if (response.data.status == 200) {
        dispatch(clearcart());
        navigate("/tutor-help/ordersummary");
      } else {
        alert(" oops ");
      }
    } catch (err) {
      alert(err);
    }
  };

  const makePayment = async (token) => {
    try {
      var formData = new FormData();
      formData.append("token", token);
      formData.append("Price", props.amount);
      const response = await axios.post(
        "http://192.168.1.47:3006/webapi/payment",
        formData
      );
      console.log(response);
      if (response.data.status == 200) {
        // alert("payment completed", response);
        PaymentSucessfull(response.data.paymentMethod, response.data.paymentId);
        props.handleClose();
      } else {
        props.handleClose();
        alert("payment fails", response);
      }
    } catch (err) {
      alert(err);
    }
  };
  const initialOptions = {
    "client-id":
      "AT2Fv6POxLcJDBcZO18jsIkUdTCQ1M3drr57LGnopI9sNvZAtIhvIFhw5CmbG7OKacKWVr2-CksT-YbC",
    currency: "USD",
  };

  return (
    <div>
      Hello
      <br />
      Your total Amount is={props.amount} $
      <br />
      =====================Pay with card=====================
      <>&nbsp;&nbsp;</>
      <br />
      <StripeCheckout
        stripeKey="pk_test_51LaZuiSHlJWqC63LMzfUQw4m0eFNpoyxGTbh6rSv0s1GPzSbXFUOFCfAJLR2Nn3eKsbB9xZH8u76hictkpdZCbvX00siHg6SE5"
        token={makePayment}
        name="Buy React"
        amount={props.amount * 100}
      >
        <Button className="btn-large blue">Pay {props.amount} $</Button>
      </StripeCheckout>
      <br />
      <br />
      =======================Pay with paypal=====================
      <>&nbsp;&nbsp;</>
      <div style={{ width: "30px" }}>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: props.amount,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                console.log("dertails", details);
                const name = details.payer.name.given_name;
                // alert(`Transaction completed by ${name}`);
                PaymentSucessfull("Paypal", details.id);
                props.handleClose();
              });
            }}
            onCancel={() => {
              alert(`Transaction cancel`);
            }}
            onError={(err) => {
              alert(`Transaction err ${err}`);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default PaymentPopup;
