import { useState } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import ScatterChart from "./components/ScatterChart";
import { UserData } from "./Data";
import Multiselect from "multiselect-react-dropdown";

import StockDataFilterComponent from "./components/stockFilter";
// import Button from "@mui/material/Button";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Dayjs } from "dayjs";

// Four freaking imports just for a Date Range picker. Which is pretty less now that I think about this.
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import { mockFetch } from "./utilts/fake_response";

import axios from "axios";
import { fetchStocks } from "./utilts/daily_prices_api";

// The Default Data Fetching !
const DEFAULT_SECTORS = [
  "Microfinance",
  "Commercial Banks",
  "Hydro Power",
  "Tradings",
  "Finance",
  "Manufacturing And Processing",
  "Hotels And Tourism",
  "Investment",
  "Development Banks",
  "Non Life Insurance",
  "Life Insurance",
  "Others",
];

var stocks = ["NABIL", "API", "CBBL"];
var topN = 3;

var stockDateRange = {
  start: "2023-01-01",
  end: "2024-01-01",
};
var promoterShares = {
  min: 0,
  max: 100,
  sortOrder: "ignore",
};
var listedShares = {
  min: 0,
  max: 100000000,
  sortOrder: "asc",
};

export var fetch_data_params = {
  stocks: stocks,
  sectors: DEFAULT_SECTORS,
  topN: topN,
  stock_date_range: stockDateRange,
  promoter_shares: promoterShares,
  listed_shares: listedShares,
};

function App() {
  console.log("NICE RENDERING !!!!");
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
    // var response = await mockFetch("your-api-endpoint", fetch_data_params);

    var response = await fetchStocks(
      fetch_data_params.stocks,
      fetch_data_params.sectors,
      fetch_data_params.topN,
      fetch_data_params.stock_date_range,
      fetch_data_params.promoter_shares,
      fetch_data_params.listed_shares
    );

    console.log("hmmm");
    console.log(response);
    const datasets = response.map((stock_history, ind) => {
      return {
        label: stock_history.symbol,
        data: stock_history.Close,
        backgroundColor: color_palette[ind],
      };
    });
    const final_stock_data = {
      labels: response[0].date_scraped,
      datasets: datasets,
    };

    setStockData(final_stock_data);
  }

  console.log(stock_data);

  return (
    <div className="App">
      <StockDataFilterComponent></StockDataFilterComponent>
      <h2> EXTRA COMPONENT CLOSED </h2>

      <div className="FilterBar">
        <Multiselect
          options={fetch_data_params.stocks}
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

              fetch_data_params.stock_date_range.start = selected_dates[0];
              fetch_data_params.stock_date_range.end = selected_dates[1];
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
