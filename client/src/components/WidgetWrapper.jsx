import { Box } from "@mui/material";
import { styled } from "@mui/system"; 

const WidgetWrapper = styled(Box) (({ theme }) => ({
    padding: "1.5rem 1.5rem 1rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem",
    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
}));

export default WidgetWrapper;