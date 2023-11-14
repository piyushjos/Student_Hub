import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "yup-phone";
import axios from "axios";
import constant, { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Please enter you real name")
    .required("first name is Required"),

  lastName: Yup.string()
    .min(2, "Please enter last name")
    .required("last name is Required"),

  myemail: Yup.string()
    .email("Please enter a valid email address")
    .required("email is Required"),

  Phone_number: Yup.string()
    .required("A phone number is required")
    .phone(null, true, "please enter a valid phone number"),

  myfile: Yup.string(),
});

const StudentUpdate = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  const updateForm = async (values) => {
    // console.log("dufhdiuh");
    // console.log(values);
    try {
      var formData = new FormData();
      formData.append("values", JSON.stringify(values));
      formData.append("myfile", values.myfile);
      formData.append("_id", localStorage.getItem("id"));
      formData.append("email", localStorage.getItem("email"));

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/studentUpdateProfile`,
        formData
      );
      //console.log(response.data.data[0].FirstName);
      //   console.log(response.data.isemailVerified);

      if (response.data.status == 200) {
        // alert("data updated successfully");
        localStorage.setItem("name", response.data.data[0].FirstName);
        setMessage("data updated successfully");
        setFlag(true);
        setTimeout(() => {
          navigate(0);
        }, "5000");
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const onSignSuccess = async () => {
    try {
      var formData = new FormData();
      formData.append("_id", localStorage.getItem("id"));

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetch_profile`,
        formData
      );
      console.log(response.data.data[0]);
      setFirstname(response.data.data[0].FirstName);
      setLastname(response.data.data[0].LastName);
      setPhone(response.data.data[0].PhoneNumber);
      setEmail(response.data.data[0].Email);
      setImage(response.data.data[0].ProfilePickName);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    onSignSuccess();
  }, []);
  return (
    <div class="col-md-9">
      {flag ? <div style={{ color: "green" }}>{message}</div> : ""}
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: String(firstname) == "undefined" ? "" : String(firstname),
          lastName: String(lastname) == "undefined" ? "" : String(lastname),
          myemail: String(email),
          Phone_number: String(phone),
          myfile: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          updateForm(values);
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue, values }) => (
          <div class="uploads-right-area">
            <div class="update-right card card-body box-sh">
              <Form>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        First Name <span>*</span>
                      </label>
                      {/* <input type="text" class="form-control" placeholder="First Name" value=""/> */}
                      <Field
                        name="firstName"
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        autocomplete="off"
                      />
                      {errors.firstName && touched.firstName ? (
                        <div style={{ color: "red" }}>{errors.firstName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Last Name <span>*</span>
                      </label>
                      {/* <input type="text" class="form-control" placeholder="Last Name" value=""/> */}
                      <Field
                        name="lastName"
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        autocomplete="off"
                      />
                      {errors.lastName && touched.lastName ? (
                        <div style={{ color: "red" }}>{errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Phone Number <span>*</span>
                      </label>
                      {/* <input type="text" class="form-control" placeholder="Phone Number" value=""/> */}
                      <Field
                        name="Phone_number"
                        type="number"
                        className="form-control"
                        placeholder="Phone number"
                        autocomplete="off"
                      />
                      {errors.Phone_number && touched.Phone_number ? (
                        <div style={{ color: "red" }}>
                          {errors.Phone_number}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>
                        Email <span>*</span>
                      </label>
                      {/* <input type="email" class="form-control" placeholder="Email" value=""/> */}

                      <Field
                        name="myemail"
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        autocomplete="off"
                        readonly="readonly"
                      />
                      {errors.myemail && touched.myemail ? (
                        <div style={{ color: "red" }}>{errors.myemail}</div>
                      ) : null}
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Profile photo</label>
                      <input
                        type="file"
                        title="&nbsp;"
                        onChange={(e) =>
                          setFieldValue("myfile", e.target.files[0])
                        }
                      />

                      {errors.myfile && touched.myfile ? (
                        <div style={{ color: "red" }}>{errors.myfile}</div>
                      ) : null}
                    </div>
                    <img
                      src={`${constant.BASE_URL}/uploads/RegistrationImages/${image}`}
                    />
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input
                        type="submit"
                        class="btn"
                        value="Update Profile "
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default StudentUpdate;
