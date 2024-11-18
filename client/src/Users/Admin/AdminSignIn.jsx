import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import {
  useAdminLoginMutation,
  useAdminRefreshTokenMutation,
} from "../../Services/Login/loginAPI";
import Loader from "../../Utils/Loader";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";

import Rectangle from "../../Assets/Karakoram.jpg";
import mahal from "../../Assets/mahal copy 2.svg";
import emailSvg from "../../Assets/email.svg";
import lock from "../../Assets/lock.svg";
import plane from "../../Assets/plane copy 2.svg";
import tower from "../../Assets/tower copy 2.svg";

function AdminSignIn() {
  const { setItem, getItem } = useLocalStorage("access_token");
  const { setItem: setRefItem, getItem: getRefItem } =
    useLocalStorage("refresh_token");
  const accessToken = getItem();
  const refreshToken = getRefItem();

  useEffect(() => {
    const checkLogIn = async () => {
      try {
        if (accessToken) {
          const res = await adminLogin({ accessToken: accessToken }).unwrap();
          console.log(res);

          if (res) navigate("/admin-dashboard");
        }
      } catch (err) {
        console.log(err);

        if (
          err.status === 401 &&
          err.data.message !== "Unauthorized User Access"
        ) {
          console.log("Going for Token Refresh");

          try {
            const response = await adminRefreshToken({
              refreshToken: refreshToken,
            }).unwrap();

            console.log(response);
            if (response) {
              setItem(response.accessToken);
              setRefItem(response.refreshToken);
              navigate("/admin-dashboard");
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    };

    checkLogIn();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [adminRefreshToken, { isLoading: refLoading }] =
    useAdminRefreshTokenMutation();

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  if (isLoading || refLoading) return <Loader />;

  const handleSubmit = async () => {
    if (!email.includes("@") || email.length === 0) {
      setError((prevError) => ({
        ...prevError,
        emailError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        emailError: false,
      }));
    }

    if (password.length === 0) {
      setError((prevError) => ({
        ...prevError,
        passwordError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        passwordError: false,
      }));
    }
    try {
      if (
        !error.emailError &&
        !error.passwordError &&
        email.length > 0 &&
        password.length > 0
      ) {
        const response = await adminLogin({
          email: email,
          password: password,
        }).unwrap();

        setItem(response.accessToken);
        setRefItem(response.refreshToken);
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Box
                component="img"
                src={Rectangle}
                alt=""
                style={{
                  width: "100%",
                  height: "100vh",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            container
            display="flex"
            direction="column"
            alignItems="center"
          >
            <Box
              component="div"
              sx={{ position: "relative", top: "70px", left: "240px" }}
            >
              <Box component="img" src={plane} alt="" />
            </Box>
            <Box component="div" sx={{ textAlign: "center", mt: 4 }}>
              <Box
                sx={{
                  fontSize: "72px",
                  color: "#D04929",
                  fontWeight: "bolder",
                }}
              >
                Welcome
              </Box>
              <Box
                sx={{
                  fontSize: "16px",
                  color: "#00000083",
                  fontWeight: "normal",
                }}
              >
                Login with your email
              </Box>
            </Box>

            <Box
              compomnent="div"
              sx={{ display: "flex", flexDirection: "column", mt: 3 }}
            >
              <TextField
                id="email"
                label="Email Address"
                variant="outlined"
                type="email"
                required
                error={error.emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={emailSvg} alt="" />
                    </InputAdornment>
                  ),
                }}
                margin="dense"
                color="warning"
                sx={{ width: "40ch" }}
                focused
                onChange={handleEmailChange}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                required
                error={error.passwordError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={lock} alt="" />
                    </InputAdornment>
                  ),
                }}
                margin="dense"
                color="warning"
                sx={{ mt: 5, width: "40ch" }}
                focused
                onChange={handlePasswordChange}
              />
            </Box>

            <Button
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 6,
                bgcolor: "#D04929",
                width: "125px",
                height: "48px",
                marginTop: "100px",
                "&:hover": {
                  bgcolor: "#831305",
                },
              }}
              onClick={handleSubmit}
            >
              LOGIN
            </Button>

            <Box
              component="Box"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                component="img"
                marginLeft={"7px"}
                src={mahal}
                alt=""
                sx={{ marginTop: "15%" }}
              />
              <Box
                component="img"
                marginRight={"7px"}
                src={tower}
                alt=""
                sx={{ marginTop: "15%" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Typography>
    </ThemeProvider>
  );
}

export default AdminSignIn;
