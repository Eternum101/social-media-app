import { Box } from "@mui/material";
import { SERVER_URL } from "../App";

const UserImage = ({ image, size = "60px" }) => {
  const imageUrl = image && image.startsWith("http") ? image : `${SERVER_URL}/assets/${image}`;

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={imageUrl}
      />
    </Box>
  );
};

export default UserImage;
