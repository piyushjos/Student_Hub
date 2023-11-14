import React from 'react'
import PropTypes from 'prop-types'

function TutorBalance(props) {
  return (
    <div class="col-md-9">
              <div class="uploads-right-area">
                 <div class="uploads-right-top">
                     <div class="row">
                         <div class="col-md-8">
                            <div class="uploads-top-left">
                              <span class="date-picker">
                                <input type="text" class="form-control" name="daterange" value="01/01/2018 - 01/15/2018" />
                              </span>
                              <span class="select-picker">
                                <select class="selectpicker" data-live-search="true">
                                  <option value="" selected="">Topic / Sub topic</option>
                                  <option value="">Biology</option>
                                  <option value="">Business</option>
                                  <option value="">Chemistry</option>
                                  <option value="">Psychology</option>
                                  <option value="">Biology</option>
                                  <option value="">Business</option>
                                  <option value="">Chemistry</option>
                                  <option value="">Psychology</option>
                                </select>
                              </span>
                              <span class="date-select-btn">
                                <button class="btn">Search</button>
                              </span>
                            </div>
                         </div>
                         <div class="col-md-4">
                            <div class="uploads-top-right">
                              <a href="tutor-add-new-document.html" class="btn"><i class="fas fa-plus-circle"></i> Add new document</a>
                            </div>
                         </div>
                     </div>
                 </div>
                 <div class="uploads-right-main">
                    <div class="uploads-right-main-top">
                      <div class="row">
                        <div class="col-md-5">
                          <div class="up-ct">Uploads : 1-3 of 15</div>
                        </div>
                        <div class="col-md-7">
                          <div class="earnings-right">
                            <div class="earnings">Total Redeemption : <span>$210.00</span></div>
                            <div class="earnings">Current Balance : <span>$120.00</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="balance-right-table">
                        <table id="example" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="example_info">
                             <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Balance Amt</th>
                                    <th>Redeemed Amt</th>
                                    <th>Method</th>
                                    <th>Method</th>
                                    <th>Transaction Id</th>
                                </tr>
                             </thead>
                             <tbody>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="success">Success</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>PayPal</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="success">Success</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>PayPal</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="success">Success</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>PayPal</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="success">Success</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>PayPal</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="success">Success</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>Credit Card</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                                <tr>
                                    <td>24-12-2019</td>
                                    <td>$125.00</td>
                                    <td>$100.00</td>
                                    <td>PayPal</td>
                                    <td><span class="failure">Failure</span></td>
                                    <td>#1250362542</td>
                                </tr>
                             </tbody>
                         </table>
                    </div>
                 </div>
              </div>
            </div>    
    
  )
}



export default TutorBalance

