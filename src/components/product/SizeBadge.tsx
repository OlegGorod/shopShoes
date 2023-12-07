'use client';

import {Box, NoSsr, useTheme} from '@mui/material';
import {Dispatch, SetStateAction} from 'react';

export default function SizeBadge({
  size,
  available,
  selected,
  onSelect,
}: {
  size: string | number;
  available: boolean;
  selected: boolean;
  onSelect:
    | Dispatch<SetStateAction<string | number | undefined>>
    | ((value: string | number) => void);
}) {
  const theme = useTheme();

  let styles = {};
  let classes = '';

  if (available && !selected) {
    classes = 'tw-border-zinc-400 hover:bg-zinc-100 tw-cursor-pointer';
  } else if (!available && !selected) {
    classes =
      'tw-border-zinc-400 tw-bg-zinc-300 tw-text-zinc-400 tw-cursor-default';
  } else if (selected) {
    styles = {
      cursor: 'pointer',
      background: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    };
  }

  return (
    <NoSsr>
      <Box
        className={'tw-border tw-border-solid tw-rounded-md tw-p-4 ' + classes}
        sx={styles}
        onClick={() => available && onSelect(size)}
      >
        <p className="tw-text-center tw-text-sm">{`EU-${size}`}</p>
      </Box>
    </NoSsr>
  );
}
