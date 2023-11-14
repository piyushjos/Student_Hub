import { React, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import constant from "../utils/constants";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";

function TutorDashboard(props) {
  const [upload, setUpload] = useState();
  const [order, setOrder] = useState();
  const [question, setQuestionCount] = useState();
  const [bookmark, setBookmark] = useState();
  const [bookmarkgraph, setBookmarkgraph1] = useState();
  const [uploadgraph, setUploagraph1] = useState();
  const [ordergraph, setOrdergraph] = useState();
  const [bookcount, setBookcount] = useState();
  const [bookcountgraph, setBookcountgraph] = useState();
  const [link, setLink] = useState(
    localStorage.getItem("role") == "tutor" ? "tutor-help" : "student-help"
  );
  const [falg, setFlag] = useState(true);

  let data = [
    ["month", "My_Documents", "My_order", "My_Bookmarks", "My_Book"],
    ["jan", 0, 0, 0, 0],
    ["feb", 0, 0, 0, 0],
    ["march", 0, 0, 0, 0],
    ["april", 0, 0, 0, 0],
    ["may", 0, 0, 0, 0],
    ["june", 0, 0, 0, 0],
    ["july", 0, 0, 0, 0],
    ["aug", 0, 0, 0, 0],
    ["sep", 0, 0, 0, 0],
    ["oct", 0, 0, 0, 0],
    ["nov", 0, 0, 0, 0],
    ["dec", 0, 0, 0, 0],
  ];

  console.log("0000000000", data[0]);
  const options = {
    chart: {
      title: "Graphical view of your data",
      subtitle: "Data is present in month by month manner",
    },
  };

  const submitForm = async () => {
    const Formdata = new FormData();
    Formdata.append("_id", localStorage.getItem("id"));

    await axios
      .post(`${constant.BASE_IP}/webapi/dashboardApi`, Formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("checkresponse for count", res);
        if (res.data.status === 200) {
          setUpload(res.data.myuploadCount);
          setOrder(res.data.OrderCount);
          setQuestionCount(res.data.myQuestioncount);
          setBookmark(res.data.MyBookmarksCount);
          setBookmarkgraph1(res.data.My_bookmark_count_for_graph1);
          setUploagraph1(res.data.My_document_count_for_graph1);
          setOrdergraph(res.data.My_order_count_for_graph1);
          setBookcount(res.data.bookcount);
          setBookcountgraph(res.data.My_book_count_for_graph1);
          setFlag(false);
          // props.handlecloseCourse();
        }
        if (res.data.status === 400) {
          console.log("res");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    submitForm();
  }, []);

  if (ordergraph !== undefined) {
    ordergraph.map((x) => {
      // console.log(x._id);
      // console.log(x.count);
      data[x._id].splice(2, 1, x.count);
    });
  }
  if (bookmarkgraph !== undefined) {
    bookmarkgraph.map((x) => {
      // console.log(x._id);
      // console.log(x.count);
      data[x._id].splice(3, 1, x.count);
    });
  }
  if (uploadgraph !== undefined) {
    uploadgraph.map((x) => {
      // console.log(x._id);
      // console.log(x.count);
      data[x._id].splice(1, 1, x.count);
    });
  }
  if (bookcountgraph !== undefined) {
    bookcountgraph.map((x) => {
      // console.log(x._id);
      // console.log(x.count);
      data[x._id].splice(4, 1, x.count);
    });
  }

  console.log("ordergraph", ordergraph);
  console.log("bookmarkgraph", bookmarkgraph);
  console.log("uploadgraph", uploadgraph);
  console.log("bookghraph", bookcount);

  return (
    <>
      <div class="col-md-9">
        <div class="dashboard-right-area">
          <div class="dashboard-right">
            <ul>
              <li>
                <Link to={`/${link}/myupload`}>
                  <div class="dashboard-box1">
                    <h3>{upload + bookcount}</h3>
                    <p>DocumentsUpload = {upload} </p>

                    <p>My Book_Upload = {bookcount} </p>
                  </div>
                  <div class="dashboard-box2">
                    <i class="fas fa-file-alt"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/${link}/myearnings`}>
                  <div class="dashboard-box1">
                    <h3>$120.00</h3>
                    <p>My Earnings</p>
                  </div>
                  <div class="dashboard-box2">
                    <i class="fas fa-dollar-sign"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/${link}/mybalance`}>
                  <div class="dashboard-box1">
                    <h3>$50.00</h3>
                    <p>Balances</p>
                  </div>
                  <div class="dashboard-box2">
                    <i class="fas fa-hand-holding-usd"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/${link}/ordersummary`}>
                  <div class="dashboard-box1">
                    <h3>{order}</h3>
                    <p>My Orders</p>
                  </div>
                  <div class="dashboard-box2">
                    <i class="fas fa-square-full"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/${link}/mybookmarks`}>
                  <div class="dashboard-box1">
                    <h3>{bookmark}</h3>
                    <p>My Bookmarks</p>
                  </div>
                  <div class="dashboard-box2">
                    <i class="fas fa-bookmark"></i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/${link}/myquestion`}>
                  <div class="dashboard-box1">
                    <h3>{question}</h3>
                    <p>My question</p>
                  </div>
                  <div class="dashboard-box2">
                    <i class="far fa-question-circle"></i>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div class="gra">
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
            {/* <img src={require("../images/gra.png")} alt="logo" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorDashboard;
