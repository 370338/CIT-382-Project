import React, { useState } from "react";

const NameForm = () => {
  const [name, setName] = useState("");
  const [names, setNames] = useState(["no one is logged in"]);

  const handleSubmitNames = (event) => {
    event.preventDefault();
    //alert(`Name saved: ${name}`);
    setNames([...names, name]);
    setName("");
    console.log(`Name saved: ${names}`);
    console.log(setNames);
    // Here you can handle the saving logic, e.g., sending to a server
  };

  const handleReset = () => {
    setName("");
  };

  return (
    <div>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmitNames}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
        <button type="button" onClick={handleReset}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NameForm;
