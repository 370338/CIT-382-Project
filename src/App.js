import "./styles.css";
import Dashboard from "./components";
import NameForm from "./NameForm";

export default function App() {
  return (
    <div className="App">
      <h1>Dynamic Data Rendering</h1>
      <h4>Made by Jevon and Owen</h4>
      {/*<h1>User Input Form</h1>*/}
      {/*<NameForm />*/}

      <Dashboard />
    </div>
  );
}
