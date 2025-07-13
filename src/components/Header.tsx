import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import AddWidgetButton from "./AddWidgetButton";
import { clearAllWidgets } from "../store/slices/dashboardSlice";
import { useDispatch } from "react-redux";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
              Widget Based Dashboard
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Scalable, configurable dashboard with drag-and-drop widgets
            </Typography>
          </Box>

          {isMobile ? (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: "100%",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <AddWidgetButton />
              <Button
                color="error"
                variant="outlined"
                onClick={() => dispatch(clearAllWidgets())}
              >
                Clear All
              </Button>
            </Stack>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AddWidgetButton />
              <Button
                color="error"
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => dispatch(clearAllWidgets())}
              >
                Clear All
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
