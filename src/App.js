import "./fontawesome-free/css/all.min.css";
import "./css/menu.css";
import "./css/responsive.css";
import "./css/bootstrap.min.css";
import "./css/style.css";
import Poptest from "./components/poptest";
import Headerstudent from "./components/sutdentheader";
import Header from "./components/header";
import Main from "./components/mainsection";
import Fotter from "./components/fotter";
import BookMiddle from "./components/BookMiddlesection";
import ProductDetail from "./components/product_detail_page";
import BlogPage from "./components/BlogMiddlesec";
import BlogSingle from "./components/BlogSingle";
import SubjectMiddleSection from "./components/SubjectMiddleSection";
import Totorlist from "./components/Tutorlist";
import TotorProfile from "./components/TutorProfile";
import LayOut from "./components/LayOut";
import StudentLayout from "./components/StudentLayout";
import TutorhelpMidsec from "./components/TutorhelpMidsec";
import TutorDashboard from "./components/TutorDashboard";
import TutorMyUpload from "./components/TutorMyUpload";
import TutorMyearnings from "./components/TutorMyearnings";
import TutorBalance from "./components/TutorBalance";
import TutorMyorders from "./components/TutorMyorders";
import TutorMybookmarks from "./components/TutorMybookmarks";
import TutorMyBook from "./components/TutorMyBook";
import TutorMyquestion from "./components/TutorMyquestion";
import TutorPaymentmethod from "./components/TutorPaymentmethod";
import TutorSetting from "./components/TutorSetting";
import TutorUpdateprofile from "./components/TutorUpdateprofile";
import SchoolList from "./components/SchoolList";
import TutornavigationBar from "./components/TutornavigationBar";
import Logout from "./components/logout";
import TutoraddDocument from "./components/TutoraddDocument1";
import PrivateRoute from "./utils/PrivateRoute";
import PrivateRoute2 from "./utils/PrivateRoute2";
import React, { useState, useEffect } from "react";
import TutorProductDetail from "./components/TutorProductDetail";
import TutorProductDetail1 from "./components/TutorProductDetail1";
import TutorbookDetail from "./components/Tutorbookdetails";
import BidSection from "./components/BidSection";
import BiddingList from "./components/BiddingListview";
import MyBidQuestionDetails from "./components/MyBidQuestionDetails";
import MyBid from "./components/MyBid";
import HelloSolution from "./components/HelloSolution";
import Cart from "./components/Cart";
import OrderDetails from "./components/OrderSumaryDetails";

import TutorChangepassword from "./components/TutorChangepassword";
import MypurchasedOrder from "./components/MypurchasedOrder ";
import BecomeATutor from "./components/BecomeTutor";
import StudentUpdate from "./components/StudentUpdate";
import io from "socket.io-client";
import { BASE_IP } from "./utils/constants";

import { Routes, Route } from "react-router-dom";

function App() {
  const [show, setShow] = useState();
  const [show1, setShow1] = useState();

  useEffect(() => {
    setInterval(() => {
      if (
        localStorage.getItem("role") === null ||
        localStorage.getItem("role") == "" ||
        localStorage.getItem("role") == "undefined" ||
        localStorage.getItem("role") == undefined
      ) {
        setShow(true);
      } else {
        setShow(false);
        if (localStorage.getItem("role") == "tutor") {
          setShow1(true);
        } else {
          setShow1(false);
        }
      }
    }, []);
  }, 5000);
  return (
    <div>
      {show ? <Header /> : show1 ? <TutornavigationBar /> : <Headerstudent />}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/test" element={<Poptest />}></Route>
        <Route path="/books-page" element={<BookMiddle />}></Route>
        <Route path="/product_detail_page" element={<ProductDetail />}></Route>
        <Route
          path="/product_detail_page_subject"
          element={<TutorProductDetail />}
        ></Route>
        <Route path="/blog-page" element={<BlogPage />}></Route>
        <Route path="/blog-single" element={<BlogSingle />}></Route>
        <Route path="/subject" element={<SubjectMiddleSection />}></Route>
        <Route path="/school-list" element={<SchoolList />}></Route>
        <Route path="/tutor-list" element={<Totorlist />}></Route>
        <Route path="/tutor-profile" element={<TotorProfile />}></Route>
        {/* <Route path="/tutorBidOnOuestion" element={<BidSection />}></Route> */}
        <Route path="/logout" element={<Logout />}></Route>{" "}
        <Route
          path="/tutor-help"
          element={
            <PrivateRoute>
              <LayOut />
            </PrivateRoute>
          }
        >
          {/* <Route path="" element={<TutorhelpMidsec />} /> */}
          <Route path="" element={<TutorDashboard />} />
          <Route path="dashboard" element={<TutorDashboard />} />
          <Route path="myupload" element={<TutorMyUpload />} />
          <Route path="myearnings" element={<TutorMyearnings />} />
          <Route path="mybalance" element={<TutorBalance />} />
          <Route
            path="ordersummary/mypuchasedOrder"
            element={<MypurchasedOrder />}
          />
          <Route path="mybookmarks" element={<TutorMybookmarks />} />
          <Route path="mybook" element={<TutorMyBook />} />
          <Route path="myquestion" element={<TutorMyquestion />} />
          <Route path="mypaymentmethods" element={<TutorPaymentmethod />} />
          <Route path="setting" element={<TutorSetting />} />
          <Route path="update-profile" element={<TutorUpdateprofile />} />
          <Route path="add-document" element={<TutoraddDocument />} />
          <Route path="tutor-Bid-On-Ouestion" element={<BidSection />} />

          <Route path="BiddingList" element={<BiddingList />} />

          <Route path="Bidquestiondetails" element={<MyBidQuestionDetails />} />
          <Route path="hellosolution" element={<HelloSolution />} />
          <Route path="mybid" element={<MyBid />} />
          <Route path="ordersummary" element={<OrderDetails />} />
          <Route
            path="tutor-change-password"
            element={<TutorChangepassword />}
          />
        </Route>
        <Route
          path="/student-help"
          element={
            <PrivateRoute2>
              <StudentLayout />
            </PrivateRoute2>
          }
        >
          {/* <Route path="" element={<TutorhelpMidsec />} /> */}
          <Route path="" element={<TutorDashboard />} />
          <Route path="dashboard" element={<TutorDashboard />} />
          <Route path="myupload" element={<TutorMyUpload />} />
          <Route path="myearnings" element={<TutorMyearnings />} />
          <Route path="mybalance" element={<TutorBalance />} />
          <Route
            path="ordersummary/mypuchasedOrder"
            element={<MypurchasedOrder />}
          />
          <Route path="mybookmarks" element={<TutorMybookmarks />} />
          <Route path="mybook" element={<TutorMyBook />} />
          <Route path="myquestion" element={<TutorMyquestion />} />
          <Route path="mypaymentmethods" element={<TutorPaymentmethod />} />
          <Route path="setting" element={<TutorSetting />} />
          <Route path="update-profile" element={<StudentUpdate />} />
          <Route path="add-document" element={<TutoraddDocument />} />
          <Route path="tutor-Bid-On-Ouestion" element={<BidSection />} />
          <Route path="BiddingList" element={<BiddingList />} />
          <Route path="Bidquestiondetails" element={<MyBidQuestionDetails />} />
          <Route path="hellosolution" element={<HelloSolution />} />
          <Route path="mybid" element={<MyBid />} />
          <Route path="ordersummary" element={<OrderDetails />} />
          <Route
            path="tutor-change-password"
            element={<TutorChangepassword />}
          />
          <Route path="become_a_tutor" element={<BecomeATutor />} />
        </Route>
        <Route
          path="/tutor-help/TutorProduct"
          element={<TutorProductDetail1 />}
        ></Route>
        <Route path="/tutor-help/tutorbook" element={<TutorbookDetail />} />
        <Route path="/tutor-help/tutor-list" element={<Totorlist />} />
        <Route
          path="/tutor-help/tutor-profile"
          element={<TotorProfile />}
        ></Route>
        <Route path="/tutor-help/tutor-book" element={<BookMiddle />}></Route>
        <Route
          path="/tutor-help/tutor-subject"
          element={<SubjectMiddleSection />}
        ></Route>
        <Route path="/my-cart" element={<Cart />}></Route>
      </Routes>

      <Fotter />
    </div>
  );
}

export default App;
export const socket = io.connect(`${BASE_IP}`);
