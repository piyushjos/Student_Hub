import React from 'react'
import PropTypes from 'prop-types'

function BlogSingle(props) {
  return (
    <div>
       <section class="section-middle">
      
      <div class="page-title">
      <div class="container">
        <div class="page-title-in">
          <h2>Single Blog</h2> 
        </div>
      </div>
    </div>

    <div class="container">
      <div class="blog-signle">
        <div class="blog-signle-img" data-aos="fade-in" data-aos-duration="500">
          {/*<img src="images/photo-14.jpg" alt=""/>*/}
          <img src={require('../images/photo-14.jpg')} alt="" />
        </div>

        <div class="blog-date-time">
          <div class="row">
            <div class="col-md-7">
              <div class="blog-date">
                Dec 31, 2019, <span>01:10 PM</span>
              </div>
            </div>

            <div class="col-md-5">
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
          <div class="blog-signle-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsus survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Lm has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
          </div>
      </div>

     <div class="next-prev-blog">
        <a href="#" class="btn">Previous Post</a> <a href="#" class="btn">Next Post</a>
      </div>
      
    </div>
   
  </section>

    </div>
  )
}



export default BlogSingle

