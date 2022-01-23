import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      console.log(response.data.country);
      const countries = response.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setCountries(countries);
    };
    getDataFromApi();
  }, []);

  const onCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="App">
      <h2>
        hey buddy whatsapp lets build a covid-19 tracker app using React js!!
      </h2>
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>

        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={onCountryChange}
            value={country}
          >
            {countries.map((countrye) => {
              return (
                <MenuItem value={countrye.value}>{countrye.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
