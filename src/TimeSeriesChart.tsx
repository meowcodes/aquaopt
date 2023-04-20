import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { getCSSvar } from "./util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = "rgb(239, 239, 239)";
ChartJS.defaults.borderColor = "rgba(239, 239, 239, 0.25)";
interface IProps {
  title: string;
  min: number;
  max: number;
  colorString: string;
}

const createLabels = (count: number): string[] => {
  const labels = [];
  let time = new Date();
  for (let i = 0; i < count; i++) {
    labels.unshift(time.toLocaleTimeString());
    time = new Date(time.getTime() - 1000 * 60);
  }
  return labels;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
    },
  },
};

export const TempChart: React.FunctionComponent = () => (
  <TimeSeriesChart
    title="Water Temperature (C)"
    min={19}
    max={21}
    colorString="temp"
  />
);
export const DOChart: React.FunctionComponent = () => (
  <TimeSeriesChart
    title="DO Level (mg/L)"
    min={7.8}
    max={8.2}
    colorString="do"
  />
);
export const PHChart: React.FunctionComponent = () => (
  <TimeSeriesChart title="pH Level" min={7} max={7.2} colorString="ph" />
);
export const AmmoniaChart: React.FunctionComponent = () => (
  <TimeSeriesChart
    title="Ammonia Level"
    min={0}
    max={1}
    colorString="ammonia"
  />
);
export const NitrateChart: React.FunctionComponent = () => (
  <TimeSeriesChart
    title="Nitrate Level"
    min={0}
    max={1}
    colorString="nitrate"
  />
);
export const NitriteChart: React.FunctionComponent = () => (
  <TimeSeriesChart
    title="Nitrite Level"
    min={0}
    max={1}
    colorString="nitrite"
  />
);
export const ConductivityChart: React.FunctionComponent = () => (
  <TimeSeriesChart
    title="Conductivity Level"
    min={0}
    max={1}
    colorString="conductivity"
  />
);
export const SalinityChart: React.FunctionComponent = () => (
  <TimeSeriesChart
    title="Salinity Level"
    min={7.8}
    max={8.2}
    colorString="salinity"
  />
);

export const TimeSeriesChart: React.FunctionComponent<IProps> = ({
  title,
  min,
  max,
  colorString,
}) => {
  const [labelCount, setLabelCount] = React.useState<number>(60);
  const [dataset, setDataset] = React.useState<number[]>([]);
  const [labels, setLabels] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLabels(createLabels(labelCount));
  }, [labelCount]);
  React.useEffect(() => {
    setDataset(labels.map(() => faker.datatype.float({ min, max })));
  }, [labels, max, min]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: dataset,
        borderColor: getCSSvar(`--color-${colorString}`),
        borderWidth: 1,
      },
    ],
  };

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newCount: number
  ) => {
    setLabelCount(newCount);
  };

  return (
    <div className="TimeSeriesChart">
      <div className="TimeSeriesChart-top">
        <Typography>{title}</Typography>
        <ToggleButtonGroup
          color="primary"
          value={labelCount}
          exclusive
          onChange={handleToggle}
          aria-label="count"
          size="small"
        >
          <ToggleButton value={60}>1 Hour</ToggleButton>
          <ToggleButton value={60 * 3}>3 Hours</ToggleButton>
          <ToggleButton value={60 * 24}>1 Day</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};
