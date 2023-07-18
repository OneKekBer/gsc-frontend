import { Box, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Confirmation = () => {
    const navigate = useNavigate();

    return (
        <Box m="90px auto" width="80%" height="50vh">
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                You have successfully made an Order —{" "}
                <strong>Congrats on Making your Purchase</strong>
            </Alert>
            <Button
                display="flex"
                alignItems="center"
                variant="outlined"
                color="primary"
                onClick={() => navigate("/catalog")}
                sx={{
                    boxShadow: "none",

                    borderRadius: 0,
                    padding: "15px 40px",
                }}
            >
                <ArrowBackIcon />
                Back to shopping
            </Button>
        </Box>
    );
};

export default Confirmation;
