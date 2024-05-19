function generateRandomPrices(length, min = 100, max = 1000) {
  const prices = [];
  for (let i = 0; i < length; i++) {
    const price = Math.floor(Math.random() * (max - min + 1)) + min;
    prices.push(price);
  }
  return prices;
}

function generateDateRange(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function generateStockData(
  stock_name,
  startDate,
  endDate,
  minPrice = 100,
  maxPrice = 1000
) {
  const dates = generateDateRange(startDate, endDate);
  const prices = generateRandomPrices(dates.length, minPrice, maxPrice);
  return {
    stock_name: stock_name,
    stock_price: prices,
    date: dates,
  };
}

function generateStocksData(stocks, startDate, endDate) {
  const stocksData = [];
  for (const stock of stocks) {
    stocksData.push(generateStockData(stock, startDate, endDate));
  }
  return stocksData;
}

function CreateMockResponse(
  stocks = ["NABIL", "API", "CBBL"],
  sectors = ["Banking", "Hydro", "MicroFinance"],
  Top_N = [5, 10, 15],
  Min_Date = "2023-01-01",
  Max_Date = "2024-12-31"
) {
  // Mock data to be returned by the fake API
  return {
    sectors: sectors,
    Top_N: Top_N,
    stocks_history: generateStocksData(stocks, Min_Date, Max_Date),
  };
}

// Mock function to simulate an API call
export async function mockFetch(url, options = {}) {
  console.log(`Mock fetch called with URL: ${url}`);
  console.log("Options:", options);

  // Extracting options to pass to CreateMockResponse
  const { stocks, sectors, Top_N, Min_Date, Max_Date } = options;

  // Simulate a delay as if making a real network request
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Return a fake response object
  return {
    ok: true,
    status: 200,
    json: CreateMockResponse(stocks, sectors, Top_N, Min_Date, Max_Date),
  };
}

// const requestData = {
//   sectors: ["Technology", "Healthcare", "Finance"],
//   Top_N: [5, 10, 15],
//   Max_Date: "2024-12-31",
//   Min_Date: "2023-01-01",
// };

// // Function to make the mock fetch request
// async function sendRequest() {
//   try {
//     const response = await mockFetch("http://127.0.0.1:8000/process-data", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log("Response:", responseData);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// Call the function to send the mock request
// sendRequest();
