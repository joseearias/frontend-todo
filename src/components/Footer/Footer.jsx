import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center">
          Todo App
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          By José Arias
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
