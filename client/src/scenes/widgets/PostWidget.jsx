import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, IconButton, Typography, useTheme, TextField, Button } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween";
  import Friend from "../../components/Friend";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../../state";
  import UserImage from "../../components/UserImage";
  import Loading from "../../components/Loading";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    isProfile,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const [users, setUsers] = useState({});
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [newComment, setNewComment] = useState('');
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const light = palette.neutral.light;

    const [isLoading, setIsLoading] = useState(false);

    const getUser = async (userId) => {
      setIsLoading(true);
      if (!users[userId]) {
        const response = await fetch(`/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUsers((prevUsers) => ({ ...prevUsers, [userId]: data }));
      }
      setIsLoading(false);
    };
  
    useEffect(() => {
      comments.forEach((comment) => getUser(comment.userId));
    }, [comments]);
  
    const patchLike = async () => {
      const response = await fetch(`/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    const postComment = async () => {
      const response = await fetch(`/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, content: newComment }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setNewComment('');
    };    

    const isUrl = (path) => {
      if (typeof path !== 'string' || path.trim() === '') {
        return false;
      }
      try {
        new URL(path);
        return true;
      } catch (_) {
        return false;  
      }
    };    
  
    return (
      <WidgetWrapper m="2rem 0">
        {isLoading && (
          <Loading />
        )}  
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          showAddFriendButton={!isProfile}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={isUrl(picturePath) ? picturePath : `/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
  <Box display="flex" flexDirection="column" gap="1.2rem" mt="0.5rem">
    {comments.map((comment, i) => {
      const user = users[comment.userId];
      return user ? (
        <Box key={`${comment.userId}-${i}`}>
          <Box display="flex" alignItems="center" backgroundColor={light} padding="0.5rem" borderRadius="10px">
            <UserImage image={user.picturePath} size="30px" />
            <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
              <strong>{user.firstName} {user.lastName}</strong>: {comment.content}
            </Typography>
          </Box>
        </Box>
      ) : null;
    })}
  <Box display="flex" alignItems="center" gap="1rem">
    <TextField
      fullWidth
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      label="Write a comment..."
      InputProps={{ sx: { borderRadius: 30 } }}
    />
    <Button onClick={postComment} sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, width:"130px", height: "40px"}}>Post</Button>
  </Box>
  </Box>
  )}
  </WidgetWrapper>
  );
}

export default PostWidget;