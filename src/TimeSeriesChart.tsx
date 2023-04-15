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
  color: string;
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

export const TimeSeriesChart: React.FunctionComponent<IProps> = ({
  title,
  min,
  max,
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
        borderColor: "#37d3bd",
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
