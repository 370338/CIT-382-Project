import { useEffect, useState } from "react";
import Papa from "papaparse";

import Test from "./components/test";

import DynamicGraph from "./components/graph";
import csvToArrayOfObjects from "./components/csvConverter";
import TableComponent from "./components/table";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [names, setNames] = useState([]);
  const [loadedData, setLoadedData] = useState([]);

  const [selectedData, setSelectedData] = useState([]);

  const [currentPage, setCurrentPage] = useState("login");

  /*const [name, setName] = useState("");*/

  const [csvName, setCsvName] = useState("");
  const [csvData, setCsvData] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmitName = (event) => {
    event.preventDefault();
    console.log("Form submitted");

    handleAddData(csvName, csvData);

    setCsvName("");
    setCsvData("");
  };
  const handleAddData = (csvName, csvData) => {
    const newDataObject = { csvName, csvData };
    setLoadedData((prevLoadedData) => [...prevLoadedData, newDataObject]);
  };
  const selectCsvData = (name) => {
    const selectedDataset = loadedData.find(
      (dataset) => dataset.csvName === name
    );
    if (selectedDataset) {
      setData(Papa.parse(selectedDataset.csvData, { header: true }).data);
    } else {
      console.error("Dataset with name not found:", name);
      setData([]);
    }
  };

  const handleResetName = () => {
    /*setName("");*/

    setCsvName("");
    setCsvData("");
  };

  const saveCsvData = (name, data) => {
    const parsedData = Papa.parse(data, { header: true }).data;
    console.log("CSV Data saved:", name, parsedData);
    setData(parsedData);
  };

  const handleCheckboxChange = (index) => {
    const newData = [...selectedData];
    newData[index] = !newData[index]; // Toggle the selected state
    setSelectedData(newData);
  };

  useEffect(() => {
    console.log("Names state updated:", names);
  }, [names]);

  useEffect(() => {
    fetch("./dummy_data.csv") //Change csv file HERE <-------------------------
      .then((response) => response.text())
      .then((csvData) => {
        // Convert CSV data to array of objects
        const arrayOfObjects = csvToArrayOfObjects(csvData);
        setData(arrayOfObjects);
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  return (
    <div>
      <AdminCheck isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <AdminPage isAdmin={isAdmin} />
      <NavBar setCurrentPage={setCurrentPage} />
      {currentPage === "login" ? (
        <LoginScreen
          /*
          names={names}
          setNames={setNames}
          name={name}
          setName={setName}
          handleSubmitName={handleSubmitName}
          handleResetName={handleResetName}
          */
          names={names}
          csvName={csvName}
          csvData={csvData}
          setCsvName={setCsvName}
          setCsvData={setCsvData}
          handleSubmitName={handleSubmitName}
          handleResetName={handleResetName}
          handleAddData={handleAddData}
          loadedData={loadedData}
          selectCsvData={selectCsvData}
        />
      ) : currentPage === "table" ? (
        <TableScreen
          data={data}
          selectedData={selectedData}
          handleCheckboxChange={handleCheckboxChange}
        />
      ) : currentPage === "graph" ? (
        <GraphScreen data={data} />
      ) : currentPage === "test" ? (
        <TestScreen data={data} />
      ) : null}
    </div>
  );
}

function NameForm({
  /*handleSubmitName,
  handleResetName,
  csv_data,
  csv_name,
setName,*/
  csvName,
  csvData,
  setCsvName,
  setCsvData,
  handleSubmitName,
  handleResetName,
  handleAddData,
}) {
  return (
    <div>
      <form onSubmit={handleSubmitName}>
        <label htmlFor="name">CSV Name: </label>
        <input
          type="text"
          id="csv_name"
          value={csvName}
          onChange={(e) => setCsvName(e.target.value)}
        />
        <br />
        <label htmlFor="name">CSV Data: </label>
        <input
          /*type="text"
          id="csv_data"
  value={csv_data}*/
          id="csv_data"
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
        />
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={handleResetName}>
          Cancel
        </button>
      </form>
    </div>
  );
}

function LoginScreen({
  csvName,
  csvData,
  setCsvName,
  setCsvData,
  handleSubmitName,
  handleResetName,
  handleAddData,
  loadedData,
  selectCsvData,
}) {
  return (
    <>
      <ul>
        {loadedData.map((dataset, index) => (
          <li key={index}>
            <label>
              {dataset.csvName}
              <input
                type="checkbox"
                onChange={() => selectCsvData(dataset.csvName)}
              />
            </label>
          </li>
        ))}
      </ul>
      <h4>Data Entry Screen</h4>
      <NameForm
        csvName={csvName}
        csvData={csvData}
        setCsvName={setCsvName}
        setCsvData={setCsvData}
        handleResetName={handleResetName}
        handleSubmitName={handleSubmitName}
        handleAddData={handleAddData}
      />
    </>
  );
}
function GraphScreen({ data }) {
  return <DynamicGraph data={data} />;
}

/*
function TableScreen({ data }) {
  return <TableComponent data={data} />;
}
*/

function TableScreen({ data, selectedData, handleCheckboxChange }) {
  return (
    <TableComponent
      data={data}
      selectedData={selectedData}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
}

function TestScreen({ data }) {
  return <Test data={data} />;
}

{
  /*
function DataEntryScreen() {
  return <h1>data entry screen</h1>;
}
*/
}
function NavBar({ setCurrentPage }) {
  return (
    <div>
      <button onClick={() => setCurrentPage("login")}>Data Entry</button>
      {/*<button onClick={() => setCurrentPage("Entry")}>Data Entry</button>*/}
      <button onClick={() => setCurrentPage("table")}>Table</button>
      <button onClick={() => setCurrentPage("graph")}>Graph</button>
      <button onClick={() => setCurrentPage("test")}>Test</button>
    </div>
  );
}

function AdminPage({ isAdmin }) {
  if (!isAdmin == true) {
    return null;
  } else {
    return <h1>congrats your an admin</h1>;
  }
}
function AdminCheck({ isAdmin, setIsAdmin }) {
  console.log("AdminCheck component rendered");
  const handleChange = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <label>
      Admin Mode
      <input type="checkbox" checked={isAdmin} onChange={handleChange} />
    </label>
  );
}
