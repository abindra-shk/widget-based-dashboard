import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BaseWidget from "./BaseWidget";
import type { Widget } from "../../types";

interface ChartWidgetProps {
  widget: Widget;
}

const defaultChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 390 },
  { name: "Jun", value: 320 },
];

const ChartWidget: React.FC<ChartWidgetProps & { baseProps: any }> = ({
  widget,
  baseProps,
}) => {
  const chartData = widget.config?.data || defaultChartData;
  console.log('chart');

  return (
    <BaseWidget {...baseProps}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </BaseWidget>
  );
};

export default React.memo(ChartWidget);
