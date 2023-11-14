import React from "react";
import StudenthelpNav from "./StudenthelpNav";

import { Outlet } from "react-router-dom";

function LayOut(props) {
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
              {<StudenthelpNav />}
              {<Outlet />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LayOut;
