const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

const FlexCenter = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export default FlexCenter;
