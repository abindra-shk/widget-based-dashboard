import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
              Widget Based Dashboard
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Scalable, configurable dashboard with drag-and-drop widgets
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontWeight: "bold" }}
          >
            Add Widget
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
