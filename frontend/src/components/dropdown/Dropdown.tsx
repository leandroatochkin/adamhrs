
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import style from "./Dropdown.module.css";

interface Props {
  data: string[]; 
  name: string;
  value: string; 
  onChange: (event: SelectChangeEvent<string>) => void; 
  }

const Dropdown: React.FC<Props> = ({ data, value, onChange, name }) => {
  return (
    <>
    <Select
      displayEmpty
      name={name}
      value={value}
      onChange={onChange} 
      className={style.dropdown}
      renderValue={(selected) => {
        if (!selected) {
          return <em>Select a country</em>;
        }
        return selected   
      }}
    >
     <MenuItem disabled value={undefined}>Select a country</MenuItem>
      {data.length > 0 ? (
        data.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))
      ) : (
        <MenuItem value={undefined}>No data available</MenuItem>
      )}
    </Select>
    </>
  );
};

export default Dropdown;
