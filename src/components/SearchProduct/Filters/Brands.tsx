import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {Checkbox, FormControlLabel} from '@mui/material';
import {styled} from '@mui/material/styles';
import MuiTextField, {TextFieldProps} from '@mui/material/TextField';
import {useEffect, useState} from 'react';

import constants from '@/constants/SearchProduct';
import {IBrand} from '@/types/product/filters';

const TextField = styled((props: TextFieldProps) => (
  <MuiTextField {...props} />
))(() => ({
  color: '#5C5C5C',
  marginBottom: '15px',

  '& .MuiInputBase-root': {
    borderRadius: '42px !important',
    '& input': {
      padding: '4px 0 5px',
    },
  },
}));

interface IProps {
  brands: IBrand[];
  onFilterChange: (value: string) => void;
  isBrandChecked: (brand: string) => boolean;
}

export default function Brands({
  brands,
  onFilterChange,
  isBrandChecked,
}: IProps) {
  const [data, setData] = useState(() => brands);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setData(
      brands.filter(({attributes}: Pick<IBrand, 'attributes'>) =>
        attributes.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }, [searchValue, brands]);

  return (
    <>
      <TextField
        label=""
        InputProps={{
          startAdornment: (
            <SearchRoundedIcon className="tw-mr-2" sx={{color: '#5C5C5C'}} />
          ),
        }}
        id="Brand search"
        variant="outlined"
        value={searchValue}
        placeholder={constants.INPUT_PLACEHOLDER.SEARCH}
        onChange={e => setSearchValue(e.target.value)}
      />

      {data.map(({id, attributes}: any) => {
        return (
          <FormControlLabel
            key={id}
            label={attributes.name}
            control={
              <Checkbox
                onChange={() => onFilterChange(attributes.name)}
                checked={isBrandChecked(attributes.name)}
              />
            }
          />
        );
      })}
    </>
  );
}
