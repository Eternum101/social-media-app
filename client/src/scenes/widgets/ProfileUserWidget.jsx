import {
    LocationOnOutlined,
    WorkOutlineOutlined,
    CameraAlt,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../../components/UserImage";
  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useSelector,  useDispatch } from "react-redux";
  import { useEffect, useState, useRef } from "react";
  import FriendProfile from "../../components/FriendProfile";
  import Loading from "../../components/Loading";
  import { setPicturePath } from "../../state";

  const ProfileUserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const loggedInUserId = useSelector((state) => state.user._id);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const fileInputRef = useRef();
    const dispatch = useDispatch();
  
    const getUser = async () => {
      setIsLoading(true);
      const response = await fetch(`/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    };
  
    useEffect(() => {
      getUser();
    }, [userId]);
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
    } = user;

const onFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileUpload(file);
};

const onFileUpload = async (file) => {
    if (!file) {
        return;
    }

    const formData = new FormData();
    formData.append("picturePath", file.name);
    formData.append("picture", file);

    const response = await fetch(`/users/${userId}/updateProfilePicture`, {
        method: "PATCH",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const user = await response.json();
        setUser(user);
        dispatch(setPicturePath(user.picturePath));
    }
};

  const onImageClick = () => {
    fileInputRef.current.click();
  };
    
  return (
    <WidgetWrapper>
      {isLoading && (
        <Loading />
      )}
      <Box display="flex" flexDirection="row" justifyContent="center" gap="2rem">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="1rem">
        {userId === loggedInUserId ? (
        <Box 
          onClick={onImageClick} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{ position: 'relative', "&:hover": { cursor: "pointer", opacity: "0.5"} }}
        >
      <UserImage image={picturePath} size="200px"/>
      {isHovered && (
    <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          color: 'white' 
        }}
      >
      <CameraAlt style={{ fontSize: 60 }}/>
    </Box>
    )}
    <Box>
      <input type="file" onChange={onFileChange} ref={fileInputRef} style={{ display: 'none' }}/>
    </Box>
  </Box>
      ) : (
        <UserImage image={user.picturePath} size="200px"/>
      )}
         <Typography variant="h4" color={main} fontWeight="500">
              {firstName} {lastName}
            </Typography>
        </Box>
        <Box ml={2} display="flex" flexDirection="row" justifyContent="center" gap="3rem">
          <Box>
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                  <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                  <Typography color={medium}>{location}</Typography>
                </Box>
              <Box display="flex" alignItems="center" gap="1rem">
                  <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                  <Typography color={medium}>{occupation}</Typography>
              </Box>
            </Box>
            <Divider />      
          <Box p="1rem 0">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb="0.5rem">
            <Box width={200}>
              <Typography color={medium}>Views:</Typography>
          </Box>
          <Box>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box width={200}>
            <Typography color={medium}>Impressions:</Typography>
          </Box>
        <Box>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start">
        <FriendProfile friendId={userId}/>
      </Box>
    </Box>
          </Box>
          <Box p="1rem 0">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
              Social Profiles
            </Typography>
    
            <FlexBetween gap="1rem" mb="0.5rem">
              <FlexBetween gap="1rem">
                <img src="../assets/twitter.png" alt="twitter" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Twitter
                  </Typography>
                  <Typography color={medium}>Social Network</Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>
    
            <FlexBetween gap="1rem">
              <FlexBetween gap="1rem">
                <img src="../assets/linkedin.png" alt="linkedin" />
                <Box>
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};
  
export default ProfileUserWidget;