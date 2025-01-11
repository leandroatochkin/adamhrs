
import { Select, MenuItem } from "@mui/material";
import style from "./Dropdown.module.css";

interface Props {
  data: string[]; 
  label: string;
  name: string;
  value: string; 
  onChange: (event: React.ChangeEvent<{ value: string }>) => void; 
  }

const Dropdown: React.FC<Props> = ({ data, value, onChange, label, name }) => {
  return (
    <Select
      label={label}
      name={name}
      value={value}
      onChange={onChange} 
      className={style.dropdown}
    >
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
  );
};

export default Dropdown;
