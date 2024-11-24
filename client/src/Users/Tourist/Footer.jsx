import React from "react";
import socialLink1 from "../../Assets/Social.svg";
import socialLink2 from "../../Assets/icons8-pinterest.svg";
import googlePlay from "../../Assets/Google Play.svg";
import playStore from "../../Assets/Play Store.svg";
import "../../Styles/Footer.css";

function Footer() {
  return (
    <footer>
      <div class="container">
        <div class="container1">
          <p class="text">Travel</p>
          <p class="text">Goo</p>
          <p class="text2">
            Book your trip in minute, get full Control for much longer.
          </p>
        </div>

        <div class="container2">
          <p class="heading">Company</p>
          <p class="text2">About</p>
          <p class="text2">Careers</p>
          <p class="text2">Mobile</p>
        </div>

        <div class="container2">
          <p class="heading">Contact</p>
          <p class="text2">Help/FAQ</p>
          <p class="text2">Press</p>
          <p class="text2">Affilates</p>
        </div>

        <div class="container2">
          <p class="heading">More</p>
          <p class="text2">Airlinefees</p>
          <p class="text2">Airline</p>
          <p class="text2">Low fare tips</p>
        </div>

        <div class="container2">
          <div class="row">
            <img src={socialLink1} />
            <img src={socialLink2} />
          </div>
          <div class="row">
            <p class="text2">Discover our app</p>
          </div>
          <div class="row">
            <img src={googlePlay} />
            <img src={playStore} style={{ marginLeft: "10px" }} />
          </div>
        </div>
      </div>

      <p class="footnote">All rights reserved@travelgoo.com</p>
    </footer>
  );
}

export default Footer;
