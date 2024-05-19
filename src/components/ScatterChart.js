import React from "react";
import { Scatter, Bar, Line } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";

// import { Chart as ChartJS } from "chart.js/auto";

// var options = {
//   title: {text: "This is a test"},
//   scales: {
//       xAxes: [{
//           title: "time",
//           type: 'time',
//           time: {
//               unit: "day",
//           }
//       }]
//   }
// }

function ScatterChart({ chartData }) {
  return <Line data={chartData} />;
}

export default ScatterChart;
