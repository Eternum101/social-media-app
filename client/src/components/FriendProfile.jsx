import { useState } from "react";
import { Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import { SERVER_URL } from "../App";

const FriendProfile = ({ friendId }) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const [isProfileFriend, setIsProfileFriend] = useState(Array.isArray(friends) && Boolean(friends.find((friend) => friend._id === friendId)));
  const isFriend = Array.isArray(friends) && friends.some(friend => friend._id === friendId);

  const patchFriend = async () => {
    if (loggedInUserId === friendId) {
      return;
    }
    const response = await fetch(
      `${SERVER_URL}/users/${loggedInUserId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    setIsProfileFriend(!isProfileFriend);
  };

  return (
    loggedInUserId !== friendId && (
      <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} onClick={patchFriend}>
        {isFriend ? <>Friends <DoneIcon sx={{ marginLeft: '5px' }}/></> : 'Add Friend'}
      </Button>
    )
  );
}

export default FriendProfile;