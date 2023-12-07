import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Box, IconButton, Rating, Stack, Typography} from '@mui/material';

interface IProps {
  rate: number;
  author: string;
  location: string;
  comment: string;
  moveNext: () => void;
  movePrev: () => void;
  disableNextBtn: boolean;
  disablePrevBtn: boolean;
}

export default function Comment({
  disableNextBtn,
  disablePrevBtn,
  rate,
  author,
  location,
  comment,
  moveNext,
  movePrev,
}: IProps) {
  return (
    <Box
      style={{
        maxWidth: '756px',
        borderRadius: '32px',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
      className="tw-border-2 tw-px-6 tw-py-7 tw-border-white tw-border-solid tw-m-auto tw-relative tw-top-2/4 tw-z-50 tw-w-10/12"
    >
      <Stack spacing={2} direction="row" className="tw-items-start">
        <Typography variant="subtitle1" className="tw-font-normal">
          {comment}
        </Typography>

        <Stack spacing={2} direction="row" className="tw-items-center">
          <IconButton
            disabled={disablePrevBtn}
            onClick={movePrev}
            style={{border: '1px solid white'}}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            disabled={disableNextBtn}
            onClick={moveNext}
            style={{border: '1px solid white'}}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box className="tw-mt-5">
        <Stack spacing={2} direction="row" className="tw-items-center">
          <Typography variant="subtitle1" className="tw-font-semibold">
            {author}
          </Typography>

          <Rating readOnly value={rate} name="read-only" />
        </Stack>

        <Typography variant="caption">{location}</Typography>
      </Box>
    </Box>
  );
}
