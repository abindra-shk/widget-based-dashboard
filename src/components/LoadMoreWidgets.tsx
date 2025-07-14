import React, { useState } from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { loadWidgetsFromConfig } from "../store/slices/dashboardSlice";
import { loadDefaultConfiguration } from "../utils/configLoader";

const LoadMoreWidgets: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoadMore = (count: number) => {
    const allWidgets = loadDefaultConfiguration();
    dispatch(loadWidgetsFromConfig(allWidgets.slice(0, count)));
    handleClose();
  };

  return (
    <Box sx={{ ml: 2 }}>
      <Button
        variant="contained"
        onClick={handleClick}
        aria-controls="load-more-menu"
        aria-haspopup="true"
      >
        Load Widgets
      </Button>
      <Menu
        id="load-more-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLoadMore(3)}>Load 3 Widgets</MenuItem>
        <MenuItem onClick={() => handleLoadMore(10)}>Load 10 Widgets</MenuItem>
        <MenuItem onClick={() => handleLoadMore(25)}>Load 25 Widgets</MenuItem>
        <MenuItem onClick={() => handleLoadMore(50)}>Load All (50)</MenuItem>
      </Menu>
    </Box>
  );
};

export default LoadMoreWidgets;
