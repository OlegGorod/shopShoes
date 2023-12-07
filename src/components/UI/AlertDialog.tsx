import {Box, Divider, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {ReactNode, useState} from 'react';

import constants from '@/constants/Bag';

type IProps = {
  message: string;
  handleAgree: () => void;
  children: ReactNode;
  styles?: string;
  handleDisagree?: () => void;
};

export default function AlertDialog({
  message,
  handleAgree,
  children,
  styles,
  handleDisagree,
}: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box className={styles}>
      <Box onClick={() => setOpen(true)}>{children}</Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirmation"
      >
        <DialogTitle
          variant="h3"
          id="alert-dialog-title"
          className="tw-text-ellipsis tw-overflow-hidden"
        >
          {message}
        </DialogTitle>

        <DialogActions className="tw-flex tw-flex-col tw-items-center tw-gap-12 tw-px-6 tw-py-4">
          <Box>
            <Typography variant="subtitle2" className=" tw-pb-12">
              {constants.ALERT_PARAGRAPH}
            </Typography>

            <Divider />
          </Box>

          <Box className="tw-flex tw-items-center tw-ml-0 tw-justify-between tw-gap-12 tw-w-full">
            <Button
              className="tw-w-1/2 tw-p-2"
              variant="outlined"
              onClick={() => {
                setOpen(false);
                handleDisagree?.();
              }}
              autoFocus
            >
              {constants.DIALOG_BUTTONS.REFUSAL}
            </Button>

            <Button
              className="tw-w-1/2 tw-p-2"
              variant="contained"
              onClick={() => {
                setOpen(false);
                handleAgree();
              }}
            >
              {constants.DIALOG_BUTTONS.CONFIRMATION}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
