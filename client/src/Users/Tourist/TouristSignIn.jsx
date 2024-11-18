import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useGoogleSignInMutation,
  useLoginMutation,
} from "../../Services/Login/loginAPI";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import Loader from "../../Utils/Loader";
import { addAuthUser } from "../../Redux/Features/userSlice";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";
import { errorMesssage } from "../../Utils/errorMessages";

import Rectangle from "../../Assets/tourist-login.jpg";
import mahal from "../../Assets/mahal.svg";
import emailSvg from "../../Assets/email.svg";
import lock from "../../Assets/lock.svg";
import plane from "../../Assets/plane.svg";
import google from "../../Assets/google.svg";
import tower from "../../Assets/tower.svg";
import google2 from "../../Assets/google-hover.svg";

import ToastMessage from "../../Utils/Toast-Message";

function TouristSignIn() {
  //HOOKS
  const { setItem, getItem } = useLocalStorage("access_token");
  const { setItem: setRefItem } = useLocalStorage("refresh_token");
  const accessToken = getItem();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });
  const [svg, setSvg] = useState(google);
  const [gsi, setGsi] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const [googleSignIn, { isLoading: googleLoading }] =
    useGoogleSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get("message");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    console.log("Message:", message);
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    if (accessToken && refreshToken) {
      setItem(accessToken);
      setRefItem(refreshToken);
      setGsi(true);
    }
  }, []);

  useEffect(() => {
    const checkLogIn = async () => {
      try {
        const res = await login({ accessToken: accessToken }).unwrap();
        console.log(res);
        if (res) {
          dispatch(
            addAuthUser({
              email: res.email,
              id: res.id,
              name: res.name,
              access_token: accessToken,
            })
          );
          navigate("/home");
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkLogIn();
  }, [gsi]);

  // HANDLERS //////

  const handleMouseOver = () => {
    svg === google ? setSvg(google2) : setSvg(google);
  };
  const handleMouseOut = () => {
    svg === google2 ? setSvg(google) : setSvg(google2);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
        const response = await login({
          emailAddress: email,
          password: password,
        }).unwrap();

        dispatch(
          addAuthUser({
            email: email,
            id: response.id,
            name: response.name,
            access_token: response.accessToken,
            refresh_token: response.refreshToken,
          })
        );
        setToastMsg("Successfully Logged in!");
        setToastType("Success");
        setToast(true);
        handleToast();
        setItem(response.accessToken);
        setRefItem(response.refreshToken);
        navigate("/home");
      } else {
        setToastMsg(errorMesssage.INVALID_CREDENTIALS);
        setToastType("Error!");
        setToast(true);
        handleToast();
      }
    } catch (err) {
      console.log(err);
      setToastMsg(errorMesssage.INVALID_CREDENTIALS);
      setToastType("Error!");
      setToast(true);
      handleToast();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const gsi_url = await googleSignIn().unwrap();

      if (gsi_url) {
        window.location.href = gsi_url.url;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToast = () => {
    setTimeout(() => {
      setToast(false);
    }, 5000);
  };
  //THEME
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  //LOADER
  if (isLoading || googleLoading) return <Loader />;

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
            justifyContent="space-between"
          >
            <Box sx={{ textAlign: "center" }}>
              {" "}
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
                    color: "#00a651",
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
                  color="success"
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
                  color="success"
                  sx={{ mt: 5, width: "40ch" }}
                  focused
                  onChange={handlePasswordChange}
                />
              </Box>
              <Box
                component="div"
                sx={{
                  fontSize: "14px",
                  color: "#00000083",
                  fontWeight: "normal",
                  position: "relative",
                  left: "125px",
                  top: "20px",
                  cursor: "pointer",

                  "&:hover": {
                    color: "#009ee2",
                  },
                }}
              >
                Forgot your password?
              </Box>
              <Button
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 6,
                  bgcolor: "#00a651",
                  width: "125px",
                  height: "48px",
                }}
                onClick={handleSubmit}
              >
                LOGIN
              </Button>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  color: "#848383",
                  gap: "5px",
                  mt: 2,
                  justifyContent: "center",
                }}
              >
                <Box component="div">
                  <Divider sx={{ width: "100px", color: "#CCCCCC", mt: 1 }} />
                </Box>

                <Box
                  sx={{
                    fontSize: "14px",
                    color: "#000000",
                    fontWeight: "normal",
                  }}
                >
                  OR
                </Box>

                <Box component="div">
                  <Divider sx={{ width: "100px", color: "#CCCCCC", mt: 1 }} />
                </Box>
              </Box>
              <Box component="Box">
                <Box
                  component="img"
                  src={svg}
                  alt=""
                  sx={{ mt: 2 }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={handleGoogleSignIn}
                />
              </Box>
              <Box
                component="div"
                sx={{
                  mt: 1,
                  fontSize: "14px",
                  color: "#000000",
                  fontWeight: "normal",
                }}
              >
                Don't have account?
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#009ee2",
                    },
                  }}
                  onClick={() => {
                    navigate("/tourist-signup");
                  }}
                >
                  {" "}
                  Register Now
                </Box>
              </Box>
            </Box>

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
                sx={{}}
              />
              <Box
                component="img"
                marginRight={"7px"}
                src={tower}
                alt=""
                sx={{}}
              />
              <Box
                component="div"
                sx={{
                  position: "absolute",
                  left: "77%",
                  bottom: "20px",
                }}
              >
                {toast && (
                  <ToastMessage
                    message={toastMsg}
                    setToast={setToast}
                    type={toastType}
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Typography>
    </ThemeProvider>
  );
}

export default TouristSignIn;
