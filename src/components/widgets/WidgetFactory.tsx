import React, { useCallback } from "react";
import type { Widget } from "../../types";
import TextWidget from "./TextWidget";
import ChartWidget from "./ChartWidget";
import TableWidget from "./TableWidget";
import { useDispatch } from "react-redux";
import { removeWidget, updateWidget } from "../../store/slices/dashboardSlice";

interface WidgetFactoryProps {
  widget: Widget;
}

const WidgetFactory: React.FC<WidgetFactoryProps> = ({ widget }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(removeWidget(widget.id));
  }, [dispatch, widget.id]);

  const handleUpdate = useCallback(
    (data: any) => {
      dispatch(
        updateWidget({
          id: widget.id,
          title: data.title,
          config: data.config,
          w: data.w,
          h: data.h,
        })
      );
    },
    [dispatch, widget.id]
  );

  const baseProps = {
    id: widget.id,
    title: widget.title,
    config: widget.config,
    type: widget.type,
    w: widget.w,
    h: widget.h,
    onDelete: handleDelete,
    onSubmit: handleUpdate,
  };

  switch (widget.type) {
    case "chart":
      return <ChartWidget widget={widget} baseProps={baseProps} />;
    case "table":
      return <TableWidget widget={widget} baseProps={baseProps} />;
    case "text":
      return <TextWidget widget={widget} baseProps={baseProps} />;
    default:
      return <div>Unknown widget type</div>;
  }
};

export default React.memo(WidgetFactory, (prevProps, nextProps) => {
  return prevProps.widget === nextProps.widget;
});