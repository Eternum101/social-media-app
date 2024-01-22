import {Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="100vh" bgcolor="white">
      <Box display="flex" flexDirection={isNonMobileScreens ? "row" : "column"} alignItems="center" justifyContent="space-between">
        <Box width={isNonMobileScreens ? "45%" : "93%"} padding="2rem" margin="2rem auto" borderRadius="1.5rem">
        <Box display="flex" flexDirection="column" gap="20px" marginBottom="20px">
          <Typography variant="h1">Welcome to <span>Flicker.</span></Typography>
          <Typography variant="h5"> Discover and connect with people who share your passions and interests. Join Flicker today and start flicking!</Typography>
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
