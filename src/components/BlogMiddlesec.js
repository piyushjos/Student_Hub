import React from "react";
import pic6 from "../images/photo-14.jpg";
import { Link } from "react-router-dom";

const BlogMiddlesec = () => {
  return (
    <div>
      <section className="section-middle" />

      <div className="page-title">
        <div className="container">
          <div className="page-title-in">
            <h2>Blog</h2>
          </div>
        </div>
      </div>

      <div className="container blog">
        <div className="blog-one">
          <div className="row">
            <div className="col-md-4">
              <div
                className="prepared-img"
                data-aos="fade-in"
                data-aos-duration="500"
              >
                <img src={pic6} alt="" />
              </div>
            </div>

            <div className="col-md-8">
              <div className="ab-desc">
                <div className="ab-head">
                  Lorem Ipsum <span>heading</span>
                </div>

                <div className="ab-short-desc">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </div>

                <div className="blog-date-time">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="blog-date">
                        Dec 31, 2019, <span>01:10 PM</span>
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="blog-readmore-btn">
                        {/*<Link to="/blog-single" className="btn">Continue Reading<i className="fas fa-chevron-right"></i></Link>*/}
                        <Link to="/blog-single" className="btn">
                          Continue Reading
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-one">
          <div className="row">
            <div className="col-md-4">
              <div
                className="prepared-img"
                data-aos="fade-in"
                data-aos-duration="500"
              >
                <img src={pic6} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="ab-desc">
                <div className="ab-head">
                  Lorem Ipsum <span>heading</span>
                </div>

                <div className="ab-short-desc">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </div>

                <div className="blog-date-time">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="blog-date">
                        Dec 31, 2019, <span>01:10 PM</span>
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="blog-readmore-btn">
                        <Link to="/blog-single" className="btn">
                          Continue Reading
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-one">
          <div className="row">
            <div className="col-md-4">
              <div
                className="prepared-img"
                data-aos="fade-in"
                data-aos-duration="500"
              >
                <img src={pic6} />
              </div>
            </div>

            <div className="col-md-8">
              <div className="ab-desc">
                <div className="ab-head">
                  Lorem Ipsum <span>heading</span>
                </div>

                <div className="ab-short-desc">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </div>

                <div className="blog-date-time">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="blog-date">
                        Dec 31, 2019, <span>01:10 PM</span>
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="blog-readmore-btn">
                        <Link to="/blog-single" className="btn">
                          Continue Reading
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogMiddlesec;
