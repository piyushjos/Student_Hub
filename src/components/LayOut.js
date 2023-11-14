import React from "react";
import TotorHelpNav from "./TutorhelpNav2";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import { Outlet } from "react-router-dom";

function LayOut(props) {
  // const [searchParams] = useSearchParams();
  // console.log("dufhsdkjfdskjfbh", searchParams);
  // const sampleLocation = useLocation();
  // console.log("pppppp", sampleLocation);
  // console.log("current URL 👉️", window.location.href);
  // console.log("current Pathname 👉️", window.location.pathname);

  return (
    <div>
      <section class="section-middle">
        <div class="page-title">
          <div class="container">
            <div class="page-title-in"></div>
          </div>
        </div>

        <div class="dashboard-content">
          <div class="container">
            <div class="row">
              {<TotorHelpNav />}
              {<Outlet />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LayOut;
