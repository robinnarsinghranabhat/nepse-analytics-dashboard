import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

import { fetch_data_params } from "../App";

const StockDataFilterComponent = () => {
  console.log("STOCK FILTER");
  const [listed_share_filter, set_listed_share] = useState(
    fetch_data_params.listed_shares
  );
  const [promoter_share_filter, set_promoter_share] = useState(
    fetch_data_params.promoter_shares
  );

  const handleChange = (filterName, key, value) => {
    console.log(filterName, key, value);
    if (filterName === "listed_shares") {
      listed_share_filter[key] = value;
      set_listed_share({
        min: listed_share_filter.min,
        max: listed_share_filter.max,
        sortOrder: listed_share_filter.sortOrder,
      });
      fetch_data_params.listed_shares = listed_share_filter;
    } else if (filterName === "promoter_shares") {
      promoter_share_filter[key] = value;
      set_promoter_share({
        min: promoter_share_filter.min,
        max: promoter_share_filter.max,
        sortOrder: promoter_share_filter.sortOrder,
      });

      fetch_data_params.promoter_shares = promoter_share_filter;
    }
  };

  return (
    <div>
      <div>
        <h2>Listed Share Filter</h2>
        <input
          type="number"
          value={listed_share_filter.min}
          onChange={(e) => handleChange("listed_shares", "min", e.target.value)}
          placeholder="Min"
        />
        <input
          type="number"
          value={listed_share_filter.max}
          onChange={(e) => handleChange("listed_shares", "max", e.target.value)}
          placeholder="Max"
        />
        <select
          value={listed_share_filter.sortOrder}
          onChange={(e) =>
            handleChange("listed_shares", "sortOrder", e.target.value)
          }
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
          <option value="ignore">ignore</option>
        </select>
      </div>
      <div>
        <h2>Promoter Shares Filter</h2>
        <input
          type="number"
          value={promoter_share_filter.min}
          onChange={(e) =>
            handleChange("promoter_shares", "min", e.target.value)
          }
          placeholder="Min"
        />
        <input
          type="number"
          value={promoter_share_filter.max}
          onChange={(e) =>
            handleChange("promoter_shares", "max", e.target.value)
          }
          placeholder="Max"
        />
        <select
          value={promoter_share_filter.sortOrder}
          onChange={(e) =>
            handleChange("promoter_shares", "sortOrder", e.target.value)
          }
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
          <option value="ignore">ignore</option>
        </select>
      </div>
    </div>
  );
};

export default StockDataFilterComponent;
