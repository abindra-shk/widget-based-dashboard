import defaultWidgets from "../config/defaultWidgets.json";
import type { Widget } from "../types";

export const loadDefaultConfiguration = (): Widget[] => {
  try {
    return defaultWidgets as Widget[];
  } catch (error) {
    console.error("Failed to load default configuration:", error);
    return [];
  }
};

export const saveConfigurationToLocalStorage = (widgets: Widget[]): void => {
  try {
    localStorage.setItem("dashboard-widgets", JSON.stringify(widgets));
  } catch (error) {
    console.error("Failed to save configuration to localStorage:", error);
  }
};

export const loadConfigurationFromLocalStorage = (): Widget[] | null => {
  try {
    const saved = localStorage.getItem("dashboard-widgets");
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Failed to load configuration from localStorage:", error);
    return null;
  }
};

export const exportConfiguration = (widgets: Widget[]): string => {
  return JSON.stringify(widgets, null, 2);
};

export const importConfiguration = (configString: string): Widget[] => {
  try {
    const parsed = JSON.parse(configString);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    throw new Error("Configuration must be an array of widgets");
  } catch (error) {
    console.error("Failed to import configuration:", error);
    throw error;
  }
};
