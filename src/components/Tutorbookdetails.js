import { React, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import constant, { BASE_URL } from "../utils/constants";

function TutorProductDetail(props) {
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

  const onSignSuccess = async () => {
    let abc = searchParams.get("id");
    // console.log("kufhdhfd===" + abc);
    try {
      var formData = new FormData();
      formData.append("_id", abc);
      const response = await axios.post(
        `${constant.BASE_IP}/webapi/fetch_booktupleData`,
        formData
      );
      console.log(response);

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
  }, []);
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
                    <div class="study-addtocart"></div>
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
    </section>
  );
}

export default TutorProductDetail;
