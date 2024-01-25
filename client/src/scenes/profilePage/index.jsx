import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import ProfileUserWidget from "scenes/widgets/ProfileUserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const loggedInUserId = useSelector((state) => state.user._id);
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
        maxWidth="1200px"
        padding="2rem 6%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        margin="auto"
      >
        <ProfileUserWidget userId={userId} picturePath={user.picturePath} />
        <Box />
        <Box
          display={isNonMobileScreens ? "flex" : "column"}
          flexDirection={isNonMobileScreens ? "row" : "column"}
          gap="2rem"
        >
          {isNonMobileScreens && (
            <Box width="500px" margin="2rem 0">
              <FriendListWidget userId={userId} />
            </Box>
          )}
        <Box flexBasis={isNonMobileScreens ? "70%" : "100%"} margin={loggedInUserId === userId ? "2rem 0" : "0"}>
          {loggedInUserId === userId && <MyPostWidget picturePath={user.picturePath}/>}
          <PostsWidget userId={userId} isProfile />
        </Box>
</Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;