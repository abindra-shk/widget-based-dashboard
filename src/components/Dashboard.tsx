import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import { Container, Alert, styled } from "@mui/material";
import {
  updateWidgetLayout,
  type Widget,
} from "../store/slices/dashboardSlice";
import WidgetFactory from "./widgets/WidgetFactory";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { RootState } from "../store";

const ResponsiveGridLayout = WidthProvider(Responsive);
const StyledGridLayout = styled(ResponsiveGridLayout)({
  "& .react-resizable-handle": {
    backgroundImage: "none",
    "&::after": {
      content: '""',
      position: "absolute",
      right: "5px",
      bottom: "5px",
      width: "12px",
      height: "12px",
      borderRight: "3px solid rgba(255, 255, 255, 0.8)",
      borderBottom: "3px solid rgba(255, 255, 255, 0.8)",
      transition: "opacity 0.2s",
    },
    "&:hover::after": {
      opacity: 1,
      borderColor: "white",
    },
  },
  "& .drag-handle": {
    opacity: 0.6,
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 1,
      color: "white !important",
    },
  },
});

const Dashboard: React.FC = () => {
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  const dispatch = useDispatch();

  // Load and save widgets to localStorage
  useLocalStorage();

  // Convert widgets to grid layout format
  const layouts = {
    lg: widgets.map((widget: Widget) => ({
      i: widget.id,
      x: widget.x,
      y: widget.y,
      w: widget.w,
      h: widget.h,
    })),
  };

  // Handle layout changes (drag/drop/resize)
  const handleLayoutChange = useCallback(
    (layout: Layout[]) => {
      layout.forEach((item) => {
        dispatch(
          updateWidgetLayout({
            id: item.i,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          })
        );
      });
    },
    [dispatch]
  );

  // Grid breakpoints and column counts
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Dashboard Grid */}
      {widgets.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No widgets available. Click "Add Widget" to get started!
        </Alert>
      ) : (
        <StyledGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={60}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          onLayoutChange={handleLayoutChange}
          isDraggable={true}
          isResizable={true}
          draggableCancel=".MuiIconButton-root, .MuiTextField-root, .MuiButton-root"
          autoSize={true}
          draggableHandle=".drag-handle" // Only allow dragging via drag handle
        >
          {widgets.map((widget: Widget) => (
            <div key={widget.id}>
              <WidgetFactory widget={widget} />
            </div>
          ))}
        </StyledGridLayout>
      )}
    </Container>
  );
};

export default Dashboard;
