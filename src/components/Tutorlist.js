import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import constant from "../utils/constants";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Spin } from "antd";

function Tutorlist(props) {
  const [alltutor, setAlltutor] = useState([]);
  const [spinflag, setSpinflag] = useState(true);
  const [Selected, setSelected] = useState("");
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState();

  const onTutorAll = async () => {
    try {
      setSpinflag(false);
      var formData = new FormData();
      formData.append("searching", Selected);
      formData.append("page", page);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/getall_tutor`,
        formData
      );
      //   console.log(response.data.data);
      if (response.data.status == 200) {
        setSpinflag(true);
        setAlltutor(response.data.data);
        setNumberOfPages(response.data.totalPages);
      } else {
        setSpinflag(true);
        alert(response.data.message);
      }
    } catch (err) {
      setSpinflag(true);
      alert(err.message);
    }
  };
  const handleselectChange = (event) => {
    console.log("handleselectChange", event.target.value);
    if (event.target.value == "") {
      console.log("NULL");
      setSelected("");
    } else {
      setSelected(event.target.value);
    }
  };

  const handlesearchClick = () => {
    console.log("handlesearchClick");
    // onTutorAll();
    if (page === 0) {
      onTutorAll();
    } else {
      setPage(0);
    }
  };

  const handlePageClick = (event) => {
    console.log(event.selected);
    setPage(event.selected);
  };

  useEffect(() => {
    onTutorAll();
  }, [page]);
  return (
    <>
      <div>
        <section class="section-middle">
          <div class="page-title">
            <div class="container">
              <div class="page-title-in">
                <h2>Tutor List</h2>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="tutor-list-section">
              <div class="uploads-right-top">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Tutor Search..."
                    onChange={handleselectChange}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? handlesearchClick() : ""
                    }
                  />
                  <button class="btn" onClick={handlesearchClick}>
                    Search
                  </button>
                </div>
              </div>
              {spinflag ? (
                ""
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "100px",
                  }}
                >
                  <Spin />{" "}
                </div>
              )}
              {alltutor.length > 0 && spinflag && (
                <div class="tutor-list-item">
                  <ul>
                    {alltutor.map((user) => (
                      <li>
                        <div class="tutor-list-inn card card-body box-sh">
                          <div class="tutor-list-img">
                            <img
                              src={`${constant.BASE_URL}/uploads/RegistrationImages/${user.ProfilePickName}`}
                              alt=""
                            />
                          </div>
                          <div class="tutor-list-cont">
                            <h2>
                              <a>
                                {user.FirstName}_{user.LastName}
                              </a>{" "}
                            </h2>
                            <p>Subject :- English</p>
                            <div class="reviews-stars">
                              <i class="fas fa-star active"></i>
                              <i class="fas fa-star active"></i>
                              <i class="fas fa-star active"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                            </div>
                          </div>
                          <div class="tutor-list-btn">
                            <Link
                              to={`/tutor-help/tutor-profile?id=${user._id}`}
                              class="btn"
                            >
                              View More
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={numberOfPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}

export default Tutorlist;
