import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import {FocusEventHandler} from 'react';

import {IGender} from '@/types/product/filters';

type TProps = {
  list: IGender[];
  chosen: number | string | Array<number | string>;
  onChange: (event: SelectChangeEvent) => void;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  id: string;
  label: string;
  isMulti: boolean;
};

export default function SelectUI({
  list,
  chosen,
  onChange,
  onBlur,
  id,
  label,
  isMulti,
}: TProps) {
  return (
    <FormControl className="tw-w-full">
      <Typography className="tw-text-black tw-my-4">{label}</Typography>

      <Select
        id={id}
        name={id}
        multiple={isMulti}
        displayEmpty
        // @ts-ignore: Unreachable code error
        value={chosen}
        onChange={onChange}
        onBlur={onBlur}
        input={<OutlinedInput />}
        defaultValue=""
      >
        {list.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.attributes.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
