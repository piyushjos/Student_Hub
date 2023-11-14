import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";

function TutorhelpNav(props) {
  // const queryParams = new URLSearchParams(window.location.search);

  const sampleLocation = useLocation();
  console.log("pppppp", sampleLocation.pathname);

  let text = sampleLocation.pathname;
  let result1 = text.replace("/tutor-help/", "");

  console.log("result", result1);
  const [result, setResult] = useState(text.replace("/tutor-help/", ""));
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [isActive5, setIsActive5] = useState(false);
  const [isActive6, setIsActive6] = useState(false);
  const [isActive7, setIsActive7] = useState(false);
  const [isActive8, setIsActive8] = useState(false);
  const [isActive9, setIsActive9] = useState(false);
  const [isActive10, setIsActive10] = useState(false);
  const [isActive11, setIsActive11] = useState(false);
  const [isActive12, setIsActive12] = useState(false);
  const [isActive13, setIsActive13] = useState(false);
  const [isActive14, setIsActive14] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleClick1 = () => {
    console.log("hello clicked1 sajfhjdfhkdsjfhh");
    console.log("pppppp", window.location.pathname);
    setIsActive1(true);
    setFlag(true);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick2 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(true);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick3 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(true);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick4 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(true);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick5 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(true);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick6 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(true);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick7 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(true);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick8 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(true);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick9 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(true);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick10 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(true);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick11 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(true);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick12 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(true);
    setIsActive13(false);
    setIsActive14(false);
  };
  const handleClick13 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(true);
    setIsActive14(false);
  };
  const handleClick14 = () => {
    console.log("hello clicked1");
    setIsActive1(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
    setIsActive5(false);
    setIsActive6(false);
    setIsActive7(false);
    setIsActive8(false);
    setIsActive9(false);
    setIsActive10(false);
    setIsActive11(false);
    setIsActive12(false);
    setIsActive13(false);
    setIsActive14(true);
  };

  useMemo(() => {
    if (result1 == "myupload") {
      handleClick1();
    }
  }, [result1, flag]);

  // result == "myupload" ? handleClick1() : "";

  return (
    <div className="col-md-3">
      <div className="dashboard-left-menu">
        <ul>
          <li>
            {" "}
            {/* {result == "myupload" ? this.handleClick1() : ""} */}
            <div
              onClick={handleClick1}
              style={{
                backgroundColor: isActive1 ? "black" : "",
                color: isActive1 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/dashboard">
                <i class="fas fa-columns"></i>Dashboard
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick2}
              style={{
                backgroundColor: isActive2 ? "black" : "",
                color: isActive2 ? "white" : "",
              }}
            >
              {" "}
              <Link to="/tutor-help/myupload">
                <i class="fas fa-file-alt"></i>my upload
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick3}
              style={{
                backgroundColor: isActive3 ? "black" : "",
                color: isActive3 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/myearnings">
                <i className="fas fa-dollar-sign"></i> My Earnings
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick4}
              style={{
                backgroundColor: isActive4 ? "black" : "",
                color: isActive4 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/mybalance">
                <i className="fas fa-hand-holding-usd"></i> Balances (Redemption
                History)
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick5}
              style={{
                backgroundColor: isActive5 ? "black" : "",
                color: isActive5 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/ordersummary">
                <i className="fas fa-square-full"></i> My Orders
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick6}
              style={{
                backgroundColor: isActive6 ? "black" : "",
                color: isActive6 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/mybookmarks">
                <i className="fas fa-bookmark"></i> My Bookmarks
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick7}
              style={{
                backgroundColor: isActive7 ? "black" : "",
                color: isActive7 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/mybook">
                <i className="fas fa-book-open"></i> My Books
              </Link>
            </div>
          </li>

          <li className="active">
            <div
              onClick={handleClick8}
              style={{
                backgroundColor: isActive8 ? "black" : "",
                color: isActive8 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/myquestion">
                <i className="far fa-question-circle"></i> My question
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick9}
              style={{
                backgroundColor: isActive9 ? "black" : "",
                color: isActive9 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/mypaymentmethods">
                <i className="far fa-money-bill-alt"></i> Payment Methods
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick10}
              style={{
                backgroundColor: isActive10 ? "black" : "",
                color: isActive10 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/setting">
                <i className="fas fa-cog"></i> Settings
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick11}
              style={{
                backgroundColor: isActive11 ? "black" : "",
                color: isActive11 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/update-profile">
                <i className="fas fa-redo"></i> Update profile
              </Link>
            </div>
          </li>

          <li>
            <div
              onClick={handleClick12}
              style={{
                backgroundColor: isActive12 ? "black" : "",
                color: isActive12 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/tutor-change-password">
                <i className="fas fa-lock"></i> Change Password
              </Link>
            </div>
          </li>
          <li>
            <div
              onClick={handleClick13}
              style={{
                backgroundColor: isActive13 ? "black" : "",
                color: isActive13 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/tutor-Bid-On-Ouestion">
                <i class="fa fa-gavel" aria-hidden="true"></i>Bid On Ouestion
              </Link>
            </div>
          </li>
          <li>
            <div
              onClick={handleClick14}
              style={{
                backgroundColor: isActive14 ? "black" : "",
                color: isActive14 ? "white" : "",
              }}
            >
              <Link to="/tutor-help/mybid">
                <i class="fa fa-gavel" aria-hidden="true"></i>My Bid
              </Link>
            </div>
          </li>
          <li>
            <Link to="/logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TutorhelpNav;
