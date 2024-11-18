import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    InputAdornment,
    AppBar,
    IconButton,
    InputBase,
} from "@mui/material";

import Menu from "@mui/icons-material/Menu";

import SearchIcon from "@mui/icons-material/Search";
import CreatePost from "@mui/icons-material/EditCalendar";
import { useAnalytic } from "./analyticCalc-Hook";

function TopBar(props) {
    const { getSearchedTours } = useAnalytic();
    const navigate = useNavigate();
    const [searchBar, setSearchBar] = useState("");
    return (
        <AppBar
            sx={{
                bgcolor: "#282828",
                height: "10%",
            }}
        >
            <Box
                component="div"
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <IconButton sx={{ margin: "20px", borderRadius: "0px" }}>
                    <Menu
                        fontSize="medium"
                        sx={{ color: "white" }}
                        onClick={() =>
                            props.setOpen((prevOpen) => {
                                return !prevOpen;
                            })
                        }
                    />
                </IconButton>
                {props.showBar ? (
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexBasis: "100%",
                            marginLeft: "15%",
                        }}
                    >
                        <InputBase
                            sx={{
                                width: "60%",
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "white",
                                border: "1px solid white",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                                paddingTop: "5px",
                                paddingBottom: "5px",
                            }}
                            placeholder={`Search ${props.searchType} Ads`}
                            autoFocus={true}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "white" }} />
                                </InputAdornment>
                            }
                            onChange={(e) => {
                                props.setData(
                                    getSearchedTours(
                                        e.target.value,
                                        props.searchType
                                    )
                                );
                                console.log(
                                    getSearchedTours(
                                        e.target.value,
                                        props.searchType
                                    )
                                );
                            }}
                        />
                    </Box>
                ) : (
                    <Box
                        component="div"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexBasis: "100%",
                            marginLeft: "15%",
                        }}
                    ></Box>
                )}
                {props.show ? (
                    <IconButton
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "50px",
                            color: "white",
                            border: "1px solid white",
                            borderRadius: "0px",
                            gap: "10px",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                        }}
                        onClick={() => {
                            navigate("/current-agency/create-tour");
                        }}
                    >
                        <CreatePost
                            fontSize="large"
                            sx={{ color: "#FF4E45" }}
                        />

                        <Box component="div" fontSize={16} fontWeight={700}>
                            CREATE
                        </Box>
                    </IconButton>
                ) : (
                    <></>
                )}
            </Box>
        </AppBar>
    );
}

export default TopBar;
