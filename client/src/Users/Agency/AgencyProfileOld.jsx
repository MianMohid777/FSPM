import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  Button,
  Divider,
  Card,
  CardMedia,
  CardContent,
  TextField,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AgencyHeader from "./AgencyHeader.jsx";

const theme = createTheme({
  typography: {
    fontFamily: "'Space Grotesk', sans-serif",
  },
});

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
            variant="h6"
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
                <Typography variant="body1">
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

const ProfileBox = () => {
  const [agencyInfo, setAgencyInfo] = useState({
    "Agency Name": "Example Agency",
    "Agency Mail": "agency@example.com",
    "Agency NTN": "1234567890",
    "Agency Licence": "ABCDE12345",
  });

  const [adminInfo, setAdminInfo] = useState({
    "Admin Name": "Aaloo Bukhara",
    "Admin CNIC": "12345-6789012-3",
    "Phone Number": "123-456-7890",
  });

  const [socialMediaInfo, setSocialMediaInfo] = useState({
    "Twitter Link": "X.com",
    "Facebook Link": "Facebook.com",
    "Instagram Link": "instagram.com",
  });

  return (
    <Grid container spacing={3}>
      {/* Admin Information */}
      <Grid item xs={12} md={4} xl={4}>
        <EditableProfileBox
          title="Admin Information"
          data={adminInfo}
          onDataChange={setAdminInfo}
        />
      </Grid>

      {/* Agency Information */}
      <Grid item xs={12} md={4} xl={4}>
        <EditableProfileBox
          title="Agency Information"
          data={agencyInfo}
          onDataChange={setAgencyInfo}
        />
      </Grid>

      {/* Social Media Info */}
      <Grid item xs={12} md={4} xl={4}>
        <EditableProfileBox
          title="Social Media Info"
          data={socialMediaInfo}
          onDataChange={setSocialMediaInfo}
        />
      </Grid>
    </Grid>
  );
};

const TourCard = ({ name, date, status, imagesrc }) => {
  return (
    <Link to={`/tour/${name}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          backgroundColor: "rgb(255, 255, 255, 0.8)",
          display: "flex",
          flexDirection: "column",
          margin: "20px",
          padding: "20px",
        }}
      >
        <Box position="relative" width="100%">
          <CardMedia
            src={imagesrc}
            component="img"
            title={name}
            sx={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <Box mt={2} lineHeight={0}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            {name}
          </Typography>
        </Box>
        <Box mb={3} lineHeight={0}>
          <Typography
            variant="subtitle1"
            fontWeight="light"
            color="text"
            textTransform="capitalize"
          >
            {status} - {date}
          </Typography>
        </Box>
      </Card>
    </Link>
  );
};

function AgencyProfile() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ borderRadius: "2%" }}>
        <Box
          sx={{
            backgroundColor: "	rgb(169, 201, 214, 0.8)",
            padding: "50px",
            margin: 8,
            borderRadius: "2%",
          }}
        >
          {/* Top Header Bar */}
          {/* <AgencyHeader /> */}

          {/* Info Box */}

          <ProfileBox title="Profile" />

          {/* Tours Box */}
          <Box>
            <Box pt={2} px={2} mt={5}>
              <Typography variant="h3" gutterBottom>
                Tours
              </Typography>
              <Grid container spacing={0}>
                <Grid item xs={6} md={4} lg={3}>
                  <TourCard
                    date={"5/10/15"}
                    status={"Completed"}
                    name={"Rawalindi"}
                    imagesrc={
                      "https://cdn.britannica.com/14/144114-050-24FA947B/Bazaar-Rawalpindi-Pak.jpg"
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <TourCard
                    date={"9/2/21"}
                    status={"Cancelled"}
                    name={"Lahore"}
                    imagesrc={
                      "https://cdn.britannica.com/14/144114-050-24FA947B/Bazaar-Rawalpindi-Pak.jpg"
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <TourCard
                    date={"26/7/24"}
                    status={"Pending"}
                    name={"Faisalabad"}
                    imagesrc={
                      "https://cdn.britannica.com/14/144114-050-24FA947B/Bazaar-Rawalpindi-Pak.jpg"
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <TourCard
                    date={"6/9/24"}
                    status={"Pending"}
                    name={"Lahore"}
                    imagesrc={
                      "https://cdn.britannica.com/14/144114-050-24FA947B/Bazaar-Rawalpindi-Pak.jpg"
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <TourCard
                    date={"26/7/24"}
                    status={"Pending"}
                    name={"Faisalabad"}
                    imagesrc={
                      "https://cdn.britannica.com/14/144114-050-24FA947B/Bazaar-Rawalpindi-Pak.jpg"
                    }
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={3}>
                  <TourCard
                    date={"6/9/24"}
                    status={"Completed"}
                    name={"Lahore"}
                    imagesrc={
                      "https://cdn.britannica.com/14/144114-050-24FA947B/Bazaar-Rawalpindi-Pak.jpg"
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AgencyProfile;
