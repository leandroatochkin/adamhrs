import React, { useEffect, useState, useRef } from "react";
import { useCountryQuery } from "../../services/api/countries_api";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Dropdown } from "../../components";

const MainForm = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    country: '',
  })
  const { data, error, isLoading } = useCountryQuery();

  

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setCountries(
        data.map((country) => country.name.common).sort((a, b) => a.localeCompare(b))
      );
      console.log(countries);
    }
  }, [data]);

  const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({
      ...prev,
      country: event.target.value as string, // Type assertion to string
    }));
  };



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching countries</p>;

  return (
    <FormControl>
        <InputLabel id="dropdown-label">Country:</InputLabel>
        <Dropdown
        data={countries}
        labelId="country-label"
        name="country"
        value={formData.country}
        onChange={handleCountryChange} // Pass the setter function to update country
      />
    </FormControl>
  );
};

export default MainForm;
