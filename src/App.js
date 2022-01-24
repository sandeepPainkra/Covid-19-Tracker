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
import Table from "./components/Table";
import { sortData } from "./components/util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getDataFromApi = async () => {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      console.log(response);
      // for country

      const countries = response.data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      const sortedData = sortData(response);
      setCountries(countries);
      setTableData(sortedData);
    };
    getDataFromApi();
  }, []);

  const onCountryChange = async (event) => {
    const country_Code = event.target.value;

    const URL =
      country_Code === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country_Code}`;

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCountry(country_Code);
        setCountryInfo(data);
      });
  };
  console.log(tableData);
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
          <InfoBox
            title="Coronavireus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
      </div>

      <Card className="app__rightBox">
        <CardContent>
          <h2>Live Cases By Country</h2>
          <Table countries={tableData} />
          <h2>Worldwide cases</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
