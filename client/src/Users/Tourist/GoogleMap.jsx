import React from "react";

function GoogleMap({ mapLink }) {
  return (
    <iframe
      title="Google Map"
      width="100%"
      height="100%" 
      src={mapLink}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  );
}

export default GoogleMap;