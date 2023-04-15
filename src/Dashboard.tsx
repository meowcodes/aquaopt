import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import * as React from "react";
import {
  AmmoniaChart,
  ConductivityChart,
  DOChart,
  NitrateChart,
  NitriteChart,
  PHChart,
  SalinityChart,
  TempChart,
} from "./TimeSeriesChart";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IProps {}

enum chartKeys {
  Temp = "Water Temperature (C)",
  DO = "DO Level (mg/L)",
  pH = "pH Level",
  Ammonia = "Ammonia Level",
  Nitrate = "Nitrate Level",
  Nitrite = "Nitrite Level",
  Conductivity = "Conductivity Level",
  Salinity = "Salinity Level",
}
const chartTypes: chartKeys[] = Object.values(chartKeys);
type chartType = typeof chartTypes[number];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0b1d32",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "16px",
};

const addStyle = {
  minHeight: "320px",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

export const Dashboard: React.FunctionComponent<IProps> = () => {
  const [charts, setCharts] = React.useState<chartType[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);

  const getChart = (chart: chartType) => {
    switch (chart) {
      case chartKeys.DO:
        return <DOChart />;
      case chartKeys.Temp:
        return <TempChart />;
      case chartKeys.pH:
        return <PHChart />;
      case chartKeys.Ammonia:
        return <AmmoniaChart />;
      case chartKeys.Nitrite:
        return <NitriteChart />;
      case chartKeys.Nitrate:
        return <NitrateChart />;
      case chartKeys.Conductivity:
        return <ConductivityChart />;
      case chartKeys.Salinity:
        return <SalinityChart />;
      default:
        return null;
    }
  };

  const handleAddChart = (type: chartType) => {
    setCharts((charts) => [...charts, type]);
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6} xl={4}>
        <TempChart />
      </Grid>
      {charts.map((chart) => (
        <Grid item xs={12} lg={6} xl={4}>
          {getChart(chart)}
        </Grid>
      ))}
      <Grid item xs={12} lg={6} xl={4}>
        <Box sx={addStyle} onClick={() => setOpen(true)}>
          <AddCircleIcon fontSize="large" sx={{ marginBottom: "8px" }} />
          <Typography>Add Chart</Typography>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2} direction="column">
            {chartTypes.map((type) => (
              <Button variant="outlined" onClick={() => handleAddChart(type)}>
                {type}
              </Button>
            ))}
          </Stack>
        </Box>
      </Modal>
    </Grid>
  );
};
