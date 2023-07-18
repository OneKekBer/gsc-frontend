const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

const FlexSpace = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
});

export default FlexSpace;
