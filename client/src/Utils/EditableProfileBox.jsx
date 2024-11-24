import React, { useState } from "react";
import {
    Typography, TextField,
    Card,
    CardContent,
    Box,
    Button
} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


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
          <Box display="flex" justifyContent="space-between" alignItems="center" pb={2}>
            <Typography variant="h4" fontWeight="medium" textTransform="capitalize">
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
              {Object.entries(editedData).map(([key, value]) => (
                key === "Agency Licence" ? (
                  <Box key={key} py={1}>
                    <input type="file" accept="image/*" onChange={handleChange} name={key} />
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
              ))}
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
                    <strong>{key === "Instagram Link" ? <InstagramIcon sx={{ marginBottom: "-6px" }} /> : key === "Facebook Link" ? <FacebookIcon sx={{ marginBottom: "-6px" }} /> : key === "Twitter Link" ? <TwitterIcon sx={{ marginBottom: "-6px" }} /> : key}:</strong> {key === "Agency Licence" ? <a href={value} target="_blank">{value}</a> : value}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  export default EditableProfileBox;
  