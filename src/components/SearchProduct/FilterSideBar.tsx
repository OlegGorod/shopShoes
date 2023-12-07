import {
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
  useMediaQuery,
  Box,
} from '@mui/material';
import MuiDrawer, {DrawerProps} from '@mui/material/Drawer';
import {styled} from '@mui/material/styles';

import {
  ICategory,
  IColor,
  IFilters,
  IGender,
  ISize,
} from '@/types/product/filters';

import Brands from './Filters/Brands';
import SideBarAccordion from './SideBarAccordion';
import SideBarHeader from './SideBarHeader';
import constants from '@/constants/SearchProduct';

const Drawer = styled((props: DrawerProps) => (
  <MuiDrawer elevation={0} {...props} />
))(() => ({
  '& .MuiDrawer-paper': {
    position: 'inherit',
  },
}));

interface IProps {
  search: string | null;
  isOpen: boolean;
  filters: IFilters;
  productsFound: number;
  priceValue: number[];
  toggleDrawer: () => void;
  onFilterChange: (category: string, value: string) => void;
  clearFilters: () => void;
  onPriceChange: (newPrice: number[]) => void;
  isChecked: (key: string, value: string) => boolean;
}

export default function FilterSideBar({
  search,
  filters,
  productsFound,
  isOpen,
  priceValue,
  toggleDrawer,
  onFilterChange,
  clearFilters,
  onPriceChange,
  isChecked,
}: IProps) {
  const matches = useMediaQuery('(max-width:750px)');

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      anchor={matches ? 'right' : 'left'}
      variant={matches ? 'temporary' : 'persistent'}
      className={`tw-w-[280px] tw-h-screen tw-overflow-x-hidden ${
        !matches && 'tw-top-0 tw-left-0 tw-sticky'
      }`}
    >
      <SideBarHeader
        closeMenu={toggleDrawer}
        search={search}
        productsFound={productsFound}
      />

      <SideBarAccordion title="Gender">
        <>
          {filters.genders.map(({id, attributes}: IGender) => {
            return (
              <FormControlLabel
                key={id}
                label={attributes.name}
                control={
                  <Checkbox
                    checked={isChecked('Gender', attributes.name)}
                    onChange={() => onFilterChange('Gender', attributes.name)}
                  />
                }
              />
            );
          })}
        </>
      </SideBarAccordion>

      <SideBarAccordion title="Brand">
        <Brands
          brands={filters.brands}
          onFilterChange={onFilterChange.bind(null, 'Brand')}
          isBrandChecked={isChecked.bind(null, 'Brand')}
        />
      </SideBarAccordion>

      <SideBarAccordion title="Category">
        <>
          {filters.categories.map(({id, attributes}: ICategory) => {
            return (
              <FormControlLabel
                key={id}
                label={attributes.name}
                control={
                  <Checkbox
                    checked={isChecked('Category', attributes.name)}
                    onChange={() => onFilterChange('Category', attributes.name)}
                  />
                }
              />
            );
          })}
        </>
      </SideBarAccordion>

      <SideBarAccordion title="Color">
        <>
          {filters.colors.map(({id, attributes}: IColor) => {
            return (
              <FormControlLabel
                key={id}
                label={attributes.name}
                control={
                  <Checkbox
                    checked={isChecked('Color', attributes.name)}
                    onChange={() => onFilterChange('Color', attributes.name)}
                  />
                }
              />
            );
          })}
        </>
      </SideBarAccordion>

      <SideBarAccordion title="Size">
        <>
          {filters.sizes.map(({id, attributes}: ISize) => {
            return (
              <FormControlLabel
                key={id}
                label={attributes.value}
                control={
                  <Checkbox
                    checked={isChecked('Size', attributes.value as string)}
                    onChange={() =>
                      onFilterChange('Size', attributes.value as string)
                    }
                  />
                }
              />
            );
          })}
        </>
      </SideBarAccordion>

      <SideBarAccordion title="Price">
        <Box className="tw-px-2">
          <Slider
            size="small"
            defaultValue={priceValue}
            max={filters.maxPrice}
            onChange={(_, newValue: number | number[]) =>
              onPriceChange(newValue as number[])
            }
            value={priceValue}
            valueLabelDisplay="auto"
          />
        </Box>
      </SideBarAccordion>

      <Button onClick={clearFilters}>{constants.TEXT.CLEAR_FILTERS}</Button>
    </Drawer>
  );
}
