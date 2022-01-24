import {
  FormControl,
  InputLabel,
  Card,
  MenuItem,
  CardContent,
  Select,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      console.log(response.data.country);
      // for country

      const countries = response.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setCountries(countries);

      console.log(response);
    };
    getDataFromApi();
  }, []);

  const onCountryChange = async (event) => {
    const country_Code = event.target.value;
    setCountry(country_Code);

    const URL =
      country_Code === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country_Code}`;

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };
  console.log(countryInfo);
  return (
    <div className="app">
      <div className="app__leftBox">
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>

          <FormControl variant="outlined">
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

        <div className="app__coronaInfo">
          <InfoBox title="Coronavireus cases" cases="123" total="12345" />
          <InfoBox title="Recovered" cases="123456" total="12345" />
          <InfoBox title="Deaths" cases="123445" total="12345" />
        </div>
      </div>

      <Card className="app__rightBox">
        <CardContent>this is app right</CardContent>
      </Card>
    </div>
  );
}

export default App;
