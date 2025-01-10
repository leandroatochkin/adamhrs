import React, { useEffect, useState } from "react";
import { useCountryQuery } from "../../services/api/countries_api";

const MainForm = () => {
  // Always call the hook
  const [countries, setCountries] = useState<string[]>([]);
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


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching countries</p>;

  return (
    <div>
      {data?.map((country, index) => (
        <div key={index}>
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
};

export default MainForm;
