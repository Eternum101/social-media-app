import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import ProfileFriendListWidget from "../widgets/ProfileFriendListWidget";
import PostsWidget from "../widgets/PostsWidget";
import ProfileUserWidget from "../widgets/ProfileUserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import Loading from "../../components/Loading";
import { SERVER_URL } from "../../App";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const loggedInUserId = useSelector((state) => state.user._id);
  const picturePath = useSelector((state) => state.user.picturePath);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
  const [isLoading, setIsLoading] = useState(false);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(`${SERVER_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    setIsLoading(false);
  }, [userId, token]);
  
  useEffect(() => {
    getUser();
  }, [getUser]); 

  if (!user) return null;

  return (
    <Box>
      {isLoading && (
        <Loading />
      )}  
      <Navbar userId={loggedInUserId}/>
      <Box
        width="100%"
        maxWidth="1200px"
        padding="2rem 6%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        margin="auto"
      >
        <ProfileUserWidget userId={userId} picturePath={picturePath} />
        {console.log('ProfileUserWidget props:', { userId, picturePath })}
        {!isNonMobileScreens && (
        <Box margin="2rem 0">
          <ProfileFriendListWidget userId={userId} friends={friends} isProfile/>
        </Box>
      )}
        <Box
          display={isNonMobileScreens ? "flex" : "column"}
          flexDirection={isNonMobileScreens ? "row" : "column"}
          gap="2rem"
        >
          {isNonMobileScreens && (
            <Box width="500px" margin="2rem 0">
              <ProfileFriendListWidget userId={userId} friends={friends} isProfile/>
            </Box>
          )}
        <Box flexBasis={isNonMobileScreens ? "70%" : "100%"} margin={loggedInUserId === userId ? "2rem 0" : "0"}>
          {loggedInUserId === userId && <MyPostWidget userId={userId} picturePath={picturePath}/>}
          <PostsWidget userId={userId} isProfile />
        </Box>
</Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;