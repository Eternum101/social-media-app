import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={main} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Create Ad
                </Typography>
            </FlexBetween>
            <img width="100%" height="auto" alt="advert" src="/assets/info4.jpeg" style={{ borderRadius: "0.75rem", margin:"0.75rem 0"}}/>
            <FlexBetween>
                <Typography color={main}>
                    Biobeauty
                </Typography>
                <Typography color={medium}>
                    biobeauty.com
                </Typography>
            </FlexBetween>
            <Typography color={medium} margin="0.5rem 0">
                Our carefully curated portfolio of exclusive professional brands empower our network of over 2,000 salon customers to offer world-leading products and beauty services ... without compromise.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;