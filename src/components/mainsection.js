import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "@ant-design/react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import constant from "../utils/constants";
import Login from "./login";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { message } from "antd";
import Select from "react-select";
import { remove, clearcart } from "../store/cartSlice";
import { add1 } from "../store/cartSlice2";

function Mainsection(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const [school, setSchool] = useState([]);
  const [course, setCourse] = useState([]);
  const [Schoolvalue, setschoolValue] = useState();
  const [Coursevalue, setCourseValue] = useState();
  const Addedproduct = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [double, setDouble] = useState(false);
  // const settings = {
  //   className: "center",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "60px",
  //   slidesToShow: 5,
  //   speed: 500,
  // };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // const handleAdd = async (product) => {
  //   console.log("callind handleAdd");
  // };
  const getAllBook = async () => {
    try {
      var formData = new FormData();

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/getall_bookwithoutPagination`,
        formData
      );
      console.log("mai section", response.data.data);
      if (response.data.status == 200) {
        setData(response.data.data);
        setSchool(response.data.Schooldata);
        setCourse(response.data.Coursedata);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSchool = (e) => {
    console.log(e);
    if (e == null) {
      setschoolValue(null);
    } else {
      dispatch(add1({ school: e.value }));
      setschoolValue(e.value);
    }
  };

  const handleCourse = (e) => {
    console.log(e);
    if (e == null) {
      setCourseValue(null);
    } else {
      dispatch(add1({ subject: e.value }));
      setCourseValue(e.value);
    }
  };

  const handcartclick = async (product) => {
    console.log("product", product);
    if (
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") == "undefined" ||
      localStorage.getItem("id") == undefined
    ) {
      console.log("login karo");
      setDouble(false);
      handleShow();
    } else {
      console.log("add to cart karo");
      try {
        var formData = new FormData();
        formData.append("P_id", product._id);
        formData.append("U_id", localStorage.getItem("id"));
        const response = await axios.post(
          `${constant.BASE_IP}/webapi/Add_to_cart`,
          formData
        );
        console.log(response);
        if (response.data.status == 200) {
          dispatch(add(product));
          setDouble(false);
        } else {
          message.error(response.data.message);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const Course = course.map((x) => ({ value: x.Name, label: x.Name }));
  const School = school.map((x) => ({ value: x.Name, label: x.Name }));
  useEffect(() => {
    getAllBook();
  }, []);
  console.log("hello", Addedproduct);
  return (
    <div>
      <section class="section-middle">
        <div class="section-banner-studySmarter">
          <div class="main-banner">
            <div class="owl-carousel banner-slider">
              <div class="item">
                <div class="banner-slider-item">
                  <div class="banner-slider-img">
                    <img
                      src={require("../images/study-tips-banner2.jpg")}
                      alt=""
                    />
                  </div>
                  <div class="banner-slider-cont">
                    <div class="container">
                      <div class="banner-slider-cont-inn">
                        <h2>Your heading</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit. Aenean commodo ligula eget dolor. Aenean massa.
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="studySmarter">
            <div class="container">
              <div class="studySmarter-inn">
                <div class="studySmarter-head">
                  <h2>Study Smarter</h2>
                  <p>Study documents for all your classes</p>
                </div>
                <div class="studySmarter-form-div">
                  <div class="row">
                    <div class="col-md-5">
                      <div class="studySmarter-form field form-group">
                        <label class="form-label" for="fullname">
                          School
                        </label>

                        <Select
                          isClearable
                          isSearchable
                          name="color"
                          options={School}
                          onChange={handleSchool}
                        />
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="studySmarter-form field form-group">
                        <label class="form-label" for="fullname">
                          Course
                        </label>
                        <Select
                          isClearable
                          isSearchable
                          name="color"
                          options={Course}
                          onChange={handleCourse}
                        />
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="studySmarter-form">
                        <Link to={`/tutor-help/tutor-subject`}>
                          <input type="submit" value="FInd Course" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="gradstoc-section">
          <div class="container">
            <div class="gradstoc-inn">
              <div
                class="section-head"
                data-aos="fade-down"
                data-aos-duration="600"
              >
                <h2>
                  <span>Why</span> Gradstoc?
                </h2>
                <p>Lorem ipsum, or lipsum as it is sometimes known copy 4</p>
              </div>
              <div class="gradstoc-main-section">
                <div class="gradstoc-img">
                  <img src={require("../images/photo-151.jpg")} alt="" />
                </div>
                <div class="gradstoc-cont">
                  <div class="gradstoc-cont-inn">
                    <h2>Lorem Ipsum is simply dummy text of the printing</h2>
                    <div class="rt-i">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. <br />
                      Lorem Ipsum has been the industry's standard dummy text
                      ever.
                    </p>
                    <h3>From Start to Finish</h3>
                    <div class="gradstoc-btn">
                      <a href="#" class="btn">
                        How It Works
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="materials-section">
          <div class="container">
            <div class="materials-inn">
              <div
                class="section-head"
                data-aos="fade-down"
                data-aos-duration="600"
              >
                <h2>
                  <span>Study</span> Materials
                </h2>
                <p>Lorem ipsum, or lipsum as it is sometimes known copy 4</p>
              </div>
              <div class="materials-slider-section">
                {data.length > 0 && (
                  <Slider {...settings}>
                    {data.map((user) => (
                      <div class="item">
                        <div class="materials-item">
                          <div class="materials-item-inn card">
                            <div class="materials-item-img card-img">
                              <Link to={`/product_detail_page?id=${user._id}`}>
                                <img
                                  src={`${constant.BASE_URL}/uploads/TutorbookImages/${user.samplefile_image}`}
                                  alt="Book Image"
                                />
                              </Link>
                            </div>
                            <div class="materials-item-cont card-body">
                              <div class="materials-item-name card-title">
                                {user.subject}
                              </div>
                              <div class="materials-rt-ct">
                                <div class="materials-price-rt">
                                  <div class="materials-price">
                                    $ {user.price}
                                  </div>
                                  <div class="materials-rt">
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star"></i>
                                  </div>
                                </div>

                                <div>
                                  {Addedproduct.find(
                                    ({ _id }) => _id === user._id
                                  ) ? (
                                    <Link to={`/my-cart`}>
                                      <i
                                        class="fa fa-check"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  ) : (
                                    <button
                                      disabled={double}
                                      onClick={() => {
                                        setDouble(true);
                                        handcartclick(user);
                                      }}
                                    >
                                      {" "}
                                      <i className="fas fa-shopping-cart"></i>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </div>

        <div class="prepared-section">
          <div class="container">
            <div class="prepared-inn">
              <div
                class="section-head"
                data-aos="fade-down"
                data-aos-duration="600"
              >
                <h2>
                  <span>Be</span> Prepared
                </h2>
                <p>Lorem ipsum, or lipsum as it is sometimes known copy 4</p>
              </div>
              <div class="prepared-main-section">
                <div class="row">
                  <div class="col-md-8">
                    <div class="prepared-text">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishingard dummy text ever
                        since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the
                        leap into electronic typesetti..
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div
                      class="prepared-img"
                      data-aos="fade-in"
                      data-aos-duration="500"
                    >
                      <img src={require("../images/photo-14.jpg")} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="popular-section">
          <div class="container">
            <div class="popular-inn">
              <div
                class="section-head"
                data-aos="fade-down"
                data-aos-duration="600"
              >
                <h2>
                  <span>Popular</span> Subjects
                </h2>
                <p>Lorem ipsum, or lipsum as it is sometimes known copy 4</p>
              </div>
              <div class="popular-main-section">
                <ul>
                  <li data-aos="fade-up" data-aos-duration="500">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Biology">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Biology</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="600">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Business">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Business</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="700">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Chemistry">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Chemistry</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="600">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Computers">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Computers</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="500">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Education">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Education</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="500">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=English">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>English</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="600">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Math">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Math</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="700">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Nursing">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Nursing</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="600">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Psychology">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Psychology</p>
                      </Link>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="500">
                    <div class="popular-item">
                      <Link to="/tutor-help/tutor-book?subject=Theology">
                        <span>
                          <i class="fas fa-book"></i>
                        </span>
                        <p>Theology</p>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="started-section">
          <div class="container">
            <div class="prepared-inn">
              <div
                class="section-head"
                data-aos="fade-down"
                data-aos-duration="600"
              >
                <h2>
                  <span>Get Started</span> Today
                </h2>
                <p>Lorem ipsum, or lipsum as it is sometimes known copy 4</p>
              </div>
              <div class="prepared-main-section">
                <div class="row">
                  <div class="col-md-4">
                    <div
                      class="prepared-img"
                      data-aos="fade-in"
                      data-aos-duration="500"
                    >
                      <img src={require("../images/photo-14.jpg")} alt="" />
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="prepared-text">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishingard dummy text ever
                        since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the
                        leap into electronic typesetti..
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*for login popup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h4 id="abc1">Log In to Your Account</h4>
        </Modal.Header>
        <Modal.Body>{<Login handleClose1={handleClose} />}</Modal.Body>
      </Modal>
    </div>
  );
}

export default Mainsection;
