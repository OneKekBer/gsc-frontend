const { default: styled } = require("@emotion/styled");
const { Box, useMediaQuery } = require("@mui/material");

const Container = styled(Box)({
    padding: "10px 7%",
    marginBottom: "10vh",
});

export default Container;
