import React from "react";
import logo from "./Logo.png";
import "./App.scss";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

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
        <TimeSeriesChart
          title="Water Temperature (C)"
          min={19}
          max={21}
          color="blue"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
