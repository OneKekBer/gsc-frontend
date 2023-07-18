import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import FlexCenterColumn from "../../components/flexCenterColumn";
import { useTheme } from "@emotion/react";

export default function AdvantagesBlock({ title, disc }) {
    const theme = useTheme();
    const yellow = theme.palette.primary.yellow;
    const lightYellow = theme.palette.primary.lightYellow;

    return (
        <FlexCenterColumn
            sx={{
                backgroundColor: `${yellow}`,
                // padding: isNonMobileScreen
                //     ? "40px 100px 40px 100px"
                //     : "20px 40px 20px 40px",
                borderRadius: "32px",
                textAlign: "center",
                transition: "all .4s ease",

                height: "40vh",
                overflow: "hidden",

                "&:hover": {
                    backgroundColor: `${lightYellow}`,
                    cursor: "pointer",
                },
            }}
        >
            <Typography mb={1} variant="h3">
                {title}
            </Typography>
            <Typography variant="text2">{disc}</Typography>
        </FlexCenterColumn>
    );
}
