import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Box, Button, Typography} from '@mui/material';
import {ReactNode, useState} from 'react';

export default function CollapsibleArea({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box className="tw-flex tw-flex-col">
      <Button
        aria-label={title}
        className={`tw-cursor-pointer ${className}`}
        sx={{
          color: expanded ? 'text.contrast' : 'text.secondary',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography>{title}</Typography>

        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>

      <Box
        className=" tw-grid tw-transition-all tw-duration-400"
        aria-expanded={expanded}
        sx={{
          '&[aria-expanded="true"]': {
            gridTemplateRows: '1fr',
          },
          '&[aria-expanded="false"]': {
            gridTemplateRows: '0fr',
          },
        }}
      >
        <Box className="tw-overflow-hidden">{children}</Box>
      </Box>
    </Box>
  );
}
