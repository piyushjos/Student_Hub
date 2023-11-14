import React from 'react'
import PropTypes from 'prop-types'

function TutorSetting(props) {
  return (
    <div class="col-md-9">
    <div class="dashboard-right-area">
       <div class="notifications-area">
           <div class="sec-head"><h2>Notifications</h2></div>
           <div class="notifications-div box-sh card card-body">
               <h3>Enable Notifications </h3>
               <p>
                   <label><input type="radio" name="notification" /> <span>Yes</span></label>
                   <label><input type="radio" name="notification" /> <span>No</span></label>
               </p>
           </div>
       </div>
    </div>
  </div>

  )
}



export default TutorSetting

