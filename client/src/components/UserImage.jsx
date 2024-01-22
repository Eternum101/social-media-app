import { Box } from "@mui/material";

const UserImage =({ image, size="60px"}) => {
    const imageUrl = image.startsWith('http') ? image : `http://localhost:5000/assets/${image}`;

    return (
        <Box width={size} height={size}>
            <img style={{ objectFit: "cover", borderRadius: "50%"}}
            width={size} height={size}
            alt ="user"
            src={imageUrl}
            >
            </img>
        </Box>
    )
}

export default UserImage;
