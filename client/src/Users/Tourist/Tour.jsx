import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Button  } from '@mui/material';
import background from "../../Assets/top-section-background.jpg";
import background1 from "../../Assets/top-section-background-1.jpg";
import background2 from "../../Assets/top-section-background-2.jpg";
import Header from "./Header.jsx";
import CalenderSVG from "../../Assets/calenderBlack.svg";
import locationSVG from "../../Assets/location-1.svg";
import infoSVG from "../../Assets/info.svg";
import gallerySVG from "../../Assets/gallery.svg";
import profileSVG from "../../Assets/profile.svg";
import phoneSVG from "../../Assets/phone.svg";
import emailSVG from "../../Assets/email.svg";
import calenderSVG from "../../Assets/calenderBlack.svg";
import ticketSVG from "../../Assets/ticket.svg";
import messageSVG from "../../Assets/message.svg";
import imggg from "../../Assets/aurora.jpg";
import star from "../../Assets/filled-star.svg";
import { useNavigate } from "react-router-dom";
import {
  useGetToursQuery,
} from "../../Services/Tour/tourApi";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";
import Loader from "../../Utils/Loader";

const backgroundimages = [background, background1, background2];

const Tour = () => {

    const [selectedBox, setSelectedBox] = useState(['selected', 'unselected', 'unselected', 'unselected']);

    const toggleSelectedBox = (index) => {
        selectedBox[0] = 'unselected';
        selectedBox[1] = 'unselected';
        selectedBox[2] = 'unselected';
        selectedBox[3] = 'unselected';
        const newSelectedBoxes = [...selectedBox];
        newSelectedBoxes[index] = newSelectedBoxes[index] === 'selected' ? 'unselected' : 'selected';
        setSelectedBox(newSelectedBoxes);
    };
    
    const randomIndex = Math.floor(Math.random() * backgroundimages.length);
    const selectedBackground = backgroundimages[randomIndex];

  const navigate = useNavigate();

  const { data, isError, isLoading } = useGetToursQuery();

  if (isError) {
    console.error("Error fetching tours:", isError);
  }

  // Handle loading and error states
  if (isLoading) return <Loader />;

  // Handler
  const handleClick = (tour) => {
    const url = `/tour-info/${tour._id}`;

    navigate(url);
  };
    
    const gridItemStyle = {
        backgroundColor: '#f0f0f0',
        padding: '20px',
        textAlign: 'center',
    };
    
      const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginTop: '32px',
    };

  return (
    <Box
      sx={{
        height: '100vh',
      }}
    >
        <Header />
        <Box
            sx={{
            width: '100rh',
            height: '50ch',
            backgroundImage: `url(${selectedBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
        </Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '120ch',
                    backgroundColor: '#f0f0f0',
                    marginTop: '-6ch',
                    height: "11ch",
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '100%'
                    }}
                >
                    <Box
                        sx={{
                            width: '25%',
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            justifyContent: 'center',
                            backgroundColor: selectedBox[0] === 'selected' ? '#fff' : '#f0f0f0',
                            id: selectedBox[0] === 'selected' ? 'selected' : 'unselected',
                            cursor: 'pointer',
                          }}
                          onClick={() => {toggleSelectedBox(0);}}
                    >
                        <img src={infoSVG} alt="" style={{ width: '30px', height: '30px', marginTop: 'auto', marginBottom: 'auto' }} />
                        <p style={{margin: '0', padding: '0', fontSize: '25px', fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', marginLeft: '10px'}}>Information</p>
                    </Box>
                    <Box
                        sx={{
                            width: '25%',
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            justifyContent: 'center',
                            backgroundColor: selectedBox[1] === 'selected' ? '#fff' : '#f0f0f0',
                            id: selectedBox[1] === 'selected' ? 'selected' : 'unselected',
                            cursor: 'pointer',
                          }}
                          onClick={() => {toggleSelectedBox(1);}}
                    >
                        <img src={CalenderSVG} alt="" style={{ width: '30px', height: '30px', marginTop: 'auto', marginBottom: 'auto'  }} />
                        <p style={{margin: '0', padding: '0', fontSize: '25px', fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', marginLeft: '10px'}}>Tour Plan</p>
                    </Box>
                    <Box
                        sx={{
                            width: '25%',
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            justifyContent: 'center',
                            backgroundColor: selectedBox[2] === 'selected' ? '#fff' : '#f0f0f0',
                            id: selectedBox[2] === 'selected' ? 'selected' : 'unselected',
                            cursor: 'pointer',
                          }}
                          onClick={() => {toggleSelectedBox(2);}}
                    >
                        <img src={locationSVG} alt="" style={{ width: '30px', height: '30px', marginTop: 'auto', marginBottom: 'auto'  }} />
                        <p style={{margin: '0', padding: '0', fontSize: '25px', fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', marginLeft: '10px'}}>Location</p>
                    </Box>
                    <Box
                        sx={{
                            width: '25%',
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            justifyContent: 'center',
                            backgroundColor: selectedBox[3] === 'selected' ? '#fff' : '#f0f0f0',
                            id: selectedBox[3] === 'selected' ? 'selected' : 'unselected',
                            cursor: 'pointer',
                          }}
                          onClick={() => {toggleSelectedBox(3);}}
                    >
                        <img src={gallerySVG} alt="" style={{ width: '30px', height: '30px', marginTop: 'auto', marginBottom: 'auto'  }} />
                        <p style={{margin: '0', padding: '0', fontSize: '25px', fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', marginLeft: '10px'}}>Gallery</p>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '120ch',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',                    
                        // height: '200px',                    
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        margin: '10px'
                    }}
                >
                    <Box
                        sx={{
                            width: '60%',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Box
                            sx={{
                                marginRight: '20px'
                            }}
                        >
                            <Box style={gridContainerStyle}>
                                {data && data.tours.length > 0 ? (
                                    data.tours.map((tour) => (
                                        <Box key={tour._id}
                                        sx={{
                                            marginTop: '10px',
                                            width: '90%',
                                            transition: 'transform 0.3s',
                                            '&:hover': {
                                            transform: 'scale(1.10)'
                                            }
                                        }}>
                                            <Box
                                                onClick={() => {
                                                    handleClick(tour);
                                                }} 
                                                sx={{
                                                    backgroundImage: `url(api/Static/${tour.tourLocationImage})`,
                                                    backgroundSize: 'cover',
                                                    height: '25ch',
                                                    width: '100%'
                                                }}
                                            >
                                            </Box>
                                            <Box
                                                sx={{
                                                    height: '3ch',
                                                    width: '100%',
                                                    backgroundColor: '#FFA500',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        marginLeft: '2ch',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <img src={calenderSVG} alt="" style={{height: '20px', width: '20px', marginTop: '0.2ch'}} />
                                                    <p style={{fontSize: '10px', margin: '1ch 0 0 1ch'}}>
                                                    {new Date(tour.tourStartDate).toLocaleDateString('en-US', {
                                                        day: '2-digit', // Display the day with two digits
                                                        month: 'long', // Display the full month name (e.g., January)
                                                        year: 'numeric' // Display the full year (e.g., 2022)
                                                    })}
                                                    </p>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '1ch',
                                                        marginLeft: '2ch'
                                                    }}
                                                >
                                                    <p style={{color: '#00004d', fontSize: '25px', fontWeight: 'bold', margin: '0'}}>{tour.tourLocationName}</p>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '1ch',
                                                    }}
                                                >
                                                    <p style={{color: '#00004d', fontSize: '14px', fontWeight: '400', margin: '0'}}>{tour.tourInformation}</p>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '1ch',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <Box>
                                                        <p style={{color: '#000', fontSize: '14px', fontWeight: '500', margin: '0'}}>{tour.tourPrice} $</p>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            marginLeft: '2ch'
                                                        }}
                                                    >
                                                        <Box
                                                        sx={{
                                                        }}
                                                        >
                                                            <img style={{height: '20px', width: '20px',}} src={star} alt="" />
                                                        </Box>
                                                        <Box
                                                        sx={{
                                                            marginLeft: '1ch'
                                                        }}
                                                        >
                                                            <p style={{margin: '0'}}>4.2</p>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))
                                    ) : (
                                        <></>
                                    )}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '40%',
                            backgroundColor: '#f0f0f0'
                        }}
                    >
                        <p style={{color: '#00004d', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px'}}>Book This Tour</p>
                        <p style={{textAlign: 'center', color: '#000', fontSize: '15px', marginTop: '0', marginLeft: '10px', marginRight: '10px'}}>Lorem dabwhdawndajwdhaiuwdhawiudhawiduwn aiud haiwudbiwabdiwabdwabiabxiabdiabdai bi baibdiadibadbaw</p>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                type="text"
                                required
                                // error={error.emailError}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={profileSVG} alt="" style={{height: '20px', width: '20px'}} />
                                    </InputAdornment>
                                    ),
                                }}
                                margin="dense"
                                // color="success"
                                sx={{ width: "40ch", marginRight: "3ch", marginLeft: '3ch', color: '#00004d' }}
                                focused
                                // onChange={handleEmailChange}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                required
                                // error={error.emailError}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={emailSVG} alt="" style={{height: '25px', width: '25px'}} />
                                    </InputAdornment>
                                    ),
                                }}
                                margin="dense"
                                // color="success"
                                sx={{ width: "40ch", marginRight: "3ch", marginLeft: '3ch', color: '#00004d', marginTop: '3ch' }}
                                focused
                                // onChange={handleEmailChange}
                            />
                            <TextField
                                id="confirmEmail"
                                label="Confirm Email"
                                variant="outlined"
                                type="email"
                                required
                                // error={error.emailError}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={emailSVG} alt="" style={{height: '25px', width: '25px'}} />
                                    </InputAdornment>
                                    ),
                                }}
                                margin="dense"
                                // color="success"
                                sx={{ width: "40ch", marginRight: "3ch", marginLeft: '3ch', color: '#00004d', marginTop: '3ch' }}
                                focused
                                // onChange={handleEmailChange}
                            />
                            <TextField
                                id="phoneNumber"
                                label="Phone"
                                variant="outlined"
                                type="number"
                                required
                                // error={error.emailError}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={phoneSVG} alt="" style={{height: '20px', width: '20px'}} />
                                    </InputAdornment>
                                    ),
                                }}
                                margin="dense"
                                // color="success"
                                sx={{ width: "40ch", marginRight: "3ch", marginLeft: '3ch', color: '#00004d', marginTop: '3ch', WebkitAppearance: 'none'}}
                                focused
                                // onChange={handleEmailChange}
                            />
                            <TextField
                                id="date"
                                label="Date"
                                variant="outlined"
                                type="date"
                                placeholder=''
                                required
                                // error={error.emailError}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={calenderSVG} alt="" style={{height: '20px', width: '20px'}} />
                                    </InputAdornment>
                                    ),
                                }}
                                margin="dense"
                                // color="success"
                                sx={{ width: "40ch", marginRight: "3ch", marginLeft: '3ch', color: '#00004d', marginTop: '3ch' }}
                                focused
                                // onChange={handleEmailChange}
                            />
                            <TextField
                                id="ticketCount"
                                label="Number of Tickets"
                                variant="outlined"
                                type="number"
                                required
                                // error={error.emailError}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={ticketSVG} alt="" style={{height: '25px', width: '25px'}} />
                                    </InputAdornment>
                                    ),
                                }}
                                margin="dense"
                                // color="success"
                                sx={{ width: "40ch", marginRight: "3ch", marginLeft: '3ch', color: '#00004d', marginTop: '3ch' }}
                                focused
                                // onChange={handleEmailChange}
                            />
                            <TextField
                                id="message"
                                label="Message"
                                variant="outlined"
                                type="text"
                                required
                                // error={error.emailError}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={messageSVG} alt="" style={{height: '25px', width: '25px'}} />
                                    </InputAdornment>
                                    ),
                                }}
                                margin="dense"
                                // color="success"
                                sx={{ width: "40ch", marginRight: "3ch", marginLeft: '3ch', color: '#00004d', marginTop: '3ch' }}
                                focused
                                // onChange={handleEmailChange}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontSize: "14px",
                                        mt: 3,
                                        bgcolor: "#FFA500",
                                        width: "165px",
                                        height: "48px",
                                    }}
                                    // onClick={handleSubmit}
                                    >
                                    Check Availability
                                    </Button>
                                    <Button
                                    variant="contained"
                                    sx={{
                                        fontSize: "14px",
                                        mt: 3,
                                        bgcolor: "#FFA500",
                                        width: "165px",
                                        height: "48px",
                                    }}
                                    // onClick={handleSubmit}
                                    >
                                    Book Tour
                                    </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  );
};

export default Tour;
