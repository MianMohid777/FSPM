import React, { useState } from "react";

import {
  Box,
  Button,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardActionArea,
} from "@mui/material";

import {
  useDeleteApplicationMutation,
  useUpdateStatusMutation,
} from "../Services/Agency/agencyApi";
import { useLocalStorage } from "./useLocalStorage-Hook";
import Loader from "./Loader";

function ApplicationCard(props) {
  //THEME
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "1rem",
      fontWeight: "bolder",
    },
  });

  //Hooks
  const { setItem, getItem } = useLocalStorage("access_token");
  const accessToken = getItem();

  // QUERY // MUTATION
  const [updateUser, { isLoading }] = useUpdateStatusMutation();
  const [
    deleteApplication,
    { isLoading: deleteApplicationLoading, isError: deleteApplicationError },
  ] = useDeleteApplicationMutation({ accessToken: accessToken });

  // HANDLERS

  const handleApprove = async (id) => {
    try {
      console.log("approved");
      const res = await updateUser({
        id: id,
        accessToken: accessToken,
      }).unwrap();

      if (res) {
        console.log(res);
        props.setState((prevState) => {
          console.log(prevState);
          return !prevState;
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      const response = await deleteApplication({
        id: id,
        accessToken: accessToken,
      }).unwrap();

      if (response) {
        console.log(response);
        props.setState(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading || deleteApplicationLoading) return <Loader />;

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Card
          variant="outlined"
          sx={{
            minWidth: 800,
            marginBottom: "20px",
            boxShadow:
              "0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 25px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <CardHeader title={props.companyName} sx={{ fontSize: "32px" }} />
            <Box sx={{ fontSize: "16px" }}>
              <Box component="div">
                <Box
                  component="span"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Email: {""}
                </Box>
                {props.email}
              </Box>
              <Box component="div">
                <Box
                  component="span"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Admin Name:{" "}
                </Box>{" "}
                {props.adminName}
              </Box>
              <Box component="div">
                <Box
                  component="span"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Contact No:{" "}
                </Box>{" "}
                {props.phone}
              </Box>
              <Box component="div">
                <Box
                  component="span"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  CNIC:
                </Box>{" "}
                {props.cnic}
              </Box>
              <Divider component="div" />
              <Box component="div">
                <Box
                  component="span"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  NTN:
                </Box>{" "}
                {props.ntn}
              </Box>
              <Box component="div">
                <Box
                  component="span"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  DTC License:
                </Box>{" "}
                {props.license}
              </Box>
              <Divider component="div" />
              <Box component="div">
                <Box
                  component="span"
                  sx={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Office Address:
                </Box>{" "}
                {props.address}, {props.city} , {props.province}
              </Box>
            </Box>

            <Divider component="div" />
            <CardActions sx={{ gap: "50px", marginLeft: "25px" }}>
              <Button
                sx={{ fontSize: "24px", width: "50px", color: "green" }}
                onClick={() => {
                  console.log(props.id);
                  handleApprove(props.id);
                }}
              >
                Approve
              </Button>
              <Button
                sx={{ fontSize: "24px", width: "50px", color: "red" }}
                onClick={() => {
                  handleDeleteApplication(props.id);
                }}
              >
                Reject
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Typography>
    </ThemeProvider>
  );
}

export default ApplicationCard;
