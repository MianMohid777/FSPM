import { Box } from "@mui/system";
import React from "react";
import "../Styles/loader.scss";
import spinner from "../Assets/spinner.svg";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "spinner 1s linear 0s infinite",
        mt: "15%",
      }}
    >
      <Box component="img" src={spinner} />
    </Box>
  );
}

export default Loader;
