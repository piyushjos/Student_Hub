import React from 'react'


function TutorPaymentmethod(props) {
  return (
    <div class="col-md-9">
              <div class="uploads-right-area">
                  <div class="payment-mt">
                        <div class="uploads-right-top">
                            <div class="row">
                                <div class="col-md-8">
                                </div>
                                <div class="col-md-4">
                                <div class="uploads-top-right">
                                    <button class="btn">Add new card</button>
                                </div>
                                </div>
                            </div>
                        </div>
                      <div class="payment-main box-sh card card-body">
                          <form action="" class="payment-form">
                              <div class="row">

                                <div class="col-md-8">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="form-group">
                                                <label>Cart Name</label>
                                                <input type="text" class="form-control" placeholder="Cart Name" value=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="cart-group-img">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group cart-number">
                                                <label>Cart Number</label>
                                                <span><input maxlength="4" type="text" class="form-control" placeholder="****" value=""/></span>
                                                <span><input maxlength="4" type="text" class="form-control" placeholder="****" value=""/></span>
                                                <span><input maxlength="4" type="text" class="form-control" placeholder="****" value=""/></span>
                                                <span><input maxlength="4" type="text" class="form-control" placeholder="****" value=""/></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-7">
                                            <div class="form-group select-year">
                                                <label>Valid Till </label>
                                                <span>
                                                    <select class="form-control">
                                                        <option selected value=''>Select Month</option>
                                                        <option value='1'>Janaury</option>
                                                        <option value='2'>February</option>
                                                        <option value='3'>March</option>
                                                        <option value='4'>April</option>
                                                        <option value='5'>May</option>
                                                        <option value='6'>June</option>
                                                        <option value='7'>July</option>
                                                        <option value='8'>August</option>
                                                        <option value='9'>September</option>
                                                        <option value='10'>October</option>
                                                        <option value='11'>November</option>
                                                        <option value='12'>December</option>
                                                    </select>
                                                </span>
                                                <span>
                                                    <select class="form-control">
                                                        <option selected value=''>Select Year</option>
                                                        <option value='1'>2020</option>
                                                        <option value='2'>2021</option>
                                                        <option value='3'>2022</option>
                                                        <option value='4'>2023</option>
                                                        <option value='5'>2024</option>
                                                        <option value='6'>2025</option>
                                                        <option value='7'>2026</option>
                                                        <option value='8'>2027</option>
                                                        <option value='9'>2028</option>
                                                        <option value='10'>2029</option>
                                                        <option value='11'>2030</option>
                                                        <option value='12'>2031</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>CVV</label>
                                                <input maxlength="3" type="text" class="form-control" placeholder="***" value=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label></label>
                                                <div class="cart-group-img">
                                                    <img src="images/card-demo-img.png" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="deducted">
                                                $1 will be deducted for verification of card
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <input type="submit" class="btn" value="Save Card "/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </div>
                          </form>
                      </div>
                      <div class="payment-add-cart-items">
                          <ul>
                              <li>
                                  <div class="payment-add-cart-item box-sh card card-body">
                                      <div class="row">
                                          <div class="col-md-1">
                                              <div class="payment-add-left">
                                                  <span></span>
                                              </div>
                                          </div>
                                          <div class="col-md-8">
                                            <div class="payment-card-middle">
                                                <div class="card-img">
                                                    <img src="images/card-01.png" alt=""/>
                                                </div>
                                                <div class="payment-card-dtl">
                                                    <h4>Master Cart</h4>
                                                <h2>xxxx-xxxx-xxxx-2352</h2>
                                                </div>
                                            </div>
                                          </div>
                                          <div class="col-md-3">
                                            <div class="payment-card-right">
                                                <div class="payment-card-select">
                                                    <ul>
                                                        <li><a href="#"><img src="images/in-pay.png" alt=""/></a></li>
                                                        <li><a href="#" class="active"><img src="images/out-pay.png" alt=""/></a></li>
                                                    </ul>
                                                </div>
                                                <div class="subject-delete">
                                                    <a href="#" class="btn"><i class="far fa-trash-alt"></i></a>
                                                </div>
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                              </li>
                              <li>
                                <div class="payment-add-cart-item box-sh card card-body">
                                    <div class="row">
                                        <div class="col-md-1">
                                            <div class="payment-add-left">
                                                <span></span>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                          <div class="payment-card-middle">
                                              <div class="card-img">
                                                  <img src="images/card-02.png" alt=""/>
                                              </div>
                                              <div class="payment-card-dtl">
                                                  <h4>Visa Cart</h4>
                                              <h2>xxxx-xxxx-xxxx-4245</h2>
                                              </div>
                                          </div>
                                        </div>
                                        <div class="col-md-3">
                                          <div class="payment-card-right">
                                              <div class="payment-card-select">
                                                  <ul>
                                                      <li><a href="#" class="active"><img src="images/in-pay.png" alt=""/></a></li>
                                                      <li><a href="#"><img src="images/out-pay.png" alt=""/></a></li>
                                                  </ul>
                                              </div>
                                              <div class="subject-delete">
                                                  <a href="#" class="btn"><i class="far fa-trash-alt"></i></a>
                                              </div>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                          </ul>
                      </div>
                  </div>
              </div>
            </div>
  )
}



export default TutorPaymentmethod

