import Link from 'next/link';

interface IProps {
  text: string;
  link: string;
}

export default function ReturnLinkUI({text, link}: IProps) {
  return (
    <Link
      href={link}
      style={{color: '#494949'}}
      className="tw-font-medium tw-no-underline tw-text-base tw-mt-5 tw-text-black"
    >
      {text}
    </Link>
  );
}
