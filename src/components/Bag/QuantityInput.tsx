import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import {Box, IconButton, Input, Typography, useTheme} from '@mui/material';
import {useEffect, useState} from 'react';

type TProps = {
  quantity: number;
  setQuantity: (newVal: number) => void;
  inputError: null | string;
  setInputError: (value: null | string) => void;
};

export default function QuantityInput({
  quantity,
  setQuantity,
  inputError,
  setInputError,
}: TProps) {
  const theme = useTheme();
  const [value, setValue] = useState<number>(quantity);

  return (
    <Box className="tw-flex tw-items-center">
      <IconButton
        disabled={value <= 1}
        className="tw-w-8 tw-h-8 tw-p-0"
        sx={{
          bgcolor: theme.palette.customColors.lightGray,
          '&:disabled': {
            bgcolor: theme.palette.customColors.lightGray,
          },
        }}
        onClick={() => {
          setQuantity(value - 1);
          setValue(value - 1);
        }}
      >
        <RemoveTwoToneIcon className="tw-rounded-full tw-w-3/4 tw-h-3/4" />
      </IconButton>

      <Box className="tw-flex tw-flex-col tw-items-center">
        <Input
          className="tw-w-8 tw-m-1"
          name="quantity"
          value={value}
          onFocus={() => setInputError(null)}
          onChange={({target: {value}}) => !isNaN(+value) && setValue(+value)}
          onBlur={({target: {value}}) => !isNaN(+value) && setQuantity(+value)}
          sx={{
            border: inputError
              ? `1px solid ${theme.palette.error.main}`
              : 'none',

            '& input': {
              textAlign: 'center',
            },
          }}
          disableUnderline
          autoComplete="off"
        />

        {inputError && (
          <Typography
            color="error"
            variant="caption"
            className="tw-absolute tw-bottom-0"
          >
            {inputError}
          </Typography>
        )}
      </Box>

      <IconButton
        disabled={value >= 99}
        className="tw-w-8 tw-h-8 tw-p-0"
        sx={{
          bgcolor: theme.palette.customColors.lightRed,
        }}
        onClick={() => {
          setQuantity(value + 1);
          setValue(value + 1);
        }}
      >
        <AddTwoToneIcon
          className=" tw-rounded-full tw-w-3/4 tw-h-3/4"
          sx={{
            fill: theme.palette.error.contrastText,
          }}
        />
      </IconButton>
    </Box>
  );
}
