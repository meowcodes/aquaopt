import React from "react";
import logo from "./Logo.png";
import "./App.scss";
import { DOChart, TempChart } from "./TimeSeriesChart";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Dashboard } from "./Dashboard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="App-Logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
