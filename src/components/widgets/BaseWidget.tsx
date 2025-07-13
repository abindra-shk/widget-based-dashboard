import React, { useState } from "react";
import { Paper, IconButton, Typography, Box } from "@mui/material";
import { DragIndicator, Delete, Edit } from "@mui/icons-material";
import WidgetFormModal from "../WidgetFormModal";

interface BaseWidgetProps {
  id: string;
  title: string;
  type: "chart" | "table" | "text";
  config: any;
  w: number;
  h: number;
  children: React.ReactNode;
  onDelete: () => void;
  onSubmit: (data: {
    type: any;
    title: string;
    config: any;
    w?: number;
    h?: number;
  }) => void;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({
  id,
  title,
  type,
  config,
  w,
  h,
  children,
  onDelete,
  onSubmit,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: isDragging ? "#2a2a2a" : "#1e1e1e",
          color: "#ffffff",
          borderRadius: 2,
          transition: "background-color 0.2s ease",
          border: isDragging ? "1px solid #3949ab" : "1px solid transparent",
          "&:hover": {
            backgroundColor: "#252525",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.2,
            borderBottom: "1px solid #333",
            backgroundColor: isDragging ? "#3949ab" : "#2c2c2c",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            transition: "background-color 0.2s ease",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DragIndicator
              sx={{
                cursor: "grab",
                color: "#bbb",
                "&:active": { cursor: "grabbing" },
              }}
              className="drag-handle"
              onMouseDown={handleDragStart}
              onMouseUp={handleDragStop}
              onMouseLeave={handleDragStop}
            />
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontSize: "0.9rem", fontWeight: 600 }}
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <IconButton
              size="small"
              onClick={handleEditClick}
              sx={{ color: "info.main" }}
              title="Edit Widget"
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDeleteClick}
              sx={{ color: "#f44336" }}
              title="Delete Widget"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: 2, overflow: "hidden" }}>{children}</Box>
      </Paper>

      <WidgetFormModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={onSubmit}
        initialData={{ id, type, title, config, w, h }}
      />
    </>
  );
};

export default BaseWidget;
