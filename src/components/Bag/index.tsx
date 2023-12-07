import {Divider, Typography, useMediaQuery, useTheme} from '@mui/material';
import {Box} from '@mui/system';

import ItemInBag from '@/components/Bag/ItemInBag';
import Summary from '@/components/Bag/Summary';
import constants from '@/constants/Bag';
import {useBagContext} from '@/hooks/store/bag';
import {IProduct} from '@/types/product/product';

interface IProps {
  items: IProduct[];
}

export default function Bag({items}: IProps) {
  const theme = useTheme();
  const {state} = useBagContext();
  const matchesLg = useMediaQuery('(min-width:1024px)');

  const getTotalCoast = (): number => {
    return (
      (state &&
        items &&
        items.reduce(
          (res: number, {id, attributes: {price}}: IProduct): number => {
            res +=
              state[id] &&
              Object.values(state[id]).reduce(
                (prev: number, curr: number) => curr + prev,
                0,
              ) * price;
            return res;
          },
          0,
        )) ||
      0
    );
  };

  return (
    <Box className="tw-flex lg:tw-flex-row tw-flex-col lg:tw-gap-24 tw-gap-16 tw-items-center lg:tw-items-start tw-justify-between xl:tw-px-24 tw-py-8 tw-px-0">
      <Box className="tw-flex tw-items-start tw-flex-col tw-w-full lg:tw-w-4/6 ">
        <Typography
          className="tw-w-full tw-px-8 tw-pb-4"
          variant="h3"
          sx={{color: theme.palette.text.primary}}
        >
          {constants.BAG_CONTENT.HEADER}
        </Typography>

        <Box className="tw-w-full">
          {!matchesLg && <Divider orientation="horizontal" />}
        </Box>

        {Object.entries(state || {}).map(
          (itemInBag, indexOfItem, arrOfItemsInBag) => {
            const [id, sizes] = itemInBag;
            const currentItemAttributes = items.find(
              itemInBag => itemInBag.id === +id,
            )?.attributes;

            return Object.keys(sizes).map(
              (size: string, indexOfSize: number, arrOfSizes) => {
                const status = currentItemAttributes?.sizes.data.some(
                  el => el.attributes.value === +size,
                )
                  ? constants.ITEM_STATUS.AVAILABLE
                  : constants.ITEM_STATUS.NOT_AVAILABLE;

                return (
                  currentItemAttributes && (
                    <ItemInBag
                      key={id + size}
                      id={id}
                      quantity={sizes[size] || 0}
                      imageSrc={
                        currentItemAttributes.images.data[0].attributes.url
                      }
                      name={currentItemAttributes.name}
                      category={
                        currentItemAttributes.categories.data[0].attributes.name
                      }
                      status={status}
                      size={+size}
                      price={currentItemAttributes.price}
                      isLast={
                        indexOfItem + 1 === arrOfItemsInBag.length &&
                        indexOfSize + 1 === arrOfSizes.length
                      }
                    />
                  )
                );
              },
            );
          },
        )}
      </Box>

      <Box className="lg:tw-w-2/6 tw-w-full">
        <Summary totalCoast={getTotalCoast()} />
      </Box>
    </Box>
  );
}
