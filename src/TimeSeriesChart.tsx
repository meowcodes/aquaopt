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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  labelCount?: number;
  title: string;
  min: number;
  max: number;
  color:string;
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

const oneHourLabels = createLabels(60);

export const TimeSeriesChart: React.FunctionComponent<IProps> = ({
  labelCount = 60,
  title,
  min,
  max,
  color
}) => {
  const labels = createLabels(labelCount);
  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: oneHourLabels.map(() => faker.datatype.float({ min, max })),
        borderColor: color,
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  console.log(options);
  return <Line options={options} data={data} />;
};
