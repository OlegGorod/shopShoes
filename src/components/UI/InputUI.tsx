import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {FormControl, InputLabel, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import MuiTextField, {TextFieldProps} from '@mui/material/TextField';
import {FocusEvent} from 'react';

const TextField = styled((props: TextFieldProps) => (
  <MuiTextField label="" placeholder="Search" {...props} />
))(() => ({
  color: '#5C5C5C',

  '& .MuiInputBase-root': {
    borderRadius: '10px !important',
  },
  '&. .MuiInputBase-input': {
    paddingBlock: '11px !important',
  },
}));

interface IProps {
  id: string;
  label: string;
  value: string;
  error?: boolean;
  errorMsg?: string;
  required?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  changeText: (e: FocusEvent<HTMLInputElement>) => void;
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'date'
    | 'time'
    | 'search'
    | 'tel';
}

export default function InputUI({
  id,
  type,
  error,
  label,
  value,
  onBlur,
  required,
  errorMsg,
  changeText,
  placeholder = '',
}: IProps) {
  return (
    <FormControl>
      <InputLabel
        htmlFor={id}
        error={required}
        required={required}
        className="tw-mb-6 tw-text-black tw-relative  tw-ml-[-13px]"
      >
        {label}
      </InputLabel>

      <TextField
        id={id}
        name={id}
        type={type}
        error={error}
        value={value}
        onBlur={onBlur}
        variant="outlined"
        required={required}
        onChange={changeText}
        placeholder={placeholder}
      />

      {error && (
        <Stack spacing={0.5} direction="row" className="tw-mt-1">
          <WarningAmberRoundedIcon color="error" fontSize="small" />
          <Typography
            color="error"
            display="block"
            variant="caption"
            className="tw-mt-px"
          >
            {errorMsg || 'Error message'}
          </Typography>
        </Stack>
      )}
    </FormControl>
  );
}
