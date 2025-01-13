import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import style from './DatePicker.module.css';
import 'dayjs/locale/en';

interface Props {
  label: string;
  value: Dayjs | null;  // Important!!! =>> make sure value is a Dayjs object or null
  onChange: (newValue: Dayjs | null) => void;  //Important!!! =>> onChange should accept a Dayjs or null
}

const DateSelect: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue: Dayjs | null) => onChange(newValue)}
        className={style.datePicker}
        disableFuture={true}
        sx={{outline: 'none'}}
      />
    </LocalizationProvider>
  );
};

export default DateSelect;

