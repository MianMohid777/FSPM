import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  TextField,
  Card,
  CardContent,
  Box,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { addProfile } from "../../Redux/Features/agencySlice";
import Loader from "../../Utils/Loader";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook.js";
import TopBar from "../../Utils/TopBar.jsx";
import LeftDrawer from "../../Utils/LeftDrawer.jsx";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch } from "react-redux";
import { useUpdateAgencyProfileMutation } from "../../Services/Agency/agencyApi.js";
import { useUploadMutation } from "../../Services/UtilsApi/fileApi.js";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const EditableProfileBox = ({ title, data, onDataChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    onDataChange(editedData);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pb={2}
        >
          <Typography
            variant="h4"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}
          </Typography>
          {!isEditing && (
            <Button onClick={handleEdit} variant="outlined">
              Edit
            </Button>
          )}
        </Box>
        {isEditing ? (
          <>
            {Object.entries(editedData).map(([key, value]) =>
              key === "Agency Licence" ? (
                <Box key={key} py={1}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    name={key}
                  />
                </Box>
              ) : (
                <TextField
                  key={key}
                  name={key}
                  label={key}
                  value={value}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              )
            )}
            <Box pt={2} textAlign="right">
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </>
        ) : (
          <>
            {Object.entries(data).map(([key, value]) => (
              <Box key={key} py={1}>
                <Typography variant="h6">
                  <strong>
                    {key === "Instagram Link" ? (
                      <InstagramIcon sx={{ marginBottom: "-6px" }} />
                    ) : key === "Facebook Link" ? (
                      <FacebookIcon sx={{ marginBottom: "-6px" }} />
                    ) : key === "Twitter Link" ? (
                      <TwitterIcon sx={{ marginBottom: "-6px" }} />
                    ) : (
                      key
                    )}
                    :
                  </strong>{" "}
                  {key === "Agency Licence" ? (
                    <a href={value} target="_blank">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

function AgencyProfile() {
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
  const [selectedIdx, setSelectedIdx] = useState(1);
  const [searchBar, setSearchBar] = useState("");
  const agency = useSelector((state) => state.agency);
  const { setItem, getItem } = useLocalStorage("access_token");
  const accessToken = getItem();
  const dispatch = useDispatch();

  const [updateAgencyProfile, { isLoading: updating, isError: updateErr }] =
    useUpdateAgencyProfileMutation();
  const [upload, { isLoading: uploadLoading, isError: uploadError }] =
    useUploadMutation();

  const [agencyInfo, setAgencyInfo] = useState({
    name: agency.profile.name,
    email: agency.authAgency.email,
    phoneNumber: agency.authAgency.contactNo,
    description: agency.profile.description,
  });

  const [socialMediaInfo, setSocialMediaInfo] = useState({
    faceBook: agency.profile.socialMediaLinks.faceBook,
    instagram: agency.profile.socialMediaLinks.instagram,
    twitter: agency.profile.socialMediaLinks.twitter,
    website: agency.profile.website,
  });

  const [gallery, setgallery] = useState(agency.profile.gallery);
  const [locationImage, setLocationImage] = useState("");

  const handleImageChange = (e) => {
    setLocationImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const file = new FormData();
      file.append("file", locationImage);

      const response = await upload(file).unwrap();

      if (response) {
        let staticPath = response.filePath.split("/");
        let index = staticPath.length;
        console.log(staticPath[index - 1]);
        setgallery([...gallery, staticPath[index - 1]]);
        updateProfile();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (idx) => {
    setSelectedIdx(idx);
  };

  const handleAgencyInfoChange = (newData) => {
    setAgencyInfo(newData);
    updateProfile();
  };

  const handleSocialMediaInfoChange = (newData) => {
    setSocialMediaInfo(newData);
    updateProfile();
  };

  const updateProfile = async () => {
    const updatedProfile = {
      ...agency.profile,
      ...agencyInfo,
      gallery,
      socialMediaLinks: {
        faceBook: socialMediaInfo.faceBook,
        instagram: socialMediaInfo.instagram,
        twitter: socialMediaInfo.twitter,
      },
    };

    console.log(updatedProfile);

    dispatch(addProfile(updatedProfile));

    console.log("Updated Agency Profile", updatedProfile);
    console.log("Latest Agency", agency);

    try {
      if (accessToken) {
        const response = await updateAgencyProfile({
          id: agency.authAgency.id,
          accessToken: accessToken,
          updatedData: updatedProfile,
        }).unwrap();

        if (response) {
          console.log(response);
        }
      }
    } catch (err) {
      console.log(err);
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
                borderRadius: "2%",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#282828",
              }}
            >
              <Box
                width={"100%"}
                sx={{
                  backgroundColor: "#4e4e4e",
                  padding: "50px",
                  margin: 8,
                  borderRadius: "2%",
                }}
              >
                {/* Profile Box */}
                <Grid container spacing={3}>
                  {/* Agency Information */}
                  <Grid item xs={12} md={12} xl={12}>
                    <EditableProfileBox
                      title="Agency Information"
                      data={agencyInfo}
                      onDataChange={handleAgencyInfoChange}
                    />
                  </Grid>
                  {/* Social Media Info */}
                  <Grid item xs={12} md={12} xl={12}>
                    <EditableProfileBox
                      title="Social Media Info"
                      data={socialMediaInfo}
                      onDataChange={handleSocialMediaInfoChange}
                    />
                  </Grid>
                </Grid>
                {/* Tours Box */}
                <Box>
                  <Box pt={2} px={2} mt={5}>
                    <Box pt={2} px={2} mt={5}>
                      <Typography variant="h3" gutterBottom>
                        Gallery
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item>
                          <ImageList
                            sx={{ width: 500, height: 450 }}
                            cols={3}
                            rowHeight={164}
                          >
                            {gallery.map((image, index) => (
                              <ImageListItem key={index}>
                                <Box
                                  component="img"
                                  src={`http://localhost:3002/api/static/${image}`}
                                  alt={`X`}
                                  sx={{ width: "200px", height: "200px" }}
                                  loading="lazy"
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Grid>
                        <Grid item>
                          <input
                            type="file"
                            accept="image/*"
                            id="image-upload"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                          />
                          <label htmlFor="image-upload">
                            <Button
                              variant="outlined"
                              component="span"
                              startIcon={<PhotoCamera />}
                            >
                              Upload Image
                            </Button>
                          </label>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default AgencyProfile;
