import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { PieChart, gaugeClasses, BarChart, Gauge } from "@mui/x-charts";

import { useSelector, useDispatch } from "react-redux";
import {
  useGetAgencyQuery,
  useGetAllToursQuery,
} from "../../Services/Agency/agencyApi";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";

import Loader from "../../Utils/Loader";
import LeftDrawer from "../../Utils/LeftDrawer";
import TopBar from "../../Utils/TopBar";
import { useAnalytic } from "../../Utils/analyticCalc-Hook";
import { addTours } from "../../Redux/Features/agencySlice";
import { lightGreen } from "@mui/material/colors";

function AgencyAnalytics() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  //Hooks
  const { setItem, getItem } = useLocalStorage("access_token");
  const { setItem: setRefItem, getItem: getRefItem } =
    useLocalStorage("refresh_token");
  const [dataState, setDataState] = useState(false);
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const accessToken = getItem();

  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(4);
  const [setSearchBar] = useState("");

  const navigate = useNavigate();
  const agency = useSelector((state) => state.agency);

  const {
    getToursSize,
    getActiveTours,
    getCompletedTours,
    getCancelledTours,
    getUpcomingTours,
    getSearchedTours,
    extractLocationFreq,
  } = useAnalytic();

  const percentage =
    getToursSize() !== 0 ? (getActiveTours().length / getToursSize()) * 100 : 0;

  console.log(percentage, getToursSize(), getActiveTours().length);
  // QUERY // MUTATIONS

  const {
    isLoading: isAgencyLoading,
    isError: agencyError,
    refetch,
  } = useGetAgencyQuery({ accessToken: accessToken });

  const { data: allTours, refetch: refetchTours } = useGetAllToursQuery({
    id: agency.authAgency.id,
    accessToken: accessToken,
  });

  useEffect(() => {
    dispatch(addTours(allTours.tours));
    const pastTours = getCompletedTours().concat(getCancelledTours());
    console.log(pastTours);
    setData(pastTours);
  }, []);
  // HANDLE MENU STATES
  const handleClick = (idx) => {
    setSelectedIdx(idx);
  };

  // HANDLE ERROR & SUCCESS RESPONSE
  if (agencyError) {
    console.log(agencyError);
    setItem("");
    navigate("/agency-login", { replace: true });
  }

  //LOADER LOGIC
  if (isAgencyLoading) return <Loader />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 999,
              backgroundColor: "#282828",
              color: "white",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Grid
                container
                sx={{
                  backgroundColor: "#1F1F1F",
                  height: "100vh",
                }}
              >
                <Grid item lg={12}>
                  <TopBar
                    setOpen={setOpen}
                    setSearchBar={setSearchBar}
                    show={true}
                    showBar={false}
                    searchType={""}
                  />
                  <LeftDrawer
                    open={open}
                    setOpen={setOpen}
                    handleClick={handleClick}
                    selectedIdx={selectedIdx}
                  />
                </Grid>
                <Grid item lg={3} sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      marginTop: "20%",
                      height: "calc(100vh - 11%)",
                      border: "2px solid white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    <PieChart
                      slotProps={{
                        legend: {
                          direction: "column",
                          position: { vertical: "top", horizontal: "right" },
                          padding: 0,

                          labelStyle: {
                            fontSize: "18px",
                            fontWeight: "bold",
                            fill: "white",
                          },
                        },
                      }}
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: getActiveTours().length,
                              label: "Active Tours",
                            },
                            {
                              id: 1,
                              value: getCompletedTours().length,
                              label: "Completed Tours",
                            },
                            {
                              id: 2,
                              value: getCancelledTours().length,
                              label: "Cancelled Tours",
                              color: "red",
                            },
                          ],
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                          color: "white",
                        },
                      ]}
                      width={600}
                      height={430}
                    />
                  </Box>
                </Grid>

                <Grid item lg={3} sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      marginTop: "20%",
                      padding: "20px",
                      height: "calc(100vh - 16%)",
                      border: "2px solid white",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      fontSize: "20px",
                    }}
                  >
                    <Gauge
                      //value={percentage}
                      value={getActiveTours().length}
                      valueMax={getToursSize()}
                      startAngle={-110}
                      endAngle={110}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                          transform: "translate(0px, 0px)",
                          fontWeight: "bold",
                          fill: "red",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "red",
                        },
                        [`& .${gaugeClasses.valueText} text`]: {
                          //fontWeight: "bold",
                          fill: "red",
                        },
                      }}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />

                    <Box component="div">RUNNING TOURS</Box>
                  </Box>
                </Grid>

                <Grid item lg={6} sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      marginTop: "10%",
                      height: "calc(100vh - 11%)",
                      border: "2px solid white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    <BarChart
                      sx={{ color: "white" }}
                      margin={{
                        left: 30,
                        right: 30,
                        top: 10,
                        bottom: 60,
                      }}
                      slotProps={{}}
                      xAxis={extractLocationFreq().xAxis}
                      series={extractLocationFreq().series}
                      width={680}
                      height={500}
                      bottomAxis={{
                        tickLabelStyle: {
                          fontSize: "12px",
                          color: "white",
                          fill: "white",
                          fontWeight: "bold",
                        },
                      }}
                      leftAxis={{
                        tickLabelStyle: {
                          fontSize: "16px",
                          color: "white",
                          fill: "white",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Typography>
      </ThemeProvider>
    </>
  );
}
export default AgencyAnalytics;
