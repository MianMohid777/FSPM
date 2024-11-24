import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer,
  ThemeProvider,
  Typography,
  createTheme,
  IconButton,
  InputBase,
} from "@mui/material";

import Menu from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import HistoryIcon from "@mui/icons-material/History";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import CreatePost from "@mui/icons-material/EditCalendar";

import DP from "../../Assets/Karakoram.jpg";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAgencyQuery,
  useGetAllToursQuery,
} from "../../Services/Agency/agencyApi";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";

import Loader from "../../Utils/Loader";
import { addTours } from "../../Redux/Features/agencySlice";
import TourPost from "../../Utils/TourPost";

function Test() {
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

  const accessToken = getItem();
  const refreshToken = getRefItem();

  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchBar, setSearchBar] = useState("");
  const [color, setColor] = useState({
    dash: "#FF4E45",
    profile: "white",
    ads: "white",
    history: "white",
    stats: "white",
    settings: "white",
  });

  const navigate = useNavigate();
  const agency = useSelector((state) => state.agency);
  const dispatch = useDispatch();

  // QUERY // MUTATIONS

  const { data, isLoading, isError, isSuccess, refetch } = useGetAllToursQuery({
    id: agency.authAgency.id,
    accessToken: accessToken,
  });

  const { isLoading: isAgencyLoading, isError: agencyError } =
    useGetAgencyQuery({ accessToken: accessToken });

  // HANDLE MENU STATES
  const handleClick = (idx) => {
    setSelectedIdx(idx);
  };

  // HANDLE ERROR & SUCCESS RESPONSE
  if (isError || agencyError) {
    console.log("Its GET TOURS API ERROR", isError);
    console.log(agencyError);
    navigate("/agency-login", { replace: true });
  }

  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log(data.tours);
      console.log("Dispatched");
      dispatch(addTours(data?.tours));
    }
  }, [data]);

  //LOADER LOGIC
  if (isLoading || isAgencyLoading) return <Loader />;

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
                sx={{ backgroundColor: "#1F1F1F", height: "100vh" }}
              >
                <Grid item lg={12}>
                  <AppBar
                    sx={{
                      bgcolor: "#282828",
                      height: "10%",
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton sx={{ margin: "20px", borderRadius: "0px" }}>
                        <Menu
                          fontSize="medium"
                          sx={{ color: "white" }}
                          onClick={() => setOpen(!open)}
                        />
                      </IconButton>
                      <Box
                        component="div"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexBasis: "100%",
                          marginLeft: "15%",
                        }}
                      >
                        <InputBase
                          sx={{
                            width: "60%",
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "white",
                            border: "1px solid white",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                          placeholder="Search Active Ads"
                          autoFocus={true}
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                          }
                          onChange={(e) => {
                            setSearchBar(e.target.value);
                          }}
                        />
                      </Box>

                      <IconButton
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "50px",
                          color: "white",
                          border: "1px solid white",
                          borderRadius: "0px",
                          gap: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}
                        onClick={() => {
                          navigate("/current-agency/create-tour");
                        }}
                      >
                        <CreatePost
                          fontSize="large"
                          sx={{ color: "#FF4E45" }}
                        />

                        <Box component="div" fontSize={16} fontWeight={700}>
                          CREATE
                        </Box>
                      </IconButton>
                    </Box>
                  </AppBar>
                  <Drawer
                    open={open}
                    sx={{
                      boxSizing: "border-box",

                      "& .MuiDrawer-paper": {
                        width: "20%",
                        boxSizing: "border-box",
                        backgroundColor: "#282828",
                        color: "#FF4E45",
                      },
                    }}
                    variant="temporary"
                    anchor="left"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        ml: "auto",
                        mt: 1,
                        mr: 2,
                        cursor: "pointer",
                      }}
                      onClick={() => setOpen(!open)}
                    >
                      <CloseIcon sx={{ color: "white" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 0.5,
                        mt: 3,
                      }}
                    >
                      <Divider />
                      <List sx={{ width: "100%" }}>
                        <ListItem sx={{ padding: "0" }}>
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "black",
                                "&:hover": {
                                  backgroundColor: "black",
                                },
                                color: "#FF4E45",
                              },
                              "&:hover": {
                                backgroundColor: "black",
                              },
                              color: "white",
                            }}
                            selected={selectedIdx === 0}
                            onClick={() => {
                              handleClick(0);
                              setColor((prevColor) => ({
                                ...prevColor,
                                dash: "#FF4E45",
                              }));
                            }}
                            onBlur={() => {
                              setColor((prevColor) => ({
                                ...prevColor,
                                dash: "white",
                              }));
                            }}
                          >
                            <ListItemIcon>
                              <DashboardIcon sx={{ color: color.dash }} />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"></ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>

                      <Divider />
                      <List sx={{ width: "100%" }}>
                        <ListItem sx={{ padding: "0" }}>
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "black",
                                "&:hover": {
                                  backgroundColor: "black",
                                },
                                color: "#FF4E45",
                              },
                              "&:hover": {
                                backgroundColor: "black",
                              },
                              color: "white",
                            }}
                            selected={selectedIdx === 1}
                            onClick={() => {
                              handleClick(1);
                              setColor((prevColor) => ({
                                ...prevColor,
                                profile: "#FF4E45",
                              }));
                            }}
                            onBlur={() => {
                              setColor((prevColor) => ({
                                ...prevColor,
                                profile: "white",
                              }));
                            }}
                          >
                            <ListItemIcon>
                              <StoreIcon sx={{ color: color.profile }} />
                            </ListItemIcon>

                            <ListItemText primary="Agency Profile"></ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>

                      <Divider />
                      <List sx={{ width: "100%" }}>
                        <ListItem sx={{ padding: "0" }}>
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "black",
                                "&:hover": {
                                  backgroundColor: "black",
                                },
                                color: "#FF4E45",
                              },
                              "&:hover": {
                                backgroundColor: "black",
                              },
                              color: "white",
                            }}
                            selected={selectedIdx === 2}
                            onClick={() => {
                              handleClick(2);
                              setColor((prevColor) => ({
                                ...prevColor,
                                ads: "#FF4E45",
                              }));
                            }}
                            onBlur={() => {
                              setColor((prevColor) => ({
                                ...prevColor,
                                ads: "white",
                              }));
                            }}
                          >
                            <ListItemIcon>
                              <DynamicFeedIcon sx={{ color: color.ads }} />
                            </ListItemIcon>
                            <ListItemText primary="Active Ads"></ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>

                      <Divider />
                      <List sx={{ width: "100%" }}>
                        <ListItem sx={{ padding: "0" }}>
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "black",
                                "&:hover": {
                                  backgroundColor: "black",
                                },
                                color: "#FF4E45",
                              },
                              "&:hover": {
                                backgroundColor: "black",
                              },
                              color: "white",
                            }}
                            selected={selectedIdx === 3}
                            onClick={() => {
                              handleClick(3);
                              setColor((prevColor) => ({
                                ...prevColor,
                                history: "#FF4E45",
                              }));
                            }}
                            onBlur={() => {
                              setColor((prevColor) => ({
                                ...prevColor,
                                history: "white",
                              }));
                            }}
                          >
                            <ListItemIcon>
                              <HistoryIcon sx={{ color: color.history }} />
                            </ListItemIcon>
                            <ListItemText primary="Ads History"></ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>

                      <Divider />
                      <List sx={{ width: "100%" }}>
                        <ListItem sx={{ padding: "0" }}>
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "black",
                                "&:hover": {
                                  backgroundColor: "black",
                                },
                                color: "#FF4E45",
                              },
                              "&:hover": {
                                backgroundColor: "black",
                              },
                              color: "white",
                            }}
                            selected={selectedIdx === 4}
                            onClick={() => {
                              handleClick(4);
                              setColor((prevColor) => ({
                                ...prevColor,
                                stats: "#FF4E45",
                              }));
                            }}
                            onBlur={() => {
                              setColor((prevColor) => ({
                                ...prevColor,
                                stats: "white",
                              }));
                            }}
                          >
                            <ListItemIcon>
                              <QueryStatsIcon sx={{ color: color.stats }} />
                            </ListItemIcon>
                            <ListItemText primary="Analytics"></ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>

                      <Divider />
                      <List sx={{ width: "100%" }}>
                        <ListItem sx={{ padding: "0" }}>
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "black",
                                "&:hover": {
                                  backgroundColor: "black",
                                },
                                color: "#FF4E45",
                              },
                              "&:hover": {
                                backgroundColor: "black",
                              },
                              color: "white",
                            }}
                            selected={selectedIdx === 5}
                            onClick={() => {
                              handleClick(5);
                              setColor((prevColor) => ({
                                ...prevColor,
                                settings: "#FF4E45",
                              }));
                            }}
                            onBlur={() => {
                              setColor((prevColor) => ({
                                ...prevColor,
                                settings: "white",
                              }));
                            }}
                          >
                            <ListItemIcon>
                              <SettingsIcon sx={{ color: color.settings }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings"></ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Box>
                  </Drawer>
                </Grid>
                <Grid item lg={3} sx={{ height: "100%" }}>
                  <Box
                    component="div"
                    sx={{
                      backgroundColor: "#282828",
                      width: "85%",
                      height: "100vh",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        marginTop: "40%",
                      }}
                      src={DP}
                    />
                    <Box
                      component="div"
                      mt={2}
                      sx={{ color: "white", fontSize: "22px", fontWeight: 700 }}
                    >
                      Your Agency
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        color: "#AAAAAA",
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      {agency.authAgency.name}
                    </Box>

                    {/* Company Info */}

                    <Box
                      component="div"
                      sx={{
                        border: "1px solid white",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "10px",
                        margin: "10px",
                        marginTop: "20px",
                        borderRadius: "5px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Box
                        component="div"
                        mt={1}
                        sx={{
                          fontSize: "18px",
                          fontWeight: 800,
                          textAlign: "center",
                        }}
                      >
                        Company Information
                      </Box>
                      <Box component="div" mt={2}>
                        Admin Name:
                        <Box
                          component="span"
                          sx={{
                            color: "#AAAAAA",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {"  "}
                          {agency.authAgency.adminName}
                        </Box>
                      </Box>
                      <Box component="div">
                        Company Email:
                        <Box
                          component="span"
                          sx={{
                            color: "#AAAAAA",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {"  "}
                          {agency.authAgency.email}
                        </Box>
                      </Box>
                      <Box component="div">
                        Company NTN:
                        <Box
                          component="span"
                          sx={{
                            color: "#AAAAAA",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {"  "}
                          {agency.authAgency.ntn}
                        </Box>
                      </Box>
                      <Box component="div">
                        Company License:
                        <Box
                          component="span"
                          sx={{
                            color: "#AAAAAA",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {"  "}
                          {agency.authAgency.license}
                        </Box>
                      </Box>
                      <Box component="div">
                        Office Address:
                        <Box
                          component="span"
                          sx={{
                            color: "#AAAAAA",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {"  "}
                          {agency.authAgency.address}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item lg={9} sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      marginTop: "10%",
                      padding: "20px",
                      height: "calc(100vh - 20%)",
                      overflowY: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignContent: "flex-start",
                      gap: "50px",
                    }}
                  >
                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={"http://localhost:3002/api/static/Space.jpg"}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
                    />

                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={DP}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
                    />

                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={DP}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
                    />
                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={DP}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
                    />
                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={DP}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
                    />
                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={DP}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
                    />
                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={DP}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
                    />
                    <TourPost
                      agencyName={agency.authAgency.name}
                      img={DP}
                      locationName={"Hunza"}
                      info={
                        "Voluptate fugiat nulla laboris nisi consequat sit voluptate pariatur laborum reprehenderit do. Aute ullamco reprehenderit cillum deserunt ullamco elit laboris minim. Duis est ullamco irure magna dolore est irure dolor anim occaecat ipsum culpa."
                      }
                      price={10000}
                      startDate={"1/5/2024"}
                      endDate={"5/5/2024"}
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

export default Test;
