import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileFriends } from "../../state";
import Loading from "../../components/Loading";
import { SERVER_URL } from "../../App";

const ProfileFriendListWidget = ({ userId, friends }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const profileFriends = useSelector((state) => state.profileFriends); // You'll need to add this to your state

  const [isLoading, setIsLoading] = useState(false);

  const getProfileFriends = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `${SERVER_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setProfileFriends({ friends: data }));
    setIsLoading(false);
  }, [userId, token, dispatch]);
  
  useEffect(() => {
    getProfileFriends();
  }, [getProfileFriends]);  

  return (
    <WidgetWrapper>
      {isLoading && (
        <Loading />
      )}  
      <Typography
        color={palette.neutral.main}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {Array.isArray(profileFriends) && profileFriends.map((friend) => (
      <Friend
        key={friend._id}
        friendId={friend._id}
        name={`${friend.firstName} ${friend.lastName}`}
        subtitle={friend.occupation}
        userPicturePath={friend.picturePath}
      />
    ))}
      </Box>
    </WidgetWrapper>
  );
};

export default ProfileFriendListWidget;
