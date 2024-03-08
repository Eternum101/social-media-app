import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "../../components/UserImage";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "../../state";
  import Loading from "../../components/Loading";
  import { SERVER_URL } from "../../App";

  const MyPostWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.mediumMain; 
    const medium = palette.neutral.medium;

    const [isLoading, setIsLoading] = useState(false);

    const getUser = async () => {
      setIsLoading(true);
      const response = await fetch(`${SERVER_URL}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    };
  
    useEffect(() => {
      getUser();
    }, []);
  
    if (!user) {
      return null;
    }

    const handlePost = async() => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`${SERVER_URL}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
        setIsLoading(false); 
    }

    return (
        <WidgetWrapper>
          {isLoading && (
            <Loading />
          )}  
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase placeholder="What's on your mind..." onChange={(e) => setPost(e.target.value)} value={post} sx={{ width: "100%", backgroundColor: palette.neutral.light, borderRadius: "2rem", padding: "1rem 2rem"}}/>
            </FlexBetween>
            {isImage && (
                <Box border={`1px solid ${medium}`} borderRadius="5px" marginTop="1rem" padding="1rem">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setImage(acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!image ? (
                          <p>Add Image Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{image.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                      {image && (
                        <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                            <DeleteOutlined />
                        </IconButton>
                      )}
                    </FlexBetween>
                    )}
                  </Dropzone>
                </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0"}}/>

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium }}}>
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Clip
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Attachment
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>
                                Audio
                            </Typography>
                        </FlexBetween>
                    </>
                ) : <FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{ color: mediumMain }}/>
                </FlexBetween>
                }
              <Button 
                disabled={!post} 
                onClick={handlePost} 
                sx={{ 
                  color: post ? 'black' : palette.background.alt, 
                  backgroundColor: palette.primary.main, 
                  borderRadius: "3rem",
                  '&:disabled': {
                  color: 'rgba(0, 0, 0, 0.5)',
                }
                }}
              >
                POST
              </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
  }

  export default MyPostWidget;