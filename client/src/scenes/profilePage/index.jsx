import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import ProfileUserWidget from "scenes/widgets/ProfileUserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <ProfileUserWidget userId={userId} picturePath={user.picturePath} />
        <Box />
        <Box
          display={isNonMobileScreens ? "flex" : "column"}
          flexDirection={isNonMobileScreens ? "row" : "column"}
          gap="2rem"
        >
          {isNonMobileScreens && (
            <Box margin="2rem 0"flexBasis="30%">
              <FriendListWidget userId={userId} />
            </Box>
          )}
          <Box flexBasis={isNonMobileScreens ? "70%" : "100%"}>
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;