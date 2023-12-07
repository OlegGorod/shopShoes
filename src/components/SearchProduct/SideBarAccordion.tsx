import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {AccordionDetails, Divider, Typography} from '@mui/material';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import {styled} from '@mui/material/styles';
import {ReactElement} from 'react';

interface IProps {
  title: string;
  children: ReactElement;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:before': {
    display: 'none',
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />}
    {...props}
  />
))(() => ({
  border: '0px',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    rotate: '90deg',
  },
}));

export default function SideBarAccordion({title, children}: IProps) {
  return (
    <>
      <Accordion className="tw-border-none">
        <AccordionSummary className="tw-flex tw-flex-row tw-bg-white">
          <Typography variant="body1" className="tw-font-medium">
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="tw-flex tw-flex-col">
          {children}
        </AccordionDetails>
      </Accordion>
      <Divider className="tw-w-full" />
    </>
  );
}
