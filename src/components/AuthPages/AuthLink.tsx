import {Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import Link from 'next/link';

interface IProps {
  text: string;
  link: string;
  linkText: string;
}

export default function AuthLink({text, linkText, link}: IProps) {
  const theme = useTheme();

  return (
    <Typography variant="subtitle2" className="tw-mt-5">
      {text}
      <Link
        href={link}
        className="tw-no-underline tw-text-base tw-ml-2"
        style={{color: theme.palette.error.main}}
      >
        {linkText}
      </Link>
    </Typography>
  );
}
