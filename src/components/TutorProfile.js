import { React, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import constant, { BASE_URL } from "../utils/constants";

import PropTypes from "prop-types";

function TutorProfile(props) {
  const [searchParams] = useSearchParams();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [image, setImage] = useState("");
  const [Qualification, setQualification] = useState("");
  const [Exeperince, setExperence] = useState("");
  const [Specilization, setSpecilization] = useState("");
  const [Aboutme, setAboutme] = useState("");
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };
  const onSignSuccess = async () => {
    let abc = searchParams.get("id");
    // console.log("kufhdhfd===" + abc);
    try {
      var formData = new FormData();
      formData.append("_id", abc);
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/getparticular_tutor`,
        formData
      );
      console.log("getparticular_tutor", response);

      setFullname(
        response.data.data[0].FirstName + "_" + response.data.data[0].LastName
      );
      setEmail(response.data.data[0].Email);
      setPhonenumber(response.data.data[0].PhoneNumber);
      setImage(response.data.data[0].ProfilePickName);
      setQualification(response.data.data[0].Qualification);
      setExperence(response.data.data[0].Experence);
      setSpecilization(response.data.data[0].Specilization);
      setAboutme(response.data.data[0].Aboutme);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    onSignSuccess();
  }, []);
  return (
    <div>
      <section class="section-middle">
        <div class="page-title">
          <div class="container">
            <div class="page-title-in">
              <h2>Tutor Profile</h2>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="user-profile-section">
            <div class="row">
              <div class="col-md-8">
                <div class="user-profile-inn">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="user-profile-img">
                        <span>
                          <span>
                            <img
                              src={`${constant.BASE_URL}/uploads/RegistrationImages/${image}`}
                              alt=""
                            />
                          </span>
                        </span>
                      </div>
                      <div class="hire-btns">
                        <ul>
                          <li>
                            <a href="#" class="btn">
                              Hire Me
                            </a>
                          </li>
                          <li>
                            <a href="#" class="btn">
                              Message Me
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <div class="user-profile-body">
                        <div class="user-profile-name">
                          <h2>{fullname}</h2>
                          <h3>Biology</h3>
                          <div class="reviews-stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                          </div>
                        </div>
                        <div class="user-profile-dtl">
                          <table class="table">
                            <tr>
                              <th>Full Name</th>
                              <td>{fullname}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{email}</td>
                            </tr>
                            <tr>
                              <th>Phone No.</th>
                              <td>{phonenumber}</td>
                            </tr>
                            <tr>
                              <th>Qualification</th>
                              <td>{Qualification}</td>
                            </tr>
                            <tr>
                              <th>Experience</th>
                              <td>{Exeperince}</td>
                            </tr>
                            <tr>
                              <th>Specialization</th>
                              <td>{Specilization}</td>
                            </tr>
                            {/* <tr>
                              <th>Total Document Uploaded</th>
                              <td>15 Document Uploaded</td>
                            </tr> */}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-reviews">
                  <div class="reviews-section">
                    <div class="sec-head">Reviews</div>
                    <div class="reviews-sec-divs">
                      <div class="reviews-sec-div box-sh card card-body">
                        <div class="reviews-ur-img">
                          <span>
                            <i class="fas fa-user"></i>
                          </span>
                        </div>
                        <div class="reviews-ur-cont">
                          <div class="reviews-ur-name">Nina Holloway</div>
                          <div class="reviews-ur-date">14-01-2020</div>
                        </div>
                        <div class="reviews-ur-dis">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                        </div>
                        <div class="reviews-stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                      </div>
                      <div class="reviews-sec-div box-sh card card-body">
                        <div class="reviews-ur-img">
                          <span>
                            <i class="fas fa-user"></i>
                          </span>
                        </div>
                        <div class="reviews-ur-cont">
                          <div class="reviews-ur-name">Nina Holloway</div>
                          <div class="reviews-ur-date">14-01-2020</div>
                        </div>
                        <div class="reviews-ur-dis">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                        </div>
                        <div class="reviews-stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                      </div>
                      <div class="reviews-sec-div box-sh card card-body">
                        <div class="reviews-ur-img">
                          <span>
                            <i class="fas fa-user"></i>
                          </span>
                        </div>
                        <div class="reviews-ur-cont">
                          <div class="reviews-ur-name">Nina Holloway</div>
                          <div class="reviews-ur-date">14-01-2020</div>
                        </div>
                        <div class="reviews-ur-dis">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s.
                        </div>
                        <div class="reviews-stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="user-profile-aside">
                  <div class="card box-sh">
                    <div class="card-header">About Me</div>
                    <div class="card-body">
                      <p>{Aboutme}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TutorProfile;
