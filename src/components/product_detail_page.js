import { React, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import constant, { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import { Spin, Slider, message } from "antd";
import Login from "./login";
import { Modal } from "react-bootstrap";

function TutorProductDetail(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchParams] = useSearchParams();
  const [title1, setTitle] = useState("");
  const [book1, setBook] = useState("");
  const [subject1, setSubject] = useState("");
  const [course1, setCourse] = useState("");
  const [price1, setPrice] = useState("");
  const [tag1, setTag] = useState("");
  const [image, setImage] = useState("");
  const [seller_name, setSeller_name] = useState("");
  const [about, setAbout] = useState("");
  const [productdata, setProductdata] = useState("");
  const Addedproduct = useSelector((state) => state.cart);
  const [flag, setFlag] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksflag, setBookmarksflag] = useState(false);
  const dispatch = useDispatch();
  const [link, setLink] = useState(
    localStorage.getItem("role") == "tutor" ? "tutor-help" : "student-help"
  );

  const handleAdd = async (product) => {
    console.log("callind handleAdd");
    // await dispatch(add(product));

    if (
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") == "undefined" ||
      localStorage.getItem("id") == undefined
    ) {
      console.log("login karo");

      handleShow();
    } else {
      setFlag(true);
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
        } else {
          message.error(response.data.message);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleAddtoBookmarks = async (id) => {
    console.log("======myBookmarks======", id);
    if (
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") == "" ||
      localStorage.getItem("id") == "undefined" ||
      localStorage.getItem("id") == undefined
    ) {
      console.log("login karo");

      handleShow();
    } else {
      try {
        var formData = new FormData();
        formData.append("P_id", id);
        formData.append("U_id", localStorage.getItem("id"));
        const response = await axios.post(
          `${constant.BASE_IP}/webapi/addBookmarks`,
          formData
        );
        console.log(response);
        if (response.data.status == 200) {
          message.success("successfully added in your book marks");
          setBookmarksflag(true);
        } else {
          message.error(response.data.message);
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  const onSignSuccess = async () => {
    let abc = searchParams.get("id");
    // console.log("kufhdhfd===" + abc);

    try {
      var formData = new FormData();
      formData.append("_id", abc);
      formData.append("userid", localStorage.getItem("id"));
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetch_booktupleData`,
        formData
      );
      console.log(response);
      setBookmarks(response.data.data1);
      setProductdata(response.data.data[0]);
      setImage(response.data.data[0].samplefile_image);
      setTitle(response.data.data[0].title);
      setBook(response.data.data[0].book);
      setSubject(response.data.data[0].subject);
      setCourse(response.data.data[0].course);
      setPrice(response.data.data[0].price);
      setTag(response.data.data[0].tag);
      setSeller_name(response.data.data[0].seller_name);
      setAbout(response.data.data[0].AboutBook);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    onSignSuccess();
  }, [bookmarksflag]);
  return (
    <section class="section-middle">
      <div class="page-title">
        <div class="container">
          <div class="page-title-in">
            <h2>{book1}</h2>
          </div>
        </div>
      </div>

      <div class="social-main-section">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="social-main-left">
                <div class="social-pro-left">
                  <div class="social-pro-top-head">
                    <h2>About Book</h2>
                    <p>{about}</p>
                  </div>
                  <div class="social-pro-dtls">
                    <div class="social-pro-img">
                      {/* <img
                        src={`${constant.BASE_URL}/uploads/TutorAddDocumentImage/${image}`}
                        style={{ width: "100%" }}
                      /> */}
                      <img
                        src={`${constant.BASE_URL}/uploads/TutorbookImages/${image}`}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
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
                        <div class="reviews-stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        <div class="reviews-ur-nm">
                          <p>
                            By: <a href="#">John doe</a> • 2 months ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="reviews-sec-div box-sh card card-body">
                      <div class="reviews-ur-img">
                        <span>
                          <i class="fas fa-user"></i>
                        </span>
                      </div>
                      <div class="reviews-ur-cont">
                        <div class="reviews-stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        <div class="reviews-ur-nm">
                          <p>
                            By: <a href="#">John doe</a> • 2 months ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="reviews-sec-div box-sh card card-body">
                      <div class="reviews-ur-img">
                        <span>
                          <i class="fas fa-user"></i>
                        </span>
                      </div>
                      <div class="reviews-ur-cont">
                        <div class="reviews-stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        <div class="reviews-ur-nm">
                          <p>
                            By: <a href="#">John doe</a> • 2 months ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="reviews-sec-div box-sh card card-body">
                      <div class="reviews-ur-img">
                        <span>
                          <i class="fas fa-user"></i>
                        </span>
                      </div>
                      <div class="reviews-ur-cont">
                        <div class="reviews-stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        <div class="reviews-ur-nm">
                          <p>
                            By: <a href="#">John doe</a> • 2 months ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="more-review-btn">
                      <a href="#" class="btn">
                        Show more reviews <i class="fas fa-chevron-down"></i>
                        <i></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="social-main-aside">
                <div class="study-area aside-card box-sh card card-body">
                  <div class="study-area-top">
                    <div class="study-title">{course1}</div>
                    <div class="study-review">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <div class="study-price">
                      <i class="fas fa-rupee-sign"></i>
                      {price1}
                    </div>
                    <div class="study-addtocart">
                      {Addedproduct.find(
                        ({ _id }) => _id === productdata._id
                      ) || flag ? (
                        <Link to={`/my-cart`}>View in cart</Link>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleAdd(productdata)}
                            className="btn"
                            variant="info"
                          >
                            <i class="fas fa-shopping-cart"></i>Add to cart
                          </Button>
                          <br />

                          <br />
                          {bookmarks.length ? (
                            <Link to={`/${link}/mybookmarks`}>
                              {" "}
                              <Button className="btn" variant="info">
                                view in bookmarks
                              </Button>{" "}
                            </Link>
                          ) : (
                            <Button
                              onClick={() =>
                                handleAddtoBookmarks(productdata._id)
                              }
                              className="btn"
                              variant="info"
                            >
                              Add to Bookmark
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div class="study-area-btm">
                    <div class="study-area-btm-left">
                      <ul>
                        <li>
                          <i class="fas fa-check-circle"></i> Instant Download
                        </li>
                        <li>
                          <i class="fas fa-check-circle"></i> Conquer Your
                          Course
                        </li>
                      </ul>
                    </div>
                    <div class="study-area-btm-right">
                      <ul>
                        <li>
                          <span>
                            <i class="fas fa-eye"></i> 15
                          </span>
                        </li>
                        <li>
                          <span>
                            <i class="fas fa-cloud-download-alt"></i> 05
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="seller-area aside-card box-sh card card-body">
                  <div class="seller-area-indivs">
                    <h3>Seller</h3>
                    <div class="seller-area-indiv">
                      <div class="seller-ur-img">
                        <span>
                          <i class="fas fa-user"></i>
                        </span>
                      </div>
                      <div class="seller-ur-cont">
                        <div class="seller-ur-name">{seller_name}</div>
                        <div class="seller-ur-dis">
                          Member since 7 months 491 documents sold
                        </div>
                        <div class="seller-stars">
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
                <div class="tags-area aside-card box-sh card card-body">
                  <div class="tags-area-indivs">
                    <h3>Tags</h3>
                    <div class="tags-area-tags">{tag1}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*for login popup */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h4 id="abc1">Log In to Your Account</h4>
        </Modal.Header>
        <Modal.Body>{<Login handleClose1={handleClose} />}</Modal.Body>
      </Modal>
    </section>
  );
}

export default TutorProductDetail;
