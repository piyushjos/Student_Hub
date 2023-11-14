import { React, useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import { Formik, Form, Field, Dropdown } from "formik";
import * as Yup from "yup";
import axios from "axios";
import constant from "../utils/constants";
import { message, Popconfirm } from "antd";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import BiddingList from "./BiddingListview";

const validatio12 = Yup.object().shape({
  bidDate: Yup.string().required("Required"),

  bidAmount: Yup.number().required("Price is Required"),
});

const BiddingListview = () => {
  const [data, showdata] = useState("");
  const [bidflag, setBidflag] = useState();
  const [searchParams] = useSearchParams(); // use for getting Tuple Id
  let myid = searchParams.get("id");

  const Datafromchild = (x) => {
    console.log("x", x);
    setBidflag(x);
  };

  //Function for sending  Formdata to backend
  const submitForm = async (values) => {
    console.log(values);

    var formData = new FormData();
    formData.append("values", JSON.stringify(values));

    formData.append("_id", localStorage.getItem("id"));

    formData.append("name", localStorage.getItem("name"));
    formData.append("Que_id", myid);

    await axios
      .post(`${constant.BASE_IP}/webapi/add_bid`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("checkresponse", res);
        if (res.status === 200) {
          message.success("Bid uploaded Succesfully");
        }
        if (res.data.status === 400) {
          console.log("res");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {" "}
      <div class="col-md-9">
        {bidflag}
        <Formik
          initialValues={{
            bidAmount: "",
            bidDate: "",
          }}
          validationSchema={validatio12}
          onSubmit={(values) => {
            submitForm(values);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
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
                      <button class="btn" type="submit" disabled={bidflag}>
                        Add your Bid
                      </button>
                    </span>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>

        {bidflag ? (
          "bid accepted"
        ) : (
          <BiddingList Datafromchild={Datafromchild} />
        )}
      </div>
    </>
  );
};

export default BiddingListview;
