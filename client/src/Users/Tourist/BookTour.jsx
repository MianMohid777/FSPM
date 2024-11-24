import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
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
import StarRating from './StarRating.jsx';
import GoogleMap from './GoogleMap.jsx';
import { useNavigate, useParams  } from "react-router-dom";
import { useGetTourByIDQuery } from "../../Services/Tour/tourApi";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";
import Loader from "../../Utils/Loader";

const backgroundimages = [background, background1, background2];

function formatTime(timestamp) {
    // Convert timestamp to Date object
    const date = new Date(timestamp);
  
    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Convert hours to 12-hour format
    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours; // Handle midnight (00:00) as 12:00 AM
  
    // Add leading zeros to minutes if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Determine AM/PM designation
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Construct formatted time string
    const formattedTime = `${formattedHours} : ${formattedMinutes} ${ampm}`;
  
    return formattedTime;
  }

  function formatDate(timestamp) {
    // Convert timestamp to Date object
    const date = new Date(timestamp);

    // Define month names in alphabetical order
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get month, day, and year
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Construct formatted date string
    const formattedDate = `${month} ${day} ${year}`;

    return formattedDate;
  }

const BookTour = () => {

    const [informationBlock, setInformationBlock] = useState(true);
    const [tourPlanBlock, setTourPlanBlock] = useState(false);
    const [locationBlock, setLocationBlock] = useState(false);
    const [galleryBlock, setGalleryBlock] = useState(false);
  
    const handleClickLoadInformationBlock = () => {
        setInformationBlock(true);
        setTourPlanBlock(false);
        setLocationBlock(false);
        setGalleryBlock(false);
    };
  
    const handleClickLoadTourPlanBlock = () => {
        setInformationBlock(false);
        setTourPlanBlock(true);
        setLocationBlock(false);
        setGalleryBlock(false);
    };
  
    const handleClickLoadLocationBlock = () => {
        setInformationBlock(false);
        setTourPlanBlock(false);
        setLocationBlock(true);
        setGalleryBlock(false);
    };

    const handleClickLoadGalleryBlock = () => {
        setInformationBlock(false);
        setTourPlanBlock(false);
        setLocationBlock(false);
        setGalleryBlock(true);
    };

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

    const { id } = useParams();
    const { data, isError, isLoading } = useGetTourByIDQuery({ id });
  
    if (isError) {
      console.log("Error fetching tour:", isError);
      return <div>Error fetching tour information</div>;
    }
  
    if (isLoading) {
      console.log("Loading");
      return <Loader />;
    }

    if (data && data.tour){
    const tour = data.tour;
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
                            onClick={() => {toggleSelectedBox(0); handleClickLoadInformationBlock();}}
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
                            onClick={() => {toggleSelectedBox(1); handleClickLoadTourPlanBlock();}}
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
                            onClick={() => {toggleSelectedBox(2); handleClickLoadLocationBlock();}}
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
                            onClick={() => {toggleSelectedBox(3); handleClickLoadGalleryBlock();}}
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
                            margin: '20px'
                        }}
                    >
                        <Box
                            sx={{
                                width: '60%',
                                backgroundColor: '#fff',
                            }}
                        >
                            {informationBlock && (
                                <Box
                                    sx={{}}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <p style={{color: '#00004d', fontSize: '30px', fontWeight: 'bold', margin: '5px 40px 0 0', display: 'inline-block'}}>{tour.tourLocationName}</p>
                                        <p style={{color: '#FFA500', fontSize: '30px', margin: '5px 15px 0 0', display: 'inline-block'}}>$ {tour.tourPrice}</p>
                                        <p style={{color: '#808080', fontSize: '30px', margin: '5px 0 0 0', display: 'inline-block'}}>/ Person</p>
                                    </Box>
                                    <Box
                                        sx={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            flexDirection: 'row', // Change flex direction to row
                                            alignItems: 'center' // Align items vertically center
                                        }}
                                    >
                                        <StarRating rating={3.5} />
                                        <p style={{color: '#00004d', fontSize: '20px', marginLeft: '20px', marginBottom: '0', marginTop: '0'}}>(2.3k reviews)</p>
                                    </Box>
                                    <Box
                                        sx={{}}
                                    >
                                        <p>{tour.tourInformation}</p>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Box
                                            sx={{width: '40%'}}
                                        >
                                            <p style={{color: '#FFA500', fontSize: '20px', marginTop: '15px', fontWeight: 'bold'}}>Offered By</p>
                                        </Box>
                                        <Box
                                            sx={{width: '60%'}}
                                        >
                                            <p style={{fontSize: '18px', marginTop: '15px',}}>  {tour.tourAgencyName}</p>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Box
                                            sx={{width: '40%'}}
                                        >
                                            <p style={{color: '#FFA500', fontSize: '20px', marginTop: '15px', fontWeight: 'bold'}}>Destination</p>
                                        </Box>
                                        <Box
                                            sx={{width: '60%'}}
                                        >
                                            <p style={{fontSize: '18px', marginTop: '15px',}}>  {tour.tourLocationName}</p>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Box
                                            sx={{width: '40%'}}
                                        >
                                            <p style={{color: '#FFA500', fontSize: '20px', marginTop: '15px', fontWeight: 'bold'}}>Departure Time</p>
                                        </Box>
                                        <Box
                                            sx={{width: '60%'}}
                                        >
                                            <p style={{fontSize: '18px', marginTop: '15px',}}>Approximately {formatTime(tour.tourStartDate)}</p>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Box
                                            sx={{width: '40%'}}
                                        >
                                            <p style={{color: '#FFA500', fontSize: '20px', marginTop: '15px', fontWeight: 'bold'}}>Return Date</p>
                                        </Box>
                                        <Box
                                            sx={{width: '60%'}}
                                        >
                                            <p style={{fontSize: '18px', marginTop: '15px',}}>{formatDate(tour.tourEndDate)}</p>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Box
                                            sx={{width: '40%'}}
                                        >
                                            <p style={{color: '#FFA500', fontSize: '20px', marginTop: '15px', fontWeight: 'bold'}}>Return Time</p>
                                        </Box>
                                        <Box
                                            sx={{width: '60%'}}
                                        >
                                            <p style={{fontSize: '18px', marginTop: '15px',}}>Approximately {formatTime(tour.tourEndDate)}</p>
                                        </Box>
                                    </Box>
                                    {/* <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Box
                                            sx={{width: '40%'}}
                                        >
                                            <p style={{color: '#FFA500', fontSize: '20px', marginTop: '15px', fontWeight: 'bold'}}>Not included</p>
                                        </Box>
                                        <Box
                                            sx={{width: '60%'}}
                                        >
                                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                    <span style={{ marginRight: '2px' }}>✗</span>List item 1
                                                </li>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                    <span style={{ marginRight: '2px' }}>✗</span>List item 2
                                                </li>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                    <span style={{ marginRight: '2px' }}>✗</span>List item 3
                                                </li>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                    <span style={{ marginRight: '2px' }}>✗</span>List item 4
                                                </li>
                                            </ul>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Box
                                            sx={{width: '40%'}}
                                        >
                                            <p style={{color: '#FFA500', fontSize: '20px', marginTop: '15px', fontWeight: 'bold'}}>Included</p>
                                        </Box>
                                        <Box
                                            sx={{width: '60%'}}
                                        >
                                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap' }}>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px'  }}>
                                                    <span style={{ marginRight: '2px' }}>✔</span>List item 1
                                                </li>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px'  }}>
                                                    <span style={{ marginRight: '2px' }}>✔</span>List item 2
                                                </li>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px'  }}>
                                                    <span style={{ marginRight: '2px' }}>✔</span>List item 3
                                                </li>
                                                <li style={{ width: 'calc(50% - 10px)', margin: '5px', display: 'flex', alignItems: 'center', fontSize: '18px'  }}>
                                                    <span style={{ marginRight: '2px' }}>✔</span>List item 4
                                                </li>
                                            </ul>
                                        </Box>
                                    </Box> */}
                                </Box>
                            )}
                            {tourPlanBlock && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginRight: '20px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%'
                                        }}
                                    >
                                        <p style={{color: '#00004d', fontSize: '30px', fontWeight: 'bold', margin: '5px 40px 0 0'}}>Tour Plan</p>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            marginTop: '20px'
                                        }}
                                    >
                                        {tour.tourPlan.map((day, index) => (
                                        <Box key={index}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '20%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            color: 'white',
                                                            backgroundColor: '#FFA500',
                                                            width: '40px',
                                                            height: '40px',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            borderRadius: '10px'
                                                        }}
                                                    >
                                                        <p style={{margin: '-2px 0 0 0'}}>01</p>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: '80%'
                                                    }}
                                                >
                                                    <p style={{color: '#00004d', fontSize: '25px', fontWeight: 'bold', margin: '0 0 0 0'}}>Day {index + 1}: {day.dayTitle}</p>
                                                </Box>
                                            </Box>
                                            {/* <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '20%'
                                                    }}
                                                >

                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: '80%'
                                                    }}
                                                >
                                                    <p style={{color: '#00004d', fontWeight: '500', fontSize: '15px'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam ea vel, sint eaque delectus, quidem quia quaerat non error architecto rerum ab veritatis incidunt sit dolorem aperiam nulla sunt quibusdam?</p>
                                                </Box>
                                            </Box> */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '20%'
                                                    }}
                                                >

                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: '80%'
                                                    }}
                                                >
                                                    <ul style={{paddingLeft: '2ch', color: '#00004d', fontWeight: '500', fontSize: '15px'}}>
                                                    {day.dayInformation && day.dayInformation.split('.').map((detail, idx) => (
                                                        // Check if detail is not empty after trimming
                                                        detail.trim() && <li key={idx}>{detail.trim()}</li>
                                                    ))}
                                                    </ul>
                                                </Box>
                                            </Box>
                                        </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                            {locationBlock && (
                                <Box>
                                    <Box>
                                        <p style={{color: '#00004d', fontSize: '30px', fontWeight: 'bold', margin: '5px 40px 0 0'}}>Tour Plan</p>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '90%',
                                            height: '50ch',
                                            marginRight: '2ch',
                                            marginTop: '2ch'
                                        }}
                                    >
                                        <GoogleMap mapLink={tour.tourLocationLink}/>
                                    </Box>
                                </Box>
                            )}
                            {galleryBlock && (
                                <Box>
                                </Box>
                            )}
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
    }
};

export default BookTour;
