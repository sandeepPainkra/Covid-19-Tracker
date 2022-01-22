import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [country, setCountry] = useState(["USA", "UK", "India"]);
  console.log(country);
  return (
    <div className="App">
      <h2>
        hey buddy whatsapp lets build a covid-19 tracker app using React js!!
      </h2>
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl>
          <Select variant="outlined" value="abc">
            {country.map((country) => {
              return <MenuItem vlaue={country}>{country}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
