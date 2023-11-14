import React from 'react'
import PropTypes from 'prop-types'

function TutorMyorders(props) {
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
                              <button class="btn">Continue Shopping</button>
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
                        </div>
                      </div>
                    </div>
                    <div class="uploads-right-main-items">
                        <div class="uploads-right-main-item box-sh card card-body">
                          <div class="row">
                            <div class="col-md-2">
                              <div class="uploads-item-img">
                                 <img src={require('../images/businessTextbook.jpg')} alt="" />
                              </div>
                            </div>
                            <div class="col-md-7">
                              <div class="uploads-item-cont">
                                <div class="uploads-item-title">NR 507 FINAL EXAM(3 DIFFERENT VERSIONS) PLUS STUDY GUIDES</div>
                                <div class="uploads-item-dtls">
                                  <div class="uploads-item-dtls-left">
                                    <div class="uploads-item-price">$ <span>149.00</span></div>
                                    <div class="uploads-item-author">
                                        <p><a href="tutor-profile.html">Author Name</a></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="uploads-item-right">
                                <div class="downloas-item-btn btnt">
                                    <a href="#" class="btn"><span>Download</span> <i class="fas fa-download"></i></a>
                                </div>
                                <div class="reviews-stars">
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="uploads-right-main-item box-sh card card-body">
                          <div class="row">
                            <div class="col-md-2">
                              <div class="uploads-item-img">
                               {/*  <img src={require('../images/businessTextbook.jpg')} alt="" />*/}
                                <img src={require('../images/businessTextbook.jpg')} alt="" />
                              </div>
                            </div>
                            <div class="col-md-7">
                              <div class="uploads-item-cont">
                                <div class="uploads-item-title">NR 507 FINAL EXAM(3 DIFFERENT VERSIONS) PLUS STUDY GUIDES</div>
                                <div class="uploads-item-dtls">
                                  <div class="uploads-item-dtls-left">
                                    <div class="uploads-item-price">$ <span>149.00</span></div>
                                    <div class="uploads-item-author">
                                        <p><a href="tutor-profile.html">Author Name</a></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="uploads-item-right">
                                <div class="downloas-item-btn btnt">
                                    <a href="#" class="btn"><span>Download</span> <i class="fas fa-download"></i></a>
                                </div>
                                <div class="reviews-stars">
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="uploads-right-main-item box-sh card card-body">
                          <div class="row">
                            <div class="col-md-2">
                              <div class="uploads-item-img">
                                 <img src={require('../images/businessTextbook.jpg')} alt="" />
                              </div>
                            </div>
                            <div class="col-md-7">
                              <div class="uploads-item-cont">
                                <div class="uploads-item-title">NR 507 FINAL EXAM(3 DIFFERENT VERSIONS) PLUS STUDY GUIDES</div>
                                <div class="uploads-item-dtls">
                                  <div class="uploads-item-dtls-left">
                                    <div class="uploads-item-price">$ <span>149.00</span></div>
                                    <div class="uploads-item-author">
                                        <p><a href="tutor-profile.html">Author Name</a></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="uploads-item-right">
                                <div class="downloas-item-btn btnt">
                                    <a href="#" class="btn"><span>Download</span> <i class="fas fa-download"></i></a>
                                </div>
                                <div class="reviews-stars">
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star active"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="item-pagination">
                      <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li>
                      </ul>
                    </div>
                 </div>
              </div>
            </div>
    
  )
}


export default TutorMyorders

