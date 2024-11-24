import React, { useState } from "react";
import {
  Box,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Loader from "../../Utils/Loader";
import { useTourPublishMutation } from "../../Services/Agency/publishTour.js";

import { useSelector } from "react-redux";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook.js";
import TopBar from "../../Utils/TopBar.jsx";
import LeftDrawer from "../../Utils/LeftDrawer.jsx";
import { useUploadMutation } from "../../Services/UtilsApi/fileApi.js";

function CreateTour() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#FF4E45",
      },
      background: {
        default: "#282828", // Black background
      },
      text: {
        primary: "#FFF", // White text
      },
    },
  });

  // HOOKS
  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchBar, setSearchBar] = useState("");
  const [tourPublish, { isLoading, isError }] = useTourPublishMutation();
  const [upload, { isLoading: uploadLoading, isError: uploadError }] =
    useUploadMutation();
  const agency = useSelector((state) => state.agency);
  const navigate = useNavigate();
  const { setItem, getItem } = useLocalStorage("access_token");
  const accessToken = getItem();

  // State variables to store form data
  const [locationName, setLocationName] = useState("");
  const [locationImage, setLocationImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
  const [information, setInformation] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [locationLink, setLocationLink] = useState("");
  const [tourPlan, setTourPlan] = useState([]);
  const [maxSlots, setMaxSlots] = useState(0);

  const [tourInfo, setTourInfo] = useState({
    tourAgencyName: "",
    tourLocationName: "",
    tourLocationImage: "",
    tourStartDate: new Date().toLocaleDateString(),
    tourEndDate: new Date().toLocaleDateString(),
    tourRegistrationEndDate: new Date().toLocaleDateString(),
    tourInformation: "",
    tourPrice: 0.0,
    tourStatus: "Upcoming",
    tourLocationLink: "",
    tourPlan: [],
    tourMaxSlots: 0,
  });

  if (isLoading) return <Loader />;
  //console.log(agency);

  // Function to handle image upload
  const handleImageChange = (e) => {
    setLocationImage(e.target.files[0]);
  };

  const handleClick = (idx) => {
    setSelectedIdx(idx);
  };

  const handleUpload = async () => {
    try {
      console.log(locationImage);
      const file = new FormData();
      file.append("file", locationImage);

      console.log(file);
      const response = await upload(file).unwrap();

      if (response) {
        console.log(response);
        let staticPath = response.filePath.split("/");
        let index = staticPath.length;
        console.log(staticPath[index - 1]);
        setImagePath(staticPath[index - 1]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const addDay = () => {
    setTourPlan([
      ...tourPlan,
      {
        dayNumber: tourPlan.length + 1,
        dayTitle: "",
        dayInformation: "",
      },
    ]);
  };

  const deleteDay = (index) => {
    const newTourPlan = [...tourPlan];
    newTourPlan.splice(index, 1);
    // Update day numbers
    for (let i = index; i < newTourPlan.length; i++) {
      newTourPlan[i].dayNumber = i + 1;
    }
    setTourPlan(newTourPlan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isValidDate(startDate) ||
      !isValidDate(endDate) ||
      !isValidDate(registrationEndDate)
    ) {
      alert("Please enter valid dates");
      return;
    }

    // Check if start date is after end date
    if (new Date(startDate) >= new Date(endDate)) {
      alert("Start date must be before end date");
      return;
    }

    // Check if registration end date is after end date
    if (new Date(registrationEndDate) > new Date(endDate)) {
      alert("Registration end date must be before or equal to end date");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      alert("Start date must be before end date");
      return;
    }

    // Check if registration end date is after end date
    if (new Date(registrationEndDate) > new Date(endDate)) {
      alert("Registration end date must be before or equal to end date");
      return;
    }

    const newTourInfo = {
      tourAgencyId: agency.authAgency.id,
      tourAgencyName: agency.authAgency.name,
      tourLocationName: locationName,
      tourLocationImage: imagePath,
      tourStartDate: startDate,
      tourEndDate: endDate,
      tourRegistrationEndDate: registrationEndDate,
      tourInformation: information,
      tourStatus: status,
      tourPrice: price,
      tourPlan: tourPlan,
      tourLocationLink: locationLink,
      tourMaxSlots: maxSlots,
    };

    console.log("TOUR INFO", newTourInfo);
    setTourInfo(tourInfo);

    const payload = {
      tourInfo: newTourInfo,
      id: agency.authAgency.id,
      accessToken: accessToken,
    };
    console.log(payload);
    try {
      const response = await tourPublish(payload).unwrap();

      if (response) {
        console.log("RESPONSE", response);
        navigate("/agency-home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <Grid container sx={{ backgroundColor: "#1F1F1F" }}>
            <Grid item lg={12}>
              <TopBar
                setOpen={setOpen}
                setSearchBar={setSearchBar}
                show={false}
                showBar={false}
              />
              <LeftDrawer
                open={open}
                setOpen={setOpen}
                handleClick={handleClick}
                selectedIdx={selectedIdx}
              />
            </Grid>

            <Grid
              container
              spacing={3}
              padding={8}
              margin={8}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#282828",
              }}
            >
              <Typography variant="h4" gutterBottom color={"#FFF"}>
                Create Tour
              </Typography>
              <hr></hr>
              <Typography variant="p" gutterBottom color={"#FFF"}>
                {agency.authAgency.name}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} adding={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Location Name"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      fullWidth
                      required
                      sx={{ color: "#FFF" }} // White text
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Location Link"
                      value={locationLink}
                      onChange={(e) => setLocationLink(e.target.value)}
                      fullWidth
                      required
                      sx={{ color: "#FFF" }} // White text
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <Box sx={{ display: "flex", gap: "30px" }}>
                      <label htmlFor="image-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<PhotoCamera />}
                          sx={{ color: "#FFF" }} // White text
                        >
                          Choose Cover Image
                        </Button>
                      </label>
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<DriveFolderUploadIcon />}
                        sx={{ color: "#FFF" }} // White text
                        onClick={handleUpload}
                      >
                        Upload
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Start Date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="End Date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Registration End Date"
                      type="date"
                      value={registrationEndDate}
                      onChange={(e) => setRegistrationEndDate(e.target.value)}
                      fullWidth
                      //required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel sx={{ color: "#FFF" }}>Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="Upcoming">Upcoming</MenuItem>
                        <MenuItem value="Registrations-Opened">
                          Registrations Open
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Information"
                      multiline
                      rows={4}
                      value={information}
                      onChange={(e) => setInformation(e.target.value)}
                      fullWidth
                      required
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Max Slots"
                      type="number"
                      value={maxSlots}
                      onChange={(e) => setMaxSlots(e.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Ticket Price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {tourPlan.map((day, index) => (
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={4}>
                          <TextField
                            label={`Day ${index + 1} Number`}
                            value={day.dayNumber}
                            fullWidth
                            disabled
                            sx={{ color: "#FFF", marginBottom: "16px" }} // Added margin bottom
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            label={`Day ${index + 1} Title`}
                            value={day.dayTitle}
                            onChange={(e) => {
                              const newTourPlan = [...tourPlan];
                              newTourPlan[index].dayTitle = e.target.value;
                              setTourPlan(newTourPlan);
                            }}
                            fullWidth
                            required
                            sx={{ color: "#FFF", marginBottom: "16px" }} // Added margin bottom
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label={`Day ${index + 1} Information`}
                            value={day.dayInformation}
                            onChange={(e) => {
                              const newTourPlan = [...tourPlan];
                              newTourPlan[index].dayInformation =
                                e.target.value;
                              setTourPlan(newTourPlan);
                            }}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            sx={{ color: "#FFF", marginBottom: "0px" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            onClick={() => deleteDay(index)}
                            variant="outlined"
                            color="secondary"
                            sx={{ mb: "50px" }}
                          >
                            Delete Day
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button
                        onClick={addDay}
                        variant="outlined"
                        color="primary"
                      >
                        Add Day
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Create Tour
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default CreateTour;
