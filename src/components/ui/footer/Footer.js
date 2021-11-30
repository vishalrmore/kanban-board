import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../copyright/Copyright";

const Footer = () => {
  return (
    <>
      <Box sx={{ flex: "1 1 auto" }}>
        <CssBaseline />
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "#1976d2",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" color="white">
            kanban board 
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  );
};

export default Footer;
