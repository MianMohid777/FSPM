import { useSelector } from "react-redux";

export const useAnalytic = () => {
  const agency = useSelector((state) => state.agency);
  const tours = agency.allTours;

  //console.log(tours);

  const getToursSize = () => {
    console.log(tours.length);
    return tours.length;
  };
  const getActiveTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Active");
  };
  const getCompletedTours = () => {
    console.log(tours);
    return tours.filter((tour) => tour.tourStatus === "Completed");
  };

  const getCancelledTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Cancelled");
  };

  const getUpcomingTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Upcoming");
  };

  const getRegOpenTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Registrations-Opened");
  };

  const getSearchedTours = (search, status) => {
    if (status === "All") {
      console.log(search);
      return tours.filter((tour) =>
        tour.tourLocationName
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      );
    } else if (status === "Past") {
      return tours.filter(
        (tour) =>
          (tour.tourStatus === "Completed" ||
            tour.tourStatus === "Cancelled") &&
          tour.tourLocationName
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
    } else if (status === "Available") {
      return tours.filter(
        (tour) =>
          (tour.tourStatus === "Upcoming" ||
            tour.tourStatus === "Registrations-Opened") &&
          tour.tourLocationName
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
    } else {
      return tours.filter(
        (tour) =>
          tour.tourStatus === status &&
          tour.tourLocationName
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
    }
  };
  const extractLocationFreq = () => {
    const locationCounts = {};

    tours.forEach((tour) => {
      const location = tour.tourLocationName;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });

    const locations = Object.keys(locationCounts);
    const counts = Object.values(locationCounts);

    const seriesData = [{ data: counts }];

    return {
      xAxis: [{ scaleType: "band", data: locations }],
      series: seriesData,
    };
  };
  return {
    getToursSize,
    getActiveTours,
    getCompletedTours,
    getCancelledTours,
    getUpcomingTours,
    getSearchedTours,
    getRegOpenTours,
    extractLocationFreq,
  };
};
