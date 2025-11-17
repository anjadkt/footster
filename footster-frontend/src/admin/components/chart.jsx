import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutChart({details}) {
  const data = {
    labels: ["Customer", "Orders", "Products"],
    datasets: [
      {
        label: "Count ",
        data: [details.userCount, details.orders, details.products],
        backgroundColor: [
          "rgba(19, 152, 240, 0.6)",
          "rgba(57, 243, 243, 0.6)",
          "rgba(255, 183, 0, 0.68)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };


  return <Doughnut data={data} />;
}
