import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Widget {
  id: string;
  type: "chart" | "table" | "text";
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  config: any;
}

interface DashboardState {
  widgets: Widget[];
  nextId: number;
}

const initialState: DashboardState = {
  widgets: [],
  nextId: 1,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (
      state,
      action: PayloadAction<{
        type: Widget["type"];
        title: string;
        config?: any;
        w?: number;
        h?: number;
      }>
    ) => {
      const { type, title, config = {}, w, h } = action.payload;
      const newWidget: Widget = {
        id: `widget-${state.nextId}`,
        type,
        title,
        x: 0,
        y: 0,
        w: w || (type === "chart" ? 6 : type === "table" ? 6 : 4),
        h: h || (type === "chart" ? 4 : type === "table" ? 6 : 2),
        config,
      };
      state.widgets.push(newWidget);
      state.nextId += 1;
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(
        (widget) => widget.id !== action.payload
      );
    },
    updateWidgetLayout: (
      state,
      action: PayloadAction<{
        id: string;
        x: number;
        y: number;
        w: number;
        h: number;
      }>
    ) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (widget) {
        widget.x = action.payload.x;
        widget.y = action.payload.y;
        widget.w = action.payload.w;
        widget.h = action.payload.h;
      }
    },
    clearAllWidgets: (state) => {
      state.widgets = [];
    },
    loadWidgetsFromConfig: (state, action: PayloadAction<Widget[]>) => {
      state.widgets = action.payload;
      state.nextId =
        Math.max(
          ...action.payload.map((w) => parseInt(w.id.split("-")[1]) || 0)
        ) + 1;
    },

    updateWidget: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        config: any;
        w?: number;
        h?: number;
      }>
    ) => {
      const { id, title, config, w, h } = action.payload;
      const widget = state.widgets.find((w) => w.id === id);
      if (widget) {
        widget.title = title;
        widget.config = config;
        if (w !== undefined) widget.w = w;
        if (h !== undefined) widget.h = h;
      }
    },
  },
});

export const {
  addWidget,
  removeWidget,
  updateWidgetLayout,
  clearAllWidgets,
  loadWidgetsFromConfig,
  updateWidget,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
