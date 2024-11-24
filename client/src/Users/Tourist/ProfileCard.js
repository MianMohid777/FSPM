import React, { useState } from "react";
import {
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  Box
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileImage from "../../Assets/login-as-cover.jpg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function ProfileCard() {
   
  
    const initialUsers = [
      {
        username: "bilal-os",
        email: "example@example.com",
        password: "*********",
        phone: "+1234567890"
      },
      {
        username: "bilal-os1",
        email: "example@example.com",
        password: "*********",
        phone: "+1234567890"
      }
  
  
    ];
  
    const [users, setUsers] = useState(initialUsers);
  
    const [isUsernameEditable, setIsUsernameEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  
    const [username, setUsername] = useState("bilal-os");
    const [email, setEmail] = useState("example@example.com");
    const [phone, setPhone] = useState("+1234567890");
    const [usernameExists, setUsernameExists] = useState(false);
  
    const handleUsernameChange = () => {
      setIsUsernameEditable(!isUsernameEditable);
      setUsernameExists(false); // Reset usernameExists flag
    };
  
    const [password, setPassword] = useState("*********");
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const handlePasswordChange = () => {
      setIsPasswordEditable(!isPasswordEditable);
    };
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
  
    const handleEmailChange = () => {
      setIsEmailEditable(!isEmailEditable);
    };
  
    const handlePhoneChange = () => {
      setIsPhoneEditable(!isPhoneEditable);
    };
  
    const [originalUsername, setOriginalUsername] = useState("bilal-os");
  
  
    const handleUsernameInput = (event) => {
      const newUsername = event.target.value;
      setUsername(newUsername);
      setUsernameExists(users.some(user => user.username === newUsername && user.username !== originalUsername));
    };
    
    
   
  
    return (
     

            <Card sx={{ padding: "30px", textAlign: "center" }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ borderBottom: "2px solid white", paddingBottom: 2 }}
                >
                  Tourist Profile
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12}>
                    <Avatar
                      alt="Profile Picture"
                      src={ProfileImage}
                      sx={{
                        width: 200,
                        height: 200,
                        border: "2px solid white",
                        margin: "20px auto 0",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" className="profile-info">
                      Mountain Climber
                    </Typography>
                    <Typography variant="h6" className="profile-info">
                      Location: Lahore, Pakistan
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" className="profile-button">
                      Change Photo
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={4} justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Username:</Typography>
                    <TextField
                      variant="outlined"
                      value={username}
                      size="small"
                      fullWidth
                      InputProps={{
                        readOnly: !isUsernameEditable,
                        endAdornment: (
                          !usernameExists && (
                            <IconButton
                              color="primary"
                              onClick={handleUsernameChange}
                            >
                              <Typography variant="body2">
                                {isUsernameEditable ? "Save" : "Edit"}
                              </Typography>
                            </IconButton>
                          )
                        ),
                      }}
                      onChange={handleUsernameInput}
                    />
  
                    {usernameExists && (
                      <Typography variant="body2" color="error">
                        Username already exists.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Password:</Typography>
                    <TextField
                      variant="outlined"
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      size="small"
                      fullWidth
                      InputProps={{
                        readOnly: !isPasswordEditable,
                        endAdornment: (
                          <>
                            <IconButton
                              color="primary"
                              onClick={handlePasswordChange}
                            >
                              <Typography variant="body2">
                                {isPasswordEditable ? "Save" : "Edit"}
                              </Typography>
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={togglePasswordVisibility}
                            >
                              {isPasswordVisible ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </>
                        ),
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Email:</Typography>
                    <TextField
                      variant="outlined"
                      value={email}
                      size="small"
                      fullWidth
                      InputProps={{
                        readOnly: !isEmailEditable,
                        endAdornment: (
                          <IconButton color="primary" onClick={handleEmailChange}>
                            <Typography variant="body2">
                              {isEmailEditable ? "Save" : "Edit"}
                            </Typography>
                          </IconButton>
                        ),
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Phone Number:</Typography>
                    <TextField
                      variant="outlined"
                      value={phone}
                      size="small"
                      fullWidth
                      InputProps={{
                        readOnly: !isPhoneEditable,
                        endAdornment: (
                          <IconButton
                            color="primary"
                            onClick={handlePhoneChange}
                          >
                            <Typography variant="body2">
                              {isPhoneEditable ? "Save" : "Edit"}
                            </Typography>
                          </IconButton>
                        ),
                      }}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
      
          
    );
  }
  
  export default ProfileCard;