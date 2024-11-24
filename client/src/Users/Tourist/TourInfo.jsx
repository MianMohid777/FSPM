import React from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { useGetTourByIDQuery } from "../../Services/Tour/tourApi";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";
import Loader from "../../Utils/Loader";

function TourInfo() {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetTourByIDQuery({ id });

  if (isError) {
    console.log("Error fetching tour:", isError);
    return <div>Error fetching tour information</div>;
  }

  if (isLoading) {
    console.log("Loading");
    return <Loader />;
  }

  // Check if data exists and has the nested tour object
  if (data && data.tour) {
    const tour = data.tour;
    return (
      <div>
        <div>Tour ID: {tour.tourLocationName}</div>
        {/* Render other tour details as needed */}
      </div>
    );
  }

  // If data is empty or doesn't contain the nested tour object, display a message indicating no tour found
  return <div>No tour found</div>;
}


export default TourInfo;
