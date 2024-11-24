
import React, { useState } from 'react';
import "../../Styles/home.css";
import icon1 from "../../Assets/icon1.svg";
import icon2 from "../../Assets/cil_paper-plane.svg";
import icon3 from "../../Assets/carbon_hotel.svg";
import calender from "../../Assets/calender.svg";
import antChart from "../../Assets/ant-design_bar-chart-outlined.svg";
import carbonMap from "../../Assets/carbon_map.svg";
import gridIcons from "../../Assets/gridicons_history.svg";
import worldMap from "../../Assets/world_map_PNG28 2.svg";
import elipse from "../../Assets/Ellipse 13.svg";
import arrow from "../../Assets/ic_round-navigate-next.svg";
import rectangle25 from "../../Assets/Rectangle 25.jpg";
import locationIcon from "../../Assets/ep_location.svg";
import rectangle26 from "../../Assets/Rectangle 26.jpg";
import rectangle27 from "../../Assets/Rectangle 27.jpg";
import group7 from "../../Assets/Group 7.svg";
import group12 from "../../Assets/Group 12.svg";
import rectangle22 from "../../Assets/Group 11.svg";
import greece from "../../Assets/Rectangle 17 (1).jpg";
import options from "../../Assets/OPTIONS.svg";
import building from "../../Assets/building 1.svg";
import heart from "../../Assets/heart (6) 1.svg";
import mosque from "../../Assets/Mask Group.jpg";
import slider from "../../Assets/Group 3.svg";
import testimonialBackground from "../../Assets/image 22.jpg";
import profileImg from "../../Assets/person.jpg";
import Carousel from 'react-material-ui-carousel';
import sideimage from "../../Assets/image 30 (1).jpg";
import sideimage2 from "../../Assets/image 29.jpg";
import bird from "../../Assets/Vector.svg";
import icons from "../../Assets/Group 5.svg";


import background from "../../Assets/top-section-background.jpg";
import background1 from "../../Assets/top-section-background-1.jpg";
import background2 from "../../Assets/top-section-background-2.jpg";
import background3 from "../../Assets/top-section-background-3.jpg";

import Header from "./Header.jsx";
import Footer from './Footer.jsx';

const backgroundimages = [background, background1, background2, background3];

function Home() {

  const [activeButton, setActiveButton] = useState(null);

  const clickButton = (button) => {
    if (activeButton) {
      activeButton.classList.remove('clickedButton');
    }
    button.classList.add('clickedButton');
    setActiveButton(button);
  };

  const testimonials = [
    {
      profileImg: profileImg,
      text: "I've been using this product for a few weeks now, and I'm blown away by the results. It's exceeded all my expectations! Highly recommended.",
      name: "John Smith"
    },
    {
      profileImg: profileImg,
      text: "I was skeptical at first, but after trying this service, I'm a believer! It's incredibly user-friendly and has saved me so much time and hassle.",
      name: "Emily Johnson"
    },
    {
      profileImg: profileImg,
      text: "As a small business owner, I'm always looking for tools to streamline my workflow. This product has been a game-changer for me. Thank you!",
      name: "Michael Brown"
    }
  ];


  return (
    <>

      <div class="top-section">

      <Header />

        <section>
          <h1 class="heading1">Your imagination is only your limit</h1>
          <p class="paragraph1">We always try to make our customer Happy. We provide all kind of facilities.
            Your Satisfaction is our main priority</p>

          <a href="#"><p>Discover More</p></a>

        </section>

        <Carousel

          navButtonsAlwaysInvisible
          duration={500}
          animation='slide'


          IndicatorIcon={() => (
            <div>
            </div>
          )}

          indicatorIconButtonProps={{
            style: {
              width: '31.25px',
              height: '2.95px',
              background: '#FFFFFF',
              borderRadius: '39px',
              margin: '7px'
            }
          }}


          activeIndicatorIconButtonProps={{
            style: {
              width: '31.25px',
              height: '2.95px',
              background: '#DF6951',
              borderRadius: '39px'

            }
          }}

          indicatorContainerProps={{
            style: {
              position: 'absolute',
              top: '919px',
              zIndex: '1'

            }
          }} >

          {backgroundimages.map((backgroundImage, index) => (

            <div class="image-container"
              key={index}
              style={{
                width: '100%',
                height: '976px',
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.33), rgba(0, 0, 0, 0.33)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} >

            </div>
          ))}

        </Carousel>


      </div>

      <div class="services">
        <p id="heading">Our Services</p>

        <div class="service_cards">

          <div class="card1">

            <img src={icon1} width={46} height={27.26} />
            <p class="text1">Ticket Booking</p>
            <p class="text2">  We book all kind of national or international ticket for your destinaion. </p>

          </div>

          <div class="card2">

            <img src={icon3} width={46} height={27.26} />
            <p class="text1">Hotel Booking</p>
            <p class="text2">  You can easily book your according to your budget hotel by our website. </p>

          </div>


          <div class="card1">
            <img src={icon2} width={46} height={27.26} />
            <p class="text1" style={{ marginLeft: '30px' }}> Tour Planning</p>
            <p class="text2">  We provide you the best plan within a short time explore more. </p>
          </div>

        </div>



      </div>


      <div class="stats">
        <p class="heading">We always try to give you the best service</p>
        <p class="text">We always try to make our customer Happy. We provide all kind of facilities. Your Satisfaction is our main priority.</p>

        <div class="cards">

          <div class="card">
            <img src={calender} width={42} height={42} />
            <p class="figure">15+</p>
            <p class="description">Years of Experience</p>
          </div>

          <div class="card">
            <img src={antChart} width={42} height={42} />
            <p class="figure">15k+</p>
            <p class="description">Happy Travellers</p>
          </div>

          <div class="card">
            <img src={carbonMap} width={42} height={42} />
            <p class="figure">650+</p>
            <p class="description">Places Visited</p>
          </div>

          <div class="card">
            <img src={gridIcons} width={42} height={42} />
            <p class="figure">2k+</p>
            <p class="description">Travel History</p>
          </div>

        </div>

      </div>


      <div class="destinations">
        <p class="heading">Our Popular Destinations</p>

        <section>
          <div class="map">

            <img src={elipse} id="elipse1" />
            <img src={elipse} id="elipse2" />
            <img src={elipse} id="elipse3" />

          </div>

          <div class="cards">

            <a href="#" class="card">
              <div id="image1">

              </div>

              <p class="country">Thailand</p>
              <p class="decr">20+ Spots 2D & 3N</p>

              <img src={arrow} />
            </a>

            <a href="#" class="card">
              <div id="image2">

              </div>

              <p class="country">Indonesia</p>
              <p class="decr">25+ Spots 3D & 3N</p>

              <img src={arrow} />
            </a>

            <a href="#" class="card">
              <div id="image3">

              </div>

              <p class="country">New Zeland</p>
              <p class="decr">20+ Spots 3D & 2N</p>

              <img src={arrow} />
            </a>

          </div>

        </section>

      </div>


      <div class="best_packages">
        <p>Best Packages for you</p>

        <div className="options">
          <button onClick={(e) => clickButton(e.target)}>Hot Deals</button>
          <button onClick={(e) => clickButton(e.target)}>Backpack</button>
          <button onClick={(e) => clickButton(e.target)}>South Asia</button>
          <button onClick={(e) => clickButton(e.target)}>Honeymoon</button>
          <button onClick={(e) => clickButton(e.target)}>Europe</button>
          <button onClick={(e) => clickButton(e.target)}>More</button>
        </div>

        <div class="packages">
          <div class="package">
            <img src={rectangle25} />
            <div class="description">
              <p class="text1">3 Days, 2 Nights</p>
              <p class="text2">$500 / Person</p>
              <p class="text3">Explore the Beauty of the island for 3 days and 2 nights with our travel agency</p>
              <img src={locationIcon} />
              <p class="text4">Indonesia</p>
              <a href="#">Know More</a>
            </div>
          </div>

          <div class="package">
            <img src={rectangle26} />
            <div class="description">
              <p class="text1">3 Days, 2 Nights</p>
              <p class="text2">$800 / Person</p>
              <p class="text3">Enjoy the Shrimes and blossoms here in this beautiful country</p>
              <img src={locationIcon} />
              <p class="text4">Japan</p>
              <a href="#">Know More</a>
            </div>
          </div>

          <div class="package">
            <img src={rectangle27} />
            <div class="description">
              <p class="text1">3 Days, 2 Nights</p>
              <p class="text2">$600 / Person</p>
              <p class="text3">Explore the majestic mountains and landscapes day and nights</p>
              <img src={locationIcon} />
              <p class="text4">Mountains</p>
              <a href="#">Know More</a>
            </div>
          </div>

        </div>

        <a class="discover" href="#"><p>Discover More</p></a>

      </div>

      <div class="steps">
        <p class="heading">Book Your Next Trip in 3 Easy Steps</p>
        <p class="note">Easy and Fast</p>
        <section>
          <div class="steps_cards">
            <div class="card">
              <img src={group7} />
              <p class="title">Choose Destination</p>
              <p class="text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. </p>
            </div>
            <div class="card">
              <img src={group12} />
              <p class="title">Make Payment</p>
              <p class="text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. </p>
            </div>
            <div class="card">
              <img src={rectangle22} />
              <p class="title">Reach Airport on Date</p>
              <p class="text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. </p>
            </div>
          </div>

          <div class="container">

            <div class="card">
              <img class="poster" src={greece} />
              <p class="title">Trip To Greece</p>
              <p class="text">14-29 June | by Robbin joseph</p>
              <img class="options" src={options} />
              <img class="building" src={building} />
              <p class="text1">24 people going</p>
              <img class="heart" src={heart} />
            </div>

            <div class="small-card">
              <img class="poster" src={mosque} />
              <p class="text">Ongoing</p>
              <p class="text1">Trip to rome</p>
              <p class="text2">40% completed</p>
              <img class="slider" src={slider} />
            </div>

          </div>
        </section>
      </div>

      <div class="testimonials">

        <p class="heading">What People Say About Us</p>

        <img class="sideimage" src={sideimage} />
        <img class="sideimage2" src={sideimage2} />
        <img class="bird" src={bird} />

         {/* <img className='backgroundimg' src={testimonialBackground} /> */}
         <div class='container'>
         <div class="card">
        <Carousel indicators={true} navButtonsAlwaysInvisible duration={50} slider 
         indicatorContainerProps={{
          style: {
            marginTop: '20px'
          }
        }}
        indicatorIconButtonProps={{
          style: {
           color: 'white'
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
           color: 'black'

          }
        }}
        >
          {testimonials.map((testimonial, index) => (

                <div key={index}>
                  <p class="text">{testimonial.text}</p>
                  <p class="name">-{testimonial.name}</p>
                  </div>
          ))}
        </Carousel>
        </div>
        </div>
          

      </div>

      <div class="subscription">
        <div class="container">
          <img src={icons} />
          <p class="heading">Subscribe to get information, latest news and other interesting offers about Cobham</p>
          <input type="text" placeholder='Enter your email' />
          <button><p>Subscribe</p></button>


        </div>
      </div>

     <Footer />

    </>
  );
}



export default Home;
