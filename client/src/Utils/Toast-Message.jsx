import React from "react";
import { useState } from "react";

import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";

import error from "../Assets/error.svg";
import success from "../Assets/success.svg";
function ToastMessage(props) {
  //THEME
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 14,
    },
  });
  const [color] = useState(props.type === "Success" ? "#40C057" : "#EB5757");

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Box
          component="div"
          sx={{
            backgroundColor: color,
            minWidth: "300px",
            maxWidth: "300px",
            color: "white",
            padding: "15px",
            borderRadius: "2px",
            fontWeight: 700,
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <Box component="div" display="flex" gap="5px">
              {props.type === "Success" ? (
                <Box component="img" src={success} />
              ) : (
                <Box component="img" src={error} />
              )}

              <Box component="div" sx={{ fontSize: "18px" }}>
                {props.type}
              </Box>
              <Box
                component="div"
                sx={{
                  marginLeft: "62%",
                  fontSize: "18px",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  props.setToast(false);
                }}
              >
                x
              </Box>
            </Box>
            <Box component="div">{props.message}</Box>
          </Box>
        </Box>
      </Typography>
    </ThemeProvider>
  );
}

export default ToastMessage;
