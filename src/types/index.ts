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

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TableData {
  headers: string[];
  rows: any[][];
}

export interface TextData {
  content: string;
}
