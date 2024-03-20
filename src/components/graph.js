import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import sortData from "./dataSorter";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const isNumeric = (value) => !isNaN(value) && isFinite(value);

function DropdownXAxis({ data, xvalue, setXvalue }) {
  const getNumaricKeysX = (data) => {
    let keysSet = new Set();
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (isNumeric(obj[key])) {
          keysSet.add(key);
        }
      });
    });
    return Array.from(keysSet);
  };
  const numericKeysX = getNumaricKeysX(data);
  return (
    <Dropdown autoClose="inside">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {xvalue || "X-Axis"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {numericKeysX.map((key) => (
          <Dropdown.Item
            key={key}
            onClick={() => {
              setXvalue(key);
              console.log(xvalue);
            }}
          >
            {key}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
function DropdownYAxis({ data, yvalue, setYvalue }) {
  const getNumaricKeysY = (data) => {
    let keysSet = new Set();
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (isNumeric(obj[key])) {
          keysSet.add(key);
        }
      });
    });
    return Array.from(keysSet);
  };
  const numericKeysY = getNumaricKeysY(data);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {yvalue || "Y-Axis"}
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-menu">
        {numericKeysY.map((key) => (
          <Dropdown.Item
            key={key}
            className="custom-dropdown-item"
            onClick={() => {
              setYvalue(key);
              console.log(yvalue);
            }}
          >
            {key}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
// change colors here
const colors = [
  "#342026",
  "#CA14E3",
  "#FA0986",
  "#52F079",
  "#0690CE",
  "#2843A2",
  "#1715C5",
  "#DDBE7A",
  "#4CC24A",
  "#FCD376",
  "#5A09F8",
  "#21CA40",
  "#F28C0C",
  "#B8F9E6",
  "#1F5A4E",
];

function DynamicGraph({ data }) {
  const [allKeys, setAllKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [xvalue, setXvalue] = useState(0);
  const [yvalue, setYvalue] = useState(0);
  const [sortedYdata, setSortedYdata] = useState([]);
  useEffect(() => {
    // Example of initializing selectedKeys, replace logic as needed
    const keys =
      data.length > 0
        ? Object.keys(data[0]).filter((k) => isNumeric(data[0][k]))
        : [];
    setSelectedKeys(keys);
    // Optionally set initial xvalue and yvalue here based on actual keys
  }, [data]);
  useEffect(() => {
    if (xvalue && data && data.length > 0) {
      // Assuming sortData is modified to directly update the state
      sortData(xvalue, data, setSortedYdata);
    }
  }, [xvalue, data]);
  return (
    <>
      <div className="dropdowns">
        <DropdownXAxis
          className="dropdown"
          data={data}
          xvalue={xvalue}
          setXvalue={setXvalue}
        />
        <DropdownYAxis
          className="dropdown"
          data={data}
          yvalue={yvalue}
          setYvalue={setYvalue}
        />
      </div>
      <div className="chartContainer">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={sortedYdata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xvalue} /> {/* Use xvalue for the X-axis dataKey */}
            <YAxis />
            <Legend />
            {/* Render only the selected line for the Y-axis using yvalue */}
            <Line
              type="monotone"
              dataKey={yvalue} // Use yvalue for the dataKey of the Line
              stroke="#8884d8" // Use a fixed color or derive from yvalue if needed
              key={yvalue} // Use yvalue as key for the line
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default DynamicGraph;
