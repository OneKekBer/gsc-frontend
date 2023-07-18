import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";

const ItemAccordion = ({ LargeDiscription, Ingridients, color }) => {
    const theme = useTheme();
    const purple = theme.palette.primary.purple;
    const red = theme.palette.primary.red;
    const blue = theme.palette.primary.blue;
    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography color={color}>Discription</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{LargeDiscription}</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Ingridients</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{Ingridients}</Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ItemAccordion;
