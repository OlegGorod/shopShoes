import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
  FormControl,
  InputLabel,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import {ChangeEvent, FocusEvent} from 'react';

import styles from './textArea.module.css';

type TProps = {
  id: string;
  label: string;
  placeholder?: string;
  error: boolean;
  minRows: number;
  value?: string;
  onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({
  id,
  label,
  placeholder = '',
  error,
  minRows,
  value,
  onBlur,
  onChange,
}: TProps) {
  return (
    <FormControl className="tw-w-full tw-p-0">
      <InputLabel
        htmlFor={id}
        className="tw-mb-6 tw-text-black tw-relative tw-ml-[-13px]"
      >
        {label}
      </InputLabel>

      <TextareaAutosize
        id={id}
        minRows={minRows}
        placeholder={placeholder}
        className={`${styles.textarea} tw-p-4 tw-resize-none tw-rounded-lg`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
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
            {placeholder}
          </Typography>
        </Stack>
      )}
    </FormControl>
  );
}
