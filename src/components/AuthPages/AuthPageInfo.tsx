import {Typography, useMediaQuery} from '@mui/material';

interface IProps {
  info: string;
  title: string;
}

export default function AuthPageInfo({title, info}: IProps) {
  const matches = useMediaQuery('(max-width:425px)');

  return (
    <article
      className="tw-w-full tw-mb-2.5"
      style={{maxWidth: matches ? '320px' : '436px'}}
    >
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>

      <Typography variant="subtitle2" gutterBottom>
        {info}
      </Typography>
    </article>
  );
}
