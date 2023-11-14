import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import constant from "../utils/constants";
import { Spin, Slider, message } from "antd";

import PropTypes from "prop-types";

function SchoolList(props) {
  const [active, setActive] = useState("1");

  const [data, setData] = useState([]);

  const onFirstLoadgetAlldata = async (value) => {
    try {
      console.log("valueeee", value);
      var formData = new FormData();

      formData.append("searching", value);

      const response = await axios.post(
        `${constant.BASE_IP}/webapi/schoolName`,
        formData
      );
      console.log("school list", response.data.data);
      if (response.data.status == 200) {
        setData(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const handleClick = (event) => {
    let ascii = 64 + parseInt(event.target.id);
    console.log("value", String.fromCharCode(ascii));
    setActive(event.target.id);
    onFirstLoadgetAlldata(String.fromCharCode(ascii));
  };
  useEffect(() => {
    onFirstLoadgetAlldata();
  }, []);
  return (
    <div>
      <section class="section-middle">
        <div class="page-title">
          <div class="container">
            <div class="page-title-in">
              <h2>Schools List</h2>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="schools-list-section">
            <div class="schools-list-head">
              <h2>Find your school</h2>
              <p>
                Choose form our list of schools and colleges to find the study
                resources you need.
              </p>
            </div>
            <div class="schools-list-items">
              <div class="schools-list-nav">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a
                      class={active === "1" ? "nav-link active" : undefined}
                      id={"1"}
                      value={"a"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#A"
                    >
                      A
                    </a>
                  </li>

                  <li class="nav-item">
                    <a
                      class={active === "2" ? "nav-link active" : undefined}
                      id={"2"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#B"
                    >
                      B
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "3" ? "nav-link active" : undefined}
                      id={"3"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#C"
                    >
                      C
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "4" ? "nav-link active" : undefined}
                      id={"4"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#D"
                    >
                      D
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "5" ? "nav-link active" : undefined}
                      id={"5"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#E"
                    >
                      E
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "6" ? "nav-link active" : undefined}
                      id={"6"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#F"
                    >
                      F
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "7" ? "nav-link active" : undefined}
                      id={"7"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#G"
                    >
                      G
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "8" ? "nav-link active" : undefined}
                      id={"8"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#H"
                    >
                      H
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "9" ? "nav-link active" : undefined}
                      id={"9"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#I"
                    >
                      I
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "10" ? "nav-link active" : undefined}
                      id={"10"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#J"
                    >
                      J
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "11" ? "nav-link active" : undefined}
                      id={"11"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#k"
                    >
                      K
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "12" ? "nav-link active" : undefined}
                      id={"12"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#L"
                    >
                      L
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "13" ? "nav-link active" : undefined}
                      id={"13"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#M"
                    >
                      M
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "14" ? "nav-link active" : undefined}
                      id={"14"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#N"
                    >
                      N
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "15" ? "nav-link active" : undefined}
                      id={"15"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#O"
                    >
                      O
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "16" ? "nav-link active" : undefined}
                      id={"16"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#P"
                    >
                      P
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "17" ? "nav-link active" : undefined}
                      id={"17"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#Q"
                    >
                      Q
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "18" ? "nav-link active" : undefined}
                      id={"18"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#R"
                    >
                      R
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "19" ? "nav-link active" : undefined}
                      id={"19"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#S"
                    >
                      S
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "20" ? "nav-link active" : undefined}
                      id={"20"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#T"
                    >
                      T
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "21" ? "nav-link active" : undefined}
                      id={"21"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#U"
                    >
                      U
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "22" ? "nav-link active" : undefined}
                      id={"22"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#V"
                    >
                      V
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "23" ? "nav-link active" : undefined}
                      id={"23"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#W"
                    >
                      W
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "24" ? "nav-link active" : undefined}
                      id={"24"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#X"
                    >
                      X
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "25" ? "nav-link active" : undefined}
                      id={"25"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#Y"
                    >
                      Y
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={active === "26" ? "nav-link active" : undefined}
                      id={"26"}
                      onClick={handleClick}
                      data-toggle="tab"
                      // href="#Z"
                    >
                      Z
                    </a>
                  </li>
                </ul>
              </div>
              <div class="schools-list-item box-sh">
                <div class="tab-content">
                  <div id="a" class="tab-pane active">
                    <div class="schools-item-list">
                      {data.length > 0 && (
                        <ul>
                          {data.map((user) => (
                            <li>
                              <h6>{user.Name}</h6>
                              <p>4,049 Study Resources</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div id="b" class="tab-pane fade">
                    <div class="schools-item-list">
                      <ul>
                        <li>
                          <h2>
                            <a href="#">A.T. Still University</a>
                          </h2>
                          <p>4,049 Study Resources</p>
                        </li>
                      </ul>
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

export default SchoolList;
