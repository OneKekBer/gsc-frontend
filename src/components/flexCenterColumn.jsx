const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

const FlexCenterColumn = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
});
export default FlexCenterColumn;
