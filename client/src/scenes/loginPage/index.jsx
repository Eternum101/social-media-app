import { useState } from "react";
import {Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { SERVER_URL } from "../../App";
import Loading from "../../components/Loading";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);

  const demoLogin = async () => {
    setIsLoading(true);
    const demoCredentials = {
      email: "johndoe@gmail.com",
      password: "johndoe123",
    };
    const loggedInResponse = await fetch(`${SERVER_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(demoCredentials),
    });
  
    const loggedIn = await loggedInResponse.json();
    dispatch(
      setLogin({
        user: loggedIn.user,
        token: loggedIn.token,
      })
    );
    navigate("/home");
    setIsLoading(false);
  };
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh" bgcolor="white">
    {isLoading && (
      <Loading />
    )}  
      <Box display="flex" flexDirection={isNonMobileScreens ? "row" : "column"} alignItems="center" justifyContent="space-between">
        <Box width={isNonMobileScreens ? "45%" : "93%"} padding="2rem" margin="2rem auto" borderRadius="1.5rem">
        <Box display="flex" flexDirection="column" gap="20px" marginBottom="20px">
          <Typography variant="h1">Welcome to <span>Flicker.</span></Typography>
          <Typography variant="h5"> Discover and connect with people who share your passions and interests. Join Flicker today and start flicking!</Typography>
          <Typography variant="h5" sx={{ color: palette.primary.main, "&:hover": {cursor: "pointer",color: palette.primary.light,},}} onClick={demoLogin}> Try a demo account here.</Typography>
        </Box>
          <Form />
        </Box>
        {isNonMobileScreens && (
          <Box width="45%">
            <img src={`${process.env.PUBLIC_URL}/assets/socialmedia.svg`} alt="Social Media Image" />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default LoginPage;
