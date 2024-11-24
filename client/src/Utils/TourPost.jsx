import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  FormGroup,
  Switch,
  Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import styled from "styled-components";
import { useChangeTourStatusMutation } from "../Services/Agency/agencyApi";
import Loader from "./Loader";
function TourPost(props) {
  const [toggle, setToggle] = useState(props.toggle);
  const [changeTourStatus, { isLoading, isError }] =
    useChangeTourStatusMutation();

  const navigate = useNavigate();
  const handleToggle = async () => {
    setToggle(!toggle);
    try {
      console.log(props.toggle);
      const response = await changeTourStatus({
        id: props.agencyId,
        flag: !props.toggle,
        tid: props.id,
      }).unwrap();

      if (response) {
        console.log(response);
        props.setData((prevData) => {
          return !prevData;
        });

        navigate("/agency-home", { replace: true });
      }
    } catch (err) {
      console.log(err);
      navigate("/agency-home", { replace: true });
    }
  };
  if (isLoading) return <Loader />;
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "30%",

        overflow: "hidden",
        boxShadow:
          "0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 25px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "30px",
        backgroundColor: "#FF4E45",
        color: "white",
        transition: " 0.5s ease-in",

        "&:hover": {
          overflow: "auto",
          scale: "1.1",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardHeader title={props.locationName + " Tour"} mt={1} />
          {props.show ? (
            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip
                  title="Toggle Tour Status: Upcoming or Open to Register"
                  placement="top-end"
                  arrow
                >
                  <Switch
                    checked={toggle}
                    inputProps={{ "aria-label": "my-design" }}
                    onChange={handleToggle}
                  />
                </Tooltip>
              </Stack>
            </FormGroup>
          ) : (
            <></>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "20%", mt: 1, borderRadius: "20px" }}
            image={props.img}
            alt="Cover Photo"
          />
        </Box>
        <Box sx={{ fontSize: "12px" }}>
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Tourism Agency:{" "}
            </Box>{" "}
            {props.agencyName}
          </Box>
          <Divider component="div" />
          <Box
            component="div"
            mt={2}
            sx={{ fontSize: "20px", fontWeight: "900" }}
          >
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Destination:{" "}
            </Box>{" "}
            {props.locationName}
          </Box>
          <Divider component="div" />
          <Box
            component="div"
            mt={1}
            sx={{ maxHeight: "100px", overflow: "auto" }}
          >
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              About Tour:{" "}
            </Box>{" "}
            {props.info}
          </Box>
          <Divider component="div" />
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Start Date:
            </Box>{" "}
            {props.startDate}
          </Box>

          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              End Date:
            </Box>{" "}
            {props.endDate}
          </Box>
          <Divider component="div" />
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Price:
            </Box>{" "}
            {props.price}
          </Box>
          <Divider component="div" />
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Status:
            </Box>{" "}
            {props.status}
          </Box>
          <Divider component="div" />
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Max Slots:
            </Box>{" "}
            {props.slots}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TourPost;
