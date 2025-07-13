import React from "react";
import { Typography, Box } from "@mui/material";
import BaseWidget from "./BaseWidget";
import type { Widget } from "../../types";

interface TextWidgetProps {
  widget: Widget;
  baseProps: any;
}

const defaultTextContent =
  "This is a sample text widget. You can customize this content through the widget configuration.";

const TextWidget: React.FC<TextWidgetProps> = ({ widget, baseProps }) => {
  const content = widget.config?.content || defaultTextContent;
  console.log("text");

  return (
    <BaseWidget {...baseProps}>
      <Box sx={{ height: "100%", overflow: "auto", p: 1 }}>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}
        >
          {content}
        </Typography>
      </Box>
    </BaseWidget>
  );
};

export default React.memo(TextWidget);
