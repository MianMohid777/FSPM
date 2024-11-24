import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "./ProfileCard";
import TourHistoryTable from "./TourHistoryTable";
import { Grid } from "@mui/material";
import ToursPerMonthBarChart from "./BarChart";
function Profile() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#FF4E45",
      },
      background: {
        default: "black", // Black background
      },
      text: {
        primary: "#FFF", // White text
      },
    },
  });

  return (
    <ThemeProvider theme={theme}  sx={{
      backgroundColor: theme.palette.background.default,
      color: "#FFF", // Set all text color to white
      minHeight: "100vh", // Use minHeight instead of height to ensure the container takes at least the height of the viewport
    }} >
        <Grid item  >
          {/* Profile Card */}
          <ProfileCard />
        </Grid>
        <Grid item >
          {/* Tour History Table */}
          <TourHistoryTable />
        </Grid>
        <Grid item >
          {/* Tours Per Month Bar Chart */}
          <ToursPerMonthBarChart />
          </Grid>
    </ThemeProvider>
  );
}

export default Profile;
