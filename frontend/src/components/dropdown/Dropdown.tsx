import { Select, MenuItem } from "@mui/material";

interface Props {
  data: string[]; 
  labelId: string;
  name: string;
  value: string; 
  onChange: (event: React.ChangeEvent<{ value: string }>) => void; 
  }

const Dropdown: React.FC<Props> = ({ data, value, onChange, labelId, name }) => {
  return (
    <Select
      labelId={labelId}
      name={name}
      value={value}
      onChange={onChange} 
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
