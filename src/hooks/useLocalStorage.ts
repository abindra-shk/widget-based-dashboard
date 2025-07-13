import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadWidgetsFromConfig } from "../store/slices/dashboardSlice";
import type { RootState } from "../store";
import {
  loadConfigurationFromLocalStorage,
  loadDefaultConfiguration,
  saveConfigurationToLocalStorage,
} from "../utils/configLoader";

export const useLocalStorage = () => {
  const widgets = useSelector((state: RootState) => state.dashboard.widgets);
  const dispatch = useDispatch();

  // Load widgets on initial mount
  useEffect(() => {
    const savedWidgets = loadConfigurationFromLocalStorage();
    if (savedWidgets && savedWidgets.length > 0) {
      dispatch(loadWidgetsFromConfig(savedWidgets));
    } else {
      // Load default configuration if no saved widgets
      const defaultWidgets = loadDefaultConfiguration();
      dispatch(loadWidgetsFromConfig(defaultWidgets));
    }
  }, [dispatch]);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    if (widgets.length >= 0) {
      saveConfigurationToLocalStorage(widgets);
    }
  }, [widgets]);

  return { widgets };
};
