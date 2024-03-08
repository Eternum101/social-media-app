import React, { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    FormControl,
    useTheme,
    useMediaQuery,
    Button,
    Alert,
    Snackbar,
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";

const Navbar = ({ userId }) => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light; 
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = user ? `${user.firstName} ${user.lastName}` : '';
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography 
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                }}
                >                
                Flicker. 
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px"}} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message onClick={handleClick} sx={{ fontSize: "25px", "&:hover": { cursor: "pointer" } }} />
                    <Notifications onClick={handleClick} sx={{ fontSize: "25px", "&:hover": { cursor: "pointer" }}} />
                    <Help onClick={handleClick} sx={{ fontSize: "25px", "&:hover": { cursor: "pointer" }}} />
                    <Box sx={{ "&:hover": { cursor: "pointer" } }} onClick={() => navigate(`/profile/${userId}`)}>
                        <UserImage 
                            image={user.picturePath} 
                            size="40px"
                        />
                    </Box>
                    <Button sx={{ fontSize: "0.8rem", backgroundColor: primaryLight, color: dark}} onClick={() => {
                        if (theme.palette.mode === "dark") {
                            dispatch(setMode('light'));
                        }
                        dispatch(setLogout());
                        }}>Log Out
                    </Button>
                </FlexBetween>
                ) : (
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Menu />
                    </IconButton>
                )}   
{!isNonMobileScreens && isMobileMenuToggled && (
    <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background}>
        <Box display="flex" justifyContent="flex-end" padding="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Close />
            </IconButton> 
        </Box>

        <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
            <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px"}}>
                {theme.palette.mode === "dark" ? (
                    <DarkMode sx={{ fontSize: "25px"}} />
                ) : (
                    <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
            </IconButton>
            <Message onClick={handleClick} sx={{ fontSize: "25px", "&:hover": { cursor: "pointer" }}} />
            <Notifications onClick={handleClick} sx={{ fontSize: "25px", "&:hover": { cursor: "pointer" }}} />
            <Help onClick={handleClick} sx={{ fontSize: "25px", "&:hover": { cursor: "pointer" }}} />
            <FormControl variant="standard" value={fullName}>
            <Box sx={{ "&:hover": { cursor: "pointer" } }} onClick={() => navigate(`/profile/${user._id}`)}>
                <UserImage 
                    image={user.picturePath} 
                    size="50px"
                />
            </Box>
            </FormControl>
            <Button sx={{ fontSize: "0.8rem", backgroundColor: primaryLight, color: dark}} onClick={() => {
                if (theme.palette.mode === "dark") {
                    dispatch(setMode('light'));
                }
                dispatch(setLogout());
                }}>Log Out
            </Button>
        </FlexBetween>
    </Box>
    )}
    <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
            position: 'fixed',
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
        }}
        >
        <Alert
            onClose={handleClose}
            severity="info"
            variant="filled"
            sx={{ width: '100%' }}
            color="warning"
        >
        This Button is Used For Display Purposes Only
        </Alert>
    </Snackbar>
    </FlexBetween>
    )
}

export default Navbar;