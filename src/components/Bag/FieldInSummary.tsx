import {Box, Typography} from '@mui/material';

export default function FieldInSummary({
  name,
  price,
  className,
}: {
  name: string;
  price: string;
  className?: string;
}) {
  const typographyStyles = `tw-font-normal tw-text-3xl ${className}`;

  return (
    <Box className="tw-flex tw-justify-between tw-py-3">
      <Typography className={typographyStyles} variant="h5">
        {name}
      </Typography>

      <Typography className={typographyStyles} variant="h5">
        {price}
      </Typography>
    </Box>
  );
}
