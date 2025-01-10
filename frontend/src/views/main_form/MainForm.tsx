import React, { useEffect, useState, useRef } from "react";
import { useCountryQuery } from "../../services/api/countries_api";
import { FormControl, InputLabel, TextField } from '@mui/material';
import { Dropdown, DateSelect } from "../../components";
import dayjs, { Dayjs } from 'dayjs';

const MainForm = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    country: '',
    firstName: '',
    middleName: '',
    lastName: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    age: '',
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

  const handleDateChange = (newValue: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      dob: newValue ? newValue.format('YYYY-MM-DD') : '', // Convert to string format if valid
    }));
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching countries</p>;

  return (
    <FormControl>
        <TextField id="filled-basic" label="First Name" variant="filled" />
        <TextField id="filled-basic" label="Middle Name" variant="filled" />
        <TextField id="filled-basic" label="Last Name" variant="filled" />
        <TextField id="filled-basic" label="Address Line 1" variant="filled" />
        <TextField id="filled-basic" label="Address Line 2(optional)" variant="filled" />
        <TextField id="filled-basic" label="City" variant="filled" />
        <TextField id="filled-basic" label="State" variant="filled" />
        <TextField id="filled-basic" label="Zip Code" variant="filled" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        
        <InputLabel id="dropdown-label">Country:</InputLabel>
        <Dropdown
        data={countries}
        labelId="country-label"
        name="country"
        value={formData.country}
        onChange={handleCountryChange} // Pass the setter function to update country
      />
      <InputLabel id="date-label">Date of birth:</InputLabel>
      <DateSelect
        label="Date of birth"
        value={formData.dob ? dayjs(formData.dob) : null}
        onChange={handleDateChange}
        />
    </FormControl>
  );
};

export default MainForm;
