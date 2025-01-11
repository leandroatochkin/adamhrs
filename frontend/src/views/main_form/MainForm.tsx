import React, { useEffect, useState, useRef } from "react";
import { useCountryQuery } from "../../services/api/countries_api";
import { FormControl, InputLabel, TextField } from '@mui/material';
import { Dropdown, DateSelect } from "../../components";
import dayjs, { Dayjs } from 'dayjs';
import { calculateAge, inputErrorMessages } from "../../utils/functions/functions";
import { useForm } from 'react-hook-form'
import { regexList } from "../../utils/regex/regex";

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  console.log(errors);
  

  useEffect(() => {
    if (formData) {
      console.log(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (data) {
      setCountries(
        data.map((country) => country.name.common).sort((a, b) => a.localeCompare(b))
      );
    }
  }, [data]);

  useEffect(() => {
    const age = calculateAge(formData.dob);
    if (formData.dob !== '') {
        setFormData(
            (prev) => ({
                ...prev,
                age: age as string, // Type assertion to string
              })
      );
    }
  }, [formData.dob]);

  const handleTextfieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

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
    <form onSubmit={handleSubmit(()=>{
        console.log(formData);
    })}>
    <FormControl>

        <TextField 
        id="filled-basic" 
        label="First Name" 
        variant="filled" 
        {...register('firstName', {required: true, minLength: 2, pattern: regexList.letters})} 
        value={formData.firstName} 
        onChange={handleTextfieldChange} 
        error={!!errors.firstName}
        helperText={inputErrorMessages(errors.firstName)}
        />

        <TextField 
        id="filled-basic" 
        label="Middle Name" 
        variant="filled" 
        {...register('middleName', {required: false, minLength: 2, pattern: regexList.letters})}  
        onChange={handleTextfieldChange}
        error={!!errors.middleName} 
        helperText={inputErrorMessages(errors.middleName)}
        />

        <TextField 
        id="filled-basic" 
        label="Last Name" 
        variant="filled" 
        {...register('lastName', {required: true, minLength: 2, pattern: regexList.letters})} 
        onChange={handleTextfieldChange} 
        error={!!errors.lastName} 
        helperText={inputErrorMessages(errors.lastName)}
        />

        <TextField 
        id="filled-basic" 
        label="Address Line 1" 
        variant="filled" 
        {...register('addressLineOne', {required: true, minLength: 2, pattern: regexList.address})} 
        onChange={handleTextfieldChange} 
        error={!!errors.addressLineOne} 
        helperText={inputErrorMessages(errors.addressLineOne)}
        />

        <TextField 
        id="filled-basic" 
        label="Address Line 2(optional)" 
        variant="filled" 
        {...register('addressLineTwo', {required: false, minLength: 2, pattern: regexList.address})} 
        onChange={handleTextfieldChange}
        error={!!errors.addressLineTwo} 
        helperText={inputErrorMessages(errors.addressLineTwo)}
        />

        <TextField 
        id="filled-basic" 
        label="City" 
        variant="filled" 
        {...register('city', {required: true, minLength: 2, pattern: regexList.letters})} 
        onChange={handleTextfieldChange} 
        error={!!errors.city} 
        helperText={inputErrorMessages(errors.city)}
        />

        <TextField 
        id="filled-basic" 
        label="State" 
        variant="filled" 
        {...register('state', {required: true, minLength: 2, pattern: regexList.letters})} 
        onChange={handleTextfieldChange} 
        error={!!errors.state} 
        helperText={inputErrorMessages(errors.state)}
        />

        <TextField 
        id="filled-basic" 
        label="Zip Code" 
        variant="filled" 
        {...register('zip', {required: true, minLength: 2, pattern: regexList.zipCode})} 
        onChange={handleTextfieldChange}  
        error={!!errors.zip} 
        helperText={inputErrorMessages(errors.zip)}
        />
        
        <TextField id="filled-basic" label="Age" variant="filled" name="age" value={formData.age}/>
        
    
        
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
    <input type="submit" value="Submit"/>
    </form>
  );
};

export default MainForm;
