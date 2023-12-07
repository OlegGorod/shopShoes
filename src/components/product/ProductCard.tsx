'use client';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, {MouseEvent, useContext, useState} from 'react';

import styles from '@/components/product/ProductCard.module.css';
import AlertDialog from '@/components/UI/AlertDialog';
import constants from '@/constants/Product';
import {useDeleteProduct} from '@/hooks/product/deleteProduct';
import {BagContext} from '@/store/Bag';
import {IFilters, ISize} from '@/types/product/filters';
import {IProduct} from '@/types/product/product';

import EditProductModal from '../EditProductModal/EditProductModal';
import SizeBadge from './SizeBadge';

interface IProps {
  product: IProduct;
  userId: string;
  authorId: string | number;
  filters: IFilters;
}

export default function ProductCard({
  product,
  userId,
  authorId,
  filters,
}: IProps) {
  const {mutate} = useDeleteProduct();
  const bagContext = useContext(BagContext);
  const matches = useMediaQuery('(max-width:430px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenSize, setChosenSize] = useState<string | number | null>(null);

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const addToChart = (): void => {
    chosenSize && bagContext?.addProduct(product.id, +chosenSize);

    setIsModalOpen(false);
    setChosenSize(null);
  };

  const deleteProduct = (): void => {
    handleClose();
    mutate(`${product.id}`);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setChosenSize(null);
        }}
        aria-labelledby="sizes"
        aria-describedby="chose sizes"
        className="tw-flex tw-items-center tw-justify-center"
      >
        <Box className="tw-flex tw-gap-12 tw-flex-col tw-items-center tw-justify-center tw-p-8 tw-bg-white">
          <Typography variant="subtitle1">
            {constants.TEXT.MODAL_HEADER}
          </Typography>

          <Box className="tw-grid lg:tw-grid-cols-5 tw-grid-cols-3  tw-min-w-max tw-gap-4">
            {product.attributes.sizes.data.map((size: ISize) => (
              <SizeBadge
                key={size.id}
                size={size.attributes.value as string}
                available={true}
                selected={chosenSize == size.attributes.value}
                onSelect={setChosenSize}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            disabled={!chosenSize}
            onClick={addToChart}
          >
            {constants.BUTTON_TEXT.MODAL}
          </Button>
        </Box>
      </Modal>

      <Card
        className={`tw-relative tw-m-2.5 ${
          !matches ? 'tw-w-[260px]' : 'tw-w-[152px]'
        }`}
      >
        <div
          className={`tw-flex tw-justify-center tw-items-center ${styles.cardContainer}`}
        >
          <Image
            alt={product.attributes.name}
            src={product.attributes.images.data[0].attributes.url}
            priority={true}
            width={!matches ? 260 : 152}
            height={!matches ? 320 : 170}
            className="tw-object-cover"
          />
          {authorId !== userId && (
            <IconButton
              onClick={() => setIsModalOpen(true)}
              className={`${styles.addToChartButton}`}
            >
              <Paper
                elevation={3}
                className={`tw-rounded-full tw-bg-white/80 ${
                  !matches ? 'tw-w-20 tw-h-20' : 'tw-w-[60px] tw-h-[60px]'
                } tw-flex tw-justify-center tw-items-center tw-flex-col`}
              >
                <Image
                  alt="add to bag"
                  className="tw-mb-1"
                  src="/icons/bag-add.svg"
                  width={!matches ? 20 : 15}
                  height={!matches ? 20 : 15}
                />
                <Typography
                  className={`${!matches ? 'tw-text-[11px]' : 'tw-text-[8px]'}`}
                >
                  {constants.BUTTON_TEXT.CHART}
                </Typography>
              </Paper>
            </IconButton>
          )}

          <IconButton
            onClick={handleClick}
            className="tw-absolute tw-z-10 tw-top-2.5 tw-right-2.5"
          >
            <MoreHorizIcon sx={{fontSize: !matches ? 28 : 20}} />
          </IconButton>
        </div>

        <Menu
          id="basic-menu"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            className: `tw-p-2 ${
              !matches ? 'tw-w-28' : 'tw-w-20'
            } tw-flex tw-flex-col tw-items-start`,
          }}
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <Link href={`/product/${product.id}`} className="tw-w-full">
            <MenuItem
              onClick={handleClose}
              className={`tw-p-0 tw-w-full tw-min-h-0 ${
                matches && 'tw-text-xs'
              }`}
            >
              {constants.MENU_ITEM.VIEW}
            </MenuItem>
          </Link>

          <Divider
            className={`${
              authorId !== userId && 'tw-hidden'
            } tw-my-2 tw-w-full`}
          />

          <MenuItem
            onClick={() => {
              handleClose();
              setIsEditing(true);
            }}
            className={`${
              authorId !== userId && 'tw-hidden'
            } tw-p-0 tw-w-full tw-min-h-0 ${matches && 'tw-text-xs'}`}
          >
            {constants.MENU_ITEM.EDIT}
          </MenuItem>

          <Divider
            className={`${
              authorId !== userId && 'tw-hidden'
            } tw-my-2 tw-w-full`}
          />

          <AlertDialog
            message={`Delete ${product.attributes.name} ?`}
            handleAgree={deleteProduct}
            styles="tw-w-full"
            handleDisagree={handleClose}
          >
            <MenuItem
              className={`${
                authorId !== userId && 'tw-hidden'
              } tw-p-0 tw-w-full tw-min-h-0 ${matches && 'tw-text-xs'}`}
            >
              {constants.MENU_ITEM.DELETE}
            </MenuItem>
          </AlertDialog>
        </Menu>

        <Link href={`/product/${product.id}`}>
          <CardContent
            className={`${!matches ? 'tw-p-4' : 'tw-p-1.5'} tw-cursor-pointer`}
          >
            <Box gap={0.5} display="grid" gridTemplateColumns="repeat(12, 1fr)">
              <Box
                gridColumn="span 9"
                className={`${!matches ? 'tw-w-44' : 'tw-w-28'}`}
              >
                <Typography
                  variant="subtitle1"
                  className={`tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis ${
                    matches && 'tw-text-[10px]'
                  }`}
                >
                  {product.attributes.name}
                </Typography>
              </Box>

              <Box gridColumn="span 3">
                <Typography
                  variant="subtitle1"
                  className={`${matches && 'tw-text-[10px]'}`}
                >
                  ${product.attributes.price}
                </Typography>
              </Box>

              <Box gridColumn="span 12">
                <Typography
                  variant="subtitle2"
                  className={`${matches && 'tw-text-[9px]'}`}
                >
                  {product.attributes.gender.data.attributes.name}&apos;s Shoes
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Link>

        <EditProductModal
          isEditing={isEditing}
          product={product}
          filters={filters}
          setIsEditing={setIsEditing}
        />
      </Card>
    </>
  );
}
