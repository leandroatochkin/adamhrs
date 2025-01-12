import React, { useEffect, useState } from "react"
import { useCountryQuery } from "../../services/api/countries_api"
import { FormControl, TextField, SelectChangeEvent } from '@mui/material'
import { Dropdown, DateSelect } from "../../components"
import dayjs, { Dayjs } from 'dayjs'
import { calculateAge, inputErrorMessages } from "../../utils/functions/functions"
import { useForm } from 'react-hook-form'
import { regexList } from "../../utils/regex/regex"
import { CircleLoader } from "react-spinners"
import style from './MainForm.module.css'


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
  const { register, handleSubmit, formState: { errors } } = useForm()

 
  


  useEffect(() => {
    if (data) {
      setCountries(
        data.map((country) => country.name.common).sort((a, b) => a.localeCompare(b))
      )
    }
  }, [data])

  useEffect(() => {
    const age = calculateAge(formData.dob);
    if (formData.dob !== '') {
      setFormData((prev) => ({
        ...prev,
        age: (isNaN(age) || age > 125) ? '' : String(age), // prevents displayng NaN of ages over 125
      }));
    }
  }, [formData.dob]);
  

  const handleTextfieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setFormData((prev) => ({
      ...prev,
      country: event.target.value as string, 
    }))
  }

  const handleDateChange = (newValue: Dayjs | null) => {
    setFormData((prev) => ({
      ...prev,
      dob: newValue ? newValue.format('YYYY-MM-DD') : '', 
    }))
  }
  

  if (isLoading) return <div className={style.container}>
    <div className={style.dataLoadingSignStyles}>
    <p style={{color: '#0e141b', fontWeight: 'bolder'}}>Loading...</p>
    </div>
  </div>

  if (error) return <div className={style.container}>
  <div className={style.dataLoadingSignStyles}>
  <p style={{color: '#0e141b', fontWeight: 'bolder'}}>Error fetching countries</p>
  </div>
</div>
  
  

  return (
    <div className={style.container}>
        <form onSubmit={handleSubmit(()=>{
        console.log(formData);
    })}
    className={style.form}
    >
    <h2 className={style.title}>Personal Information</h2>
    <div className={style.separator}></div>
    <FormControl>

        <div className={style.splitRow}>
        <TextField 
        id="filled-basic" 
        label="First Name" 
        variant="filled" 
        {...register('firstName', {required: true, minLength: 2, maxLength: 50, pattern: regexList.name})} 
        value={formData.firstName} 
        onChange={handleTextfieldChange} 
        error={!!errors.firstName}
        helperText={inputErrorMessages(errors.firstName, 'First name')}
        className={style.formInput}
        sx={{paddingBottom: '3.5rem'}}
        />

        <TextField 
        id="filled-basic" 
        label="Middle Name" 
        variant="filled" 
        {...register('middleName', {required: false, minLength: 2, maxLength: 50, pattern: regexList.name})}  
        onChange={handleTextfieldChange}
        error={!!errors.middleName} 
        helperText={inputErrorMessages(errors.middleName, 'Middle name')}
        className={style.formInput}
        sx={{paddingBottom: '1.5rem'}}
        />
        </div>

        <TextField 
        id="filled-basic" 
        label="Last Name" 
        variant="filled" 
        {...register('lastName', {required: true, minLength: 2, maxLength: 70, pattern: regexList.name})} 
        onChange={handleTextfieldChange} 
        error={!!errors.lastName} 
        helperText={inputErrorMessages(errors.lastName, 'Last name')}
        className={style.formInput}
        sx={{paddingBottom: '1.5rem'}}
        />

        <div className={style.splitRow}>
        <DateSelect
        label="Date of birth"
        value={formData.dob ? dayjs(formData.dob) : null}
        onChange={handleDateChange}
        />

        <TextField 
        id="filled-basic" 
        label="Age" 
        variant="filled" 
        name="age" 
        value={formData.age}
        className={style.formInput}
        sx={{paddingBottom: '1.5rem'}}
        />
        </div>

        <TextField 
        id="filled-basic" 
        label="Address Line 1" 
        variant="filled" 
        {...register('addressLineOne', {required: true, minLength: 2, maxLength: 70, pattern: regexList.address})} 
        onChange={handleTextfieldChange} 
        error={!!errors.addressLineOne} 
        helperText={inputErrorMessages(errors.addressLineOne, 'Address line 1')}
        className={style.formInput}
        sx={{paddingBottom: '1.5rem'}}
        />

        <TextField 
        id="filled-basic" 
        label="Address Line 2(optional)" 
        variant="filled" 
        {...register('addressLineTwo', {required: false, minLength: 2, maxLength: 70, pattern: regexList.address})} 
        onChange={handleTextfieldChange}
        error={!!errors.addressLineTwo} 
        helperText={inputErrorMessages(errors.addressLineTwo, 'Address line 2')}
        className={style.formInput}
        sx={{paddingBottom: '1.5rem'}}
        />

        <TextField 
        id="filled-basic" 
        label="City" 
        variant="filled" 
        {...register('city', {required: true, minLength: 2, maxLength: 70,pattern: regexList.address})} 
        onChange={handleTextfieldChange} 
        error={!!errors.city} 
        helperText={inputErrorMessages(errors.city, 'City')}
        className={style.formInput}
        sx={{paddingBottom: '1.5rem'}}
        />

        <TextField 
        id="filled-basic" 
        label="State" 
        variant="filled" 
        {...register('state', {required: true, minLength: 2, maxLength: 50, pattern: regexList.address})} 
        onChange={handleTextfieldChange} 
        error={!!errors.state} 
        helperText={inputErrorMessages(errors.state, 'State')}
        className={style.formInput}
        sx={{paddingBottom: '1.5rem'}}
        />

        <div className={style.splitRow}>
        <TextField 
        id="filled-basic" 
        label="Zip Code" 
        variant="filled" 
        {...register('zip', {required: true, minLength: 2, maxLength: 30, pattern: regexList.zipCode})} 
        onChange={handleTextfieldChange}  
        error={!!errors.zip} 
        helperText={inputErrorMessages(errors.zip, 'Zip code')}
        className={style.zipInput}
        sx={{ width: '50%',  paddingBottom: '1.5rem'}}
        />

        <div>
        <Dropdown
        data={countries}
        name="country"
        value={formData.country}
        onChange={handleCountryChange} 
        />
        </div>

        </div>
   
    </FormControl>
    <input 
      type="submit" 
      value="Submit"
      className={style.submitButton}
    />
    </form>
    </div>
  );
};

export default MainForm;
