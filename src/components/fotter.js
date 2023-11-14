import React from 'react'


function fotter(props) {
  return (
    <div>
          <footer class="footer">
      <div class="main-footer">
        <div class="container">
          <div class="main-footer-inn">
            <div class="footer-logo">
              <span><img src={require('../images/logo.png')} alt=""/></span>
              
            </div>
            <div class="footer-menu">
              <ul>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="terms-and-services.html">Terms and Services</a></li>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="#">How it works</a></li>
                <li><a href="#">Trust and Quality</a></li>
                <li><a href="blog.html">Blog</a></li>
              </ul>
            </div>
            <div class="footer-social">
              <ul>
                <li class="facebook"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                <li class="twitter"><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li class="linkedin"><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                <li class="google-plus"><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="copy-right-footer">
        <div class="container">
          <div class="copy-ftr">
            Your copy right address here
          </div>
        </div>
      </div>
       </footer>

      
    </div>
  )
}

export default fotter

