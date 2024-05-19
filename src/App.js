import { useState } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import ScatterChart from "./components/ScatterChart";
import { UserData } from "./Data";
import Multiselect from "multiselect-react-dropdown";
import Button from "@mui/material/Button";
import { Dayjs } from "dayjs";

// Four freaking imports just for a Date Range picker. Which is pretty less now that I think about this.
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import { mockFetch } from "./utilts/fake_response";

// The Default Data Fetching !
const DEFAULT_SECTORS = ["Banking", "Hydro", "MicroFinance"];
const DEFAULT_STOCKS = ["NABIL", "API", "CBBL"];
const DEFAULT_MIN_DATE = "2023-01-01";
const DEFAULT_MAX_DATE = "2024-12-31";

var fetch_data_params = {
  stocks: DEFAULT_STOCKS,
  sectors: DEFAULT_SECTORS,
  Top_N: [5, 10, 15],
  Min_Date: DEFAULT_MIN_DATE,
  Max_Date: DEFAULT_MAX_DATE,
};

function App() {
  // const [dateRange, setDateRange] = useState([null, null]);
  const [stock_data, setStockData] = useState({
    labels: [],
    datasets: [
      {
        label: "Initial Chart <EMPTY>",
        data: [],
        backgroundColor: ["RED", "blue"],
        // borderWidth: 2,
        borderColor: "black",
      },
    ],
  });

  const color_palette = ["red", "green", "blue"];
  async function fetchData() {
    console.log("The param used to fetch :");
    console.log(fetch_data_params);
    console.log("The param used to fetch :");
    var response = await mockFetch("your-api-endpoint", fetch_data_params);
    // response = await response.json();

    const datasets = response.json.stocks_history.map((stock_history, ind) => {
      return {
        label: stock_history.stock_name,
        data: stock_history.stock_price,
        backgroundColor: color_palette[ind],
      };
    });
    const final_stock_data = {
      labels: response.json.stocks_history[0].date,
      datasets: datasets,
    };

    setStockData(final_stock_data);
  }

  console.log(stock_data);

  return (
    <div className="App">
      <div className="FilterBar">
        <Multiselect
          options={DEFAULT_STOCKS}
          displayValue="Scripts"
          isObject={false}
          onSelect={(selectedList, selectedItem) => {
            fetch_data_params.stocks = selectedList;
          }}
          onRemove={(selectedList, selectedItem) => {}}
        ></Multiselect>

        <Multiselect
          options={DEFAULT_SECTORS}
          displayValue="Scripts"
          isObject={false}
          onSelect={(selectedList, selectedItem) => {
            fetch_data_params.sectors = selectedList;
          }}
        ></Multiselect>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slotProps={{ textField: { size: "small" } }}
            onChange={(dates) => {
              console.log("On Click Param");

              var selected_dates = dates.map((date_obj) => {
                if (date_obj) {
                  // Perform your modifications on the Day.js object
                  // For example, add 1 day
                  return date_obj.format("YYYY-MM-DD");
                } else {
                  // Return the item unchanged
                  return date_obj;
                }
              });

              fetch_data_params.Min_Date = selected_dates[0];
              fetch_data_params.Max_Date = selected_dates[1];
              console.log(fetch_data_params);
              console.log("Updated Fetch Data Params");
            }}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          onClick={fetchData}
          sx={{
            // width: 300,
            mx: 2,
          }}
        >
          Fetch Data
        </Button>
      </div>
      <div className="MainChart">
        {/* <div>
          <BarChart chartData={stock_data} />
        </div> */}
        <div>
          <ScatterChart chartData={stock_data} />
        </div>
      </div>
    </div>
  );
}

export default App;
