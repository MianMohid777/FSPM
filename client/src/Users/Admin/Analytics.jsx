import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

import {
  useGetAllAgencyQuery,
  useGetAdminQuery,
  useLogoutMutation,
} from "../../Services/Agency/agencyApi";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";

import logOutIcon from "../../Assets/logout.png";
import home from "../../Assets/home.svg";
import analytic from "../../Assets/analytic.png";
import error from "../../Assets/error.png";

import Loader from "../../Utils/Loader";
import ApplicationCard from "../../Utils/ApplicationCard";

function Analytics() {
  //Hooks
  const { setItem, getItem } = useLocalStorage("access_token");
  const [selectedIdx, setSelectedIdx] = useState(1);
  const navigate = useNavigate();

  const accessToken = getItem();

  // QUERY // MUTATIONS

  const { isLoading: isAdminLoading, isError: adminError } = useGetAdminQuery({
    accessToken: accessToken,
  });

  const [logout, { isLoading: logoutLoading, isError: logoutError }] =
    useLogoutMutation({ accessToken: accessToken });

  // REFETCHING API

  // THEME
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  // HANDLE ERROR RESPONSE

  if (adminError) {
    console.log(adminError);
    navigate("/admin-login", { replace: true });
  }

  // HANDLE MENU STATES
  const handleClick = (idx) => {
    setSelectedIdx(idx);
  };

  const handleLogout = async () => {
    try {
      const response = await logout({ accessToken: accessToken });

      if (response) {
        setItem("");
        console.log("Logged out");
        navigate("/admin-login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //LOADER LOGIC
  if (logoutLoading) return <Loader />;

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Grid container bgcolor={"#C5E8EE"} sx={{ minheight: "100vh" }}>
          <Grid item lg={2}>
            <Drawer
              open={true}
              sx={{
                width: "18%",
                maxHeight: "50%",

                "& .MuiDrawer-paper": {
                  width: "18%",
                  boxSizing: "border-box",
                  bgcolor: "#FFFFFF",
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Box
                component="img"
                sx={{
                  width: "90%",
                  height: "20%",
                  borderRadius: "30px",
                  margin: "10px",
                }}
              />
              <Toolbar>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemButton
                      selected={selectedIdx === 0}
                      onClick={() => {
                        handleClick(0);
                        navigate("/admin-dashboard", { replace: true });
                      }}
                    >
                      <ListItemIcon sx={{ width: "50px", height: "30px" }}>
                        <Box component="img" src={home} alt="home" />
                      </ListItemIcon>
                      <ListItemText primary="Home"></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toolbar>
              <Toolbar>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemButton
                      selected={selectedIdx === 1}
                      onClick={() => {
                        handleClick(1);
                      }}
                    >
                      <ListItemIcon sx={{ width: "50px", height: "30px" }}>
                        <Box component="img" src={analytic} alt="Analytic" />
                      </ListItemIcon>

                      <ListItemText primary="Analytics"></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toolbar>
              <Toolbar>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemButton
                      selected={selectedIdx === 2}
                      onClick={() => {
                        handleClick(2);
                        handleLogout();
                      }}
                    >
                      <ListItemIcon sx={{ width: "50px", height: "30px" }}>
                        <Box component="img" src={logOutIcon} alt="logout" />
                      </ListItemIcon>
                      <ListItemText primary="Log Out"></ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toolbar>
            </Drawer>
          </Grid>

          <Grid
            item
            lg={10}
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "5%",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Box sx={{ fontWeight: "bolder", fontSize: "50px" }}>Analytics</Box>

            <Box component="div" sx={{ marginTop: "30px" }}>
              <Box
                component="img"
                src={error}
                sx={{
                  marginTop: "50%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Typography>
    </ThemeProvider>
  );
}

export default Analytics;
