import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Box,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function LoginAsGroup() {
  const navigate = useNavigate();
  return (
    <div style={{}}>
      <ButtonGroup
        sx={{
          width: "50ch",
          padding: "15px",
          margin: "5px",
          backgroundColor: "rgb(21, 101, 192, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
        orientation="vertical"
        aria-label="Vertical button group"
        variant="contained"
      >
        <Button
          sx={{
            marginTop: "3%",
            marginBottom: "3%",
            height: "100%",
            fontSize: "18px",
            width: "100%",
          }}
          endIcon={<ArrowForwardIcon sx={{ width: "30px" }} />}
          onClick={() => {
            navigate("/tourist-login");
          }}
        >
          Login as Tourist
        </Button>
        <Button
          sx={{
            marginTop: "3%",
            marginBottom: "3%",
            height: "100%",
            fontSize: "18px",
            width: "100%",
          }}
          endIcon={<ArrowForwardIcon sx={{ width: "30px" }} />}
          onClick={() => {
            navigate("/agency-login");
          }}
        >
          Login as Tour Agency
        </Button>
        <Button
          sx={{
            marginTop: "3%",
            marginBottom: "3%",
            height: "100%",
            fontSize: "18px",
            width: "100%",
          }}
          endIcon={<ArrowForwardIcon sx={{ width: "30px" }} />}
          onClick={() => {
            navigate("/admin-login");
          }}
        >
          Login as Admin
        </Button>
      </ButtonGroup>
    </div>
  );
}

function ChooseLogin() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        {/* Main Grid */}
        <Grid
          container
          sx={{
            minHeight: "100vh",
          }}
        >
          {/* Grid Item: LHS Hero */}
          <Grid item xs={12} sm={6}>
            <img
              src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg5MTQ0MTctaW1hZ2Uta3d2eGNidHYuanBn.jpg"
              style={{
                width: "100%",
                height: "100vh",
                objectFit: "cover",
              }}
              alt="Travel Login"
            />
          </Grid>

          {/* Grid Item: RHS Page*/}
          <Grid
            container
            item
            xs={12}
            sm={6}
            alignItems={"center"}
            direction={"column"}
            justifyContent={"space-between"}
            sx={{
              padding: 10,
            }}
          >
            <div />

            <Grid
              container
              justify="center"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "100%",
              }}
            >
              <Box component="div" sx={{ textAlign: "center", mt: 4 }}>
                <Box
                  sx={{
                    fontSize: "68px",
                    color: "#009ee2",
                    fontWeight: "bolder",
                  }}
                >
                  Welcome Back!
                </Box>

                <Box
                  sx={{
                    fontSize: "16px",
                    color: "#00000083",
                    fontWeight: "normal",
                  }}
                >
                  What would you like to do?
                </Box>
              </Box>
            </Grid>

            <LoginAsGroup />

            <Box sx={{ display: "flex", color: "#848383", gap: "5px", mt: 2 }}>
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
            <Button sx={{ width: "100%" }}>Interested in Joining?</Button>

            <div />
          </Grid>
        </Grid>
      </Typography>
    </ThemeProvider>
  );
}

export default ChooseLogin;
