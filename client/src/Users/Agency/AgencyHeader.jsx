import React from "react";
import { Box, Grid, Typography,  Button, Card, Avatar, } from "@mui/material";



const AgencyHeader = () => {
  const handleViewGallery = () => {
    // TODO
  };

  const handleManageTours = () => {
    // TODO
  };

  return (
    <Box position="relative" mb={5} mt={5}>
      <Card
        sx={{
          position: "relative",
          mt: -4,

          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar src={"https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png"} alt="profile-image" size="xxl" sx={{ width: "100px", height: "100px" }} />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                Agency Name
              </Typography>
              <Typography variant="button" color="text" fontWeight="regular">
                Aao ghoomain phirain
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <Button variant="contained" onClick={handleViewGallery} sx={{ ml: 5, width: "170px", height: "50px", backgroundColor: "#3f51b5", color: "#fff" }}>View Gallery</Button>
            <Button variant="contained" onClick={handleManageTours} sx={{ ml: 5, width: "170px", height: "50px", backgroundColor: "#3f51b5", color: "#fff" }}>Manage Tours</Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AgencyHeader;