{
  /*
import React, { useEffect } from "react";
import Papa from "papaparse";}

import { useEffect } from "react";
const csvString = > ()

export default function csvToArrayOfObjects(csvString) {
  // Split the input string into lines
  const lines = csvString.split("\n");

  // Extract headers (column names) from the first line
  const headers = lines[0].split(",");

  // Map the remaining lines to objects
  const result = lines.slice(1).map((line) => {
    // Split current line into values
    const values = line.split(",");
    // Reduce the values into an object using headers for keys
    useEffect(() => {
      fetch("./Fruit Prices 2020.csv")
        .then((response) => response.text())
        .then((csvData) => {
          Papa.parse(csvData, {
            header: true,
            complete: (results) => {
              setHeaders(results.meta.fields);
              setData(results.data);
            },
          });
        })
        .catch((error) => console.error("Error fetching CSV:", error));
    }, []);
    return values.reduce((object, value, index) => {
      object[headers[index]] = value;
      return object;
    }, {});
  });

  return result;
}
*/
}
import Papa from "papaparse";

export default function csvToArrayOfObjects(csvString) {
  // Assuming csvString is the CSV data as a string
  // Use Papa Parse to parse the CSV data
  const results = Papa.parse(csvString, {
    header: true, // This tells Papa Parse to treat the first row as headers
  });

  // The parsed data is now an array of objects
  // Each object has properties named after the headers, with values from the CSV
  return results.data;
}
