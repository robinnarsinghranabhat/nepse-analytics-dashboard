import axios from "axios";
import qs from 'qs';

const BASE_URL = "http://localhost:8001/api/v1"; // Replace with your FastAPI server URL



export const fetchStocks = async (
  stockNames,
  sectors,
  topN,
  stock_date_range,
  promoter_shares,
  listed_shares,
) => {

  const query_params = new URLSearchParams();
  stockNames.forEach(name => query_params.append('stockNames', name));
  sectors.forEach(sector => query_params.append('sectors', sector));
  // query_params.append('topN', topN);

  const reqBody = {
    stock_date_range,
    promoter_shares,
    listed_shares,
  };
  
  const query_param_str = `${BASE_URL}/stocks`;
  console.log(query_param_str);
  try {
    const response = await axios.post( query_param_str, reqBody, 
      {
        params: {
          stockNames,  // Replace with actual stock names
          sectors,  // Replace with actual sectors
          topN,
        },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })

      }
     );
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};
