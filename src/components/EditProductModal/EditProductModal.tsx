import {Box, Modal, Typography} from '@mui/material';
import {useIsMutating} from '@tanstack/react-query';
import {Dispatch, SetStateAction} from 'react';

import constants from '@/constants/EditProduct';
import {useEditProduct} from '@/hooks/product/editProduct';
import deletePhotosFromServer from '@/services/deletePhotosFromServer';
import {TProductData} from '@/types/product/addProduct';
import {IFilters} from '@/types/product/filters';
import {IProduct} from '@/types/product/product';

import ProductForm from '../UI/ProductForm';

type TProps = {
  isEditing: boolean;
  product: IProduct;
  filters: IFilters;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function EditProductModal({
  isEditing,
  product,
  filters,
  setIsEditing,
}: TProps) {
  const {mutate} = useEditProduct();
  const isUpload = useIsMutating({mutationKey: ['edit-product']});

  const onFormSubmit = (productData: TProductData) => {
    mutate({
      productData,
      id: product.id,
    });

    deletePhotosFromServer(
      productData,
      product.attributes.images.data.map(el => el.id),
    );

    setIsEditing(false);
  };

  return (
    <Modal
      open={!!isUpload || isEditing}
      onClose={() => {
        setIsEditing(false);
      }}
      aria-labelledby="modal-edit-product"
      className="tw-flex tw-items-center tw-justify-center md:tw-px-20 md:tw-pt-16 md:tw-pb-8 tw-bg-white tw-bg-opacity-90"
    >
      <Box className="tw-relative tw-overflow-scroll tw-h-full tw-w-full tw-bg-white tw-p-8">
        <Box className="tw-flex tw-flex-col tw-max-w-3xl">
          <Typography variant="h3">{constants.FORM.HEADER_TEXT}</Typography>

          <Typography variant="subtitle2">
            {constants.FORM.PARAGRAPH}
          </Typography>
        </Box>

        <ProductForm
          initialValues={{
            name: product.attributes.name,
            price: product.attributes.price,
            gender: product.attributes.gender.data.id,
            brand: product.attributes.brand.data.id,
            categories: product.attributes.categories.data.map(el => el.id),
            description: product.attributes.description ?? '',
            sizes: product.attributes.sizes.data.map(el => el.id),
            color: product.attributes.color.data.id,
            images: [...product.attributes.images.data],
          }}
          submitForm={onFormSubmit}
          filters={filters}
          isUpload={!!isUpload}
          chosenSizes={product.attributes.sizes.data.map(
            el => el.attributes.value,
          )}
        />
      </Box>
    </Modal>
  );
}
