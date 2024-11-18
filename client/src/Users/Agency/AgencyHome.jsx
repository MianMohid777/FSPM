import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";

import DP from "../../Assets/Karakoram.jpg";
import emptyUser from "../../Assets/emptyUser.png";
import { useSelector, useDispatch } from "react-redux";
import {
    useGetAgencyQuery,
    useGetAllToursQuery,
    useUpdateTourStatusMutation,
    useGetAgencyProfileQuery,
    useCreateProfileMutation,
} from "../../Services/Agency/agencyApi";

import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";

import Loader from "../../Utils/Loader";
import {
    addAuthAgency,
    addProfile,
    addTours,
} from "../../Redux/Features/agencySlice";
import TourPost from "../../Utils/TourPost";
import terror from "../../Assets/terror.jpg";
import LeftDrawer from "../../Utils/LeftDrawer";
import TopBar from "../../Utils/TopBar";

function AgencyHome() {
    const theme = createTheme({
        typography: {
            fontFamily: "'Space Grotesk', sans-serif",
        },
    });

    //Hooks
    const { setItem, getItem } = useLocalStorage("access_token");
    const { setItem: setRefItem, getItem: getRefItem } =
        useLocalStorage("refresh_token");
    const [dataState, setDataState] = useState([]);

    const accessToken = getItem();

    const [open, setOpen] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [setSearchBar] = useState("");

    const navigate = useNavigate();
    const agency = useSelector((state) => state.agency);
    const dispatch = useDispatch();

    // QUERY // MUTATIONS

    const { data, isLoading, isError, isSuccess, refetch } =
        useGetAllToursQuery({
            id: agency.authAgency.id,
            accessToken: accessToken,
        });

    const {
        isLoading: isAgencyLoading,
        isError: agencyError,
        refetch: currAgency,
    } = useGetAgencyQuery({ accessToken: accessToken });

    const {
        data: agencyProfile,
        isLoading: profileLoading,
        isError: profileErr,
        isSuccess: profileSuccess,
        refetch: profileFetch,
    } = useGetAgencyProfileQuery({
        id: agency.authAgency.id,
        accessToken: accessToken,
    });

    const [updateTourStatus, { isLoading: updating, isError: updateErr }] =
        useUpdateTourStatusMutation();

    const [createProfile, { isLoading: createLoading }] =
        useCreateProfileMutation();

    console.log("Get Response", agencyProfile);

    useEffect(() => {
        const checkUpdates = async () => {
            try {
                if (accessToken) {
                    const response = await updateTourStatus({
                        id: agency.authAgency.id,
                        accessToken: accessToken,
                    }).unwrap();

                    if (response) {
                        console.log(response);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        setDataState(data);
        checkUpdates();
        refetch();
        currAgency();
    }, []);

    // HANDLE MENU STATES
    const handleClick = (idx) => {
        setSelectedIdx(idx);
    };

    // HANDLE ERROR & SUCCESS RESPONSE

    if (isError || agencyError) {
        console.log("Its GET TOURS API ERROR", isError);
        console.log(agencyError);
        console.log(profileErr);
        setItem("");
        setRefItem("");
        dispatch(addAuthAgency({}));
        dispatch(addProfile({}));
        dispatch(addTours([{}]));

        console.log("Logging Out");
        navigate("/agency-login", { replace: true });
    }

    const handleAgencyError = async () => {
        const payload = {
            agencyId: agency.authAgency.id,
            name: agency.authAgency.name,
            phoneNumber: agency.authAgency.contactNo,
            description: "Hi, We are........................",
            profilePicture: "Space.jpg",
            gallery: [],
            webiste: "www.myAgency.com",
            socialMediaLinks: {
                faceBook: "fb.com",
                instagram: "insta.com",
                twitter: "twitter.com",
            },
        };
        console.log(payload);
        try {
            const response = await createProfile(payload).unwrap();

            if (response) {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (profileErr) {
            handleAgencyError();
            profileFetch();
        }
    }, [profileErr]);

    useEffect(() => {
        if (isSuccess && !isLoading) {
            console.log(data.tours);
            setDataState(data.tours);
            console.log(dataState);
            console.log("Dispatched");
            dispatch(addTours(data?.tours));
        }
    }, [data]);

    useEffect(() => {
        if (profileSuccess && !profileLoading) {
            console.log(agencyProfile.profile);
            console.log("Dispatched Profile");
            dispatch(addProfile(agencyProfile?.profile));
        }
    }, [agencyProfile]);

    //LOADER LOGIC
    if (
        isLoading ||
        isAgencyLoading ||
        updating ||
        profileLoading ||
        createLoading
    )
        return <Loader />;

    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography>
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 999,
                            backgroundColor: "#282828",
                            color: "white",
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Grid
                                container
                                sx={{
                                    backgroundColor: "#1F1F1F",
                                    height: "100vh",
                                }}
                            >
                                <Grid item lg={12}>
                                    <TopBar
                                        setOpen={setOpen}
                                        setSearchBar={setSearchBar}
                                        show={true}
                                        showBar={true}
                                        searchType={"All"}
                                        setData={setDataState}
                                    />
                                    <LeftDrawer
                                        open={open}
                                        setOpen={setOpen}
                                        handleClick={handleClick}
                                        selectedIdx={selectedIdx}
                                    />
                                </Grid>
                                <Grid item lg={3} sx={{ height: "100%" }}>
                                    <Box
                                        component="div"
                                        sx={{
                                            backgroundColor: "#282828",
                                            width: "100%",
                                            height: "100vh",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            sx={{
                                                height: "200px",
                                                width: "200px",
                                                borderRadius: "50%",
                                                marginTop: "40%",
                                                backgroundImage: `url(${emptyUser})`,
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                            }}
                                            src={`http://localhost:3002/api/static/${agency.profile.profilePicture}`}
                                        />
                                        <Box
                                            component="div"
                                            mt={2}
                                            sx={{
                                                color: "white",
                                                fontSize: "22px",
                                                fontWeight: 700,
                                            }}
                                        >
                                            Your Agency
                                        </Box>
                                        <Box
                                            component="div"
                                            sx={{
                                                color: "#AAAAAA",
                                                fontSize: "18px",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {agency.authAgency.name}
                                        </Box>

                                        {/* Company Info */}

                                        <Box
                                            component="div"
                                            sx={{
                                                border: "1px solid white",
                                                color: "white",
                                                fontSize: "12px",
                                                fontWeight: 700,
                                                padding: "10px",
                                                margin: "10px",
                                                marginTop: "20px",
                                                borderRadius: "5px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                            }}
                                        >
                                            <Box
                                                component="div"
                                                mt={1}
                                                sx={{
                                                    fontSize: "18px",
                                                    fontWeight: 800,
                                                    textAlign: "center",
                                                }}
                                            >
                                                Company Information
                                            </Box>
                                            <Box component="div" mt={2}>
                                                Admin Name:
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        color: "#AAAAAA",
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {"  "}
                                                    {
                                                        agency.authAgency
                                                            .adminName
                                                    }
                                                </Box>
                                            </Box>
                                            <Box component="div">
                                                Company Email:
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        color: "#AAAAAA",
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {"  "}
                                                    {agency.authAgency.email}
                                                </Box>
                                            </Box>
                                            <Box component="div">
                                                Company NTN:
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        color: "#AAAAAA",
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {"  "}
                                                    {agency.authAgency.ntn}
                                                </Box>
                                            </Box>
                                            <Box component="div">
                                                Company License:
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        color: "#AAAAAA",
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {"  "}
                                                    {agency.authAgency.license}
                                                </Box>
                                            </Box>
                                            <Box component="div">
                                                Office Address:
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        color: "#AAAAAA",
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {"  "}
                                                    {agency.authAgency.address}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item lg={9} sx={{ height: "100%" }}>
                                    <Box
                                        sx={{
                                            marginTop: "15%",
                                            padding: "20px",
                                            height: "calc(100vh - 25%)",
                                            width: "calc(70vw)",
                                            overflowY: "auto",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            alignContent: "flex-start",
                                            gap: "50px",
                                        }}
                                    >
                                        {dataState &&
                                        Array.isArray(dataState) &&
                                        dataState.length > 0 ? (
                                            dataState?.map((tour) => {
                                                return (
                                                    <TourPost
                                                        agencyName={
                                                            agency.authAgency
                                                                .name
                                                        }
                                                        img={`http://localhost:3002/api/static/${tour.tourLocationImage}`}
                                                        locationName={
                                                            tour.tourLocationName
                                                        }
                                                        info={
                                                            tour.tourInformation
                                                        }
                                                        price={tour.tourPrice}
                                                        startDate={
                                                            tour.tourStartDate
                                                        }
                                                        endDate={
                                                            tour.tourEndDate
                                                        }
                                                        status={tour.tourStatus}
                                                        slots={
                                                            tour.tourMaxSlots
                                                        }
                                                    />
                                                );
                                            })
                                        ) : (
                                            <Box
                                                component="div"
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginTop: "10%",
                                                    borderRadius: "30px",
                                                    width: "100vw",
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={terror}
                                                    sx={{
                                                        width: "220px",
                                                        height: "200px",
                                                        boxShadow:
                                                            "0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 25px 0 rgba(0, 0, 0, 0.19)",
                                                        borderRadius: "30px",
                                                    }}
                                                />
                                                <Box
                                                    component="div"
                                                    mt={3}
                                                    sx={{
                                                        fontSize: "40px",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {" "}
                                                    Nothing to Show !
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Typography>
            </ThemeProvider>
        </>
    );
}
export default AgencyHome;
