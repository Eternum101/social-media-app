import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import Loading from "../../components/Loading";

const FriendListWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const [isLoading, setIsLoading] = useState(false);

  const getFriends = async () => {
    setIsLoading(true);
    const response = await fetch(
      `/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
    setIsLoading(false);
  }, [friends]);

  return (
    <WidgetWrapper>
      {isLoading && (
        <Loading />
      )}  
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {Array.isArray(friends) && friends.map((friend) => (
      <Friend
        key={friend._id}
        friendId={friend._id}
        name={`${friend.firstName} ${friend.lastName}`}
        subtitle={friend.occupation}
        userPicturePath={friend.picturePath}
        showAddFriendButton={!isProfile}
      />
    ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;