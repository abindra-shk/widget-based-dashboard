import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3949ab",
    },
    secondary: {
      main: "#26c6da",
    },
    background: {
      default: "#121212", // Almost black
      paper: "#1e1e1e", // Card background
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
