import { useState } from "react";

export default function sortData(xvalue, data, setSortedYdata) {
  const key = xvalue;
  const sortedData = [...data].sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });

  setSortedYdata(sortedData);
}
