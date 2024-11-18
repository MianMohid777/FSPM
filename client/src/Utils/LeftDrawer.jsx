import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Drawer,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import HistoryIcon from "@mui/icons-material/History";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useLocalStorage } from "./useLocalStorage-Hook";
import {
    addAuthAgency,
    addProfile,
    addTours,
} from "../Redux/Features/agencySlice";

function LeftDrawer(props) {
    const [color, setColor] = useState({
        dash: "white",
        profile: "white",
        ads: "white",
        history: "white",
        stats: "white",
        manage: "white",
        logout: "white",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setItem, getItem } = useLocalStorage("access_token");
    const { setItem: setRefItem, getItem: getRefItem } =
        useLocalStorage("refresh_token");

    return (
        <Drawer
            open={props.open}
            sx={{
                boxSizing: "border-box",

                "& .MuiDrawer-paper": {
                    width: "20%",
                    boxSizing: "border-box",
                    backgroundColor: "#282828",
                    color: "#FF4E45",
                },
            }}
            variant="temporary"
            anchor="left"
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    ml: "auto",
                    mt: 1,
                    mr: 2,
                    cursor: "pointer",
                }}
                onClick={() =>
                    props.setOpen((prevOpen) => {
                        return !prevOpen;
                    })
                }
            >
                <CloseIcon sx={{ color: "white" }} />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 0.5,
                    mt: 3,
                }}
            >
                <Divider />
                <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                        <ListItemButton
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                    color: "#FF4E45",
                                },
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                                color: "white",
                            }}
                            selected={props.selectedIdx === 0}
                            onClick={() => {
                                props.handleClick(0);
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    dash: "#FF4E45",
                                }));
                                navigate("/agency-home");
                            }}
                            onBlur={() => {
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    dash: "white",
                                }));
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: color.dash }} />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
                <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                        <ListItemButton
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                    color: "#FF4E45",
                                },
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                                color: "white",
                            }}
                            selected={props.selectedIdx === 1}
                            onClick={() => {
                                props.handleClick(1);
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    profile: "#FF4E45",
                                }));
                                navigate("/current-agency/profile");
                            }}
                            onBlur={() => {
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    profile: "white",
                                }));
                            }}
                        >
                            <ListItemIcon>
                                <StoreIcon sx={{ color: color.profile }} />
                            </ListItemIcon>

                            <ListItemText primary="Agency Profile"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
                <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                        <ListItemButton
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                    color: "#FF4E45",
                                },
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                                color: "white",
                            }}
                            selected={props.selectedIdx === 2}
                            onClick={() => {
                                props.handleClick(2);
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    ads: "#FF4E45",
                                }));

                                navigate("/current-agency/active-ads");
                            }}
                            onBlur={() => {
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    ads: "white",
                                }));
                            }}
                        >
                            <ListItemIcon>
                                <DynamicFeedIcon sx={{ color: color.ads }} />
                            </ListItemIcon>
                            <ListItemText primary="Active Ads"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
                <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                        <ListItemButton
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                    color: "#FF4E45",
                                },
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                                color: "white",
                            }}
                            selected={props.selectedIdx === 3}
                            onClick={() => {
                                props.handleClick(3);
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    history: "#FF4E45",
                                }));
                                navigate("/current-agency/past-ads");
                            }}
                            onBlur={() => {
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    history: "white",
                                }));
                            }}
                        >
                            <ListItemIcon>
                                <HistoryIcon sx={{ color: color.history }} />
                            </ListItemIcon>
                            <ListItemText primary="Ads History"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
                <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                        <ListItemButton
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                    color: "#FF4E45",
                                },
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                                color: "white",
                            }}
                            selected={props.selectedIdx === 4}
                            onClick={() => {
                                props.handleClick(4);
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    stats: "#FF4E45",
                                }));

                                navigate("/current-agency/analytics");
                            }}
                            onBlur={() => {
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    stats: "white",
                                }));
                            }}
                        >
                            <ListItemIcon>
                                <QueryStatsIcon sx={{ color: color.stats }} />
                            </ListItemIcon>
                            <ListItemText primary="Analytics"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
                <Divider />
                <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                        <ListItemButton
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                    color: "#FF4E45",
                                },
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                                color: "white",
                            }}
                            selected={props.selectedIdx === 5}
                            onClick={() => {
                                props.handleClick(5);
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    manage: "#FF4E45",
                                }));
                                navigate("/current-agency/manage-ads");
                            }}
                            onBlur={() => {
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    manage: "white",
                                }));
                            }}
                        >
                            <ListItemIcon>
                                <ManageAccountsIcon
                                    sx={{ color: color.manage }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Manage Ads"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                        <ListItemButton
                            sx={{
                                "&.Mui-selected": {
                                    backgroundColor: "black",
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                    color: "#FF4E45",
                                },
                                "&:hover": {
                                    backgroundColor: "black",
                                },
                                color: "white",
                            }}
                            selected={props.selectedIdx === 6}
                            onClick={() => {
                                props.handleClick(5);
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    logout: "#FF4E45",
                                }));

                                setItem("");
                                setRefItem("");
                                dispatch(addAuthAgency({}));
                                dispatch(addProfile({}));
                                dispatch(addTours([{}]));

                                console.log("Logging Out");
                                navigate("/agency-login");
                            }}
                            onBlur={() => {
                                setColor((prevColor) => ({
                                    ...prevColor,
                                    logout: "white",
                                }));
                            }}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon sx={{ color: color.logout }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout"></ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default LeftDrawer;
