import ClearIcon from '@mui/icons-material/Clear';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {useIsFetching} from '@tanstack/react-query';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/router';
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

import constants from '@/constants/Header';
import {TPopularSearchTerm} from '@/types/header';

export default function SearchInput({
  inputIsActive,
  setInputIsActive,
  popularSearchTerms,
}: {
  inputIsActive: boolean;
  setInputIsActive: Dispatch<SetStateAction<boolean>>;
  popularSearchTerms: Array<TPopularSearchTerm>;
}) {
  const matches = useMediaQuery('(min-width: 768px)');
  const [matchesInSearch, setMatchesInSearch] = useState(
    constants.popularSearchTermsDefault,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoading = useIsFetching({queryKey: ['get-all-products']});
  const [inputValue, setInputValue] = useState('');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return;

    if (inputValue.length) {
      setQueryParams();
    } else {
      router.push('/');
      setInputIsActive(false);
    }
  };

  const setQueryParams = (value?: string) => {
    router.push(
      '/?' + createQueryString('search', value || inputValue),
      undefined,
      {
        shallow: true,
      },
    );
    setInputIsActive(false);
  };

  const searchMatches = (value: string) => {
    const matches = popularSearchTerms.filter(term =>
      term.attributes.name.toLowerCase().includes(value.toLowerCase()),
    );
    setMatchesInSearch(matches);
  };

  return (
    <>
      <Backdrop
        open={!!isLoading && inputIsActive}
        sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        className={`${
          inputIsActive &&
          'tw-z-40 tw-absolute tw-top-0 tw-left-0 tw-flex tw-justify-between tw-items-start tw-w-screen tw-p-4 tw-pb-8 tw-bg-white'
        }`}
      >
        {inputIsActive && (
          <Link href="/">
            <Image src="/icons/logo.svg" alt="logo" width={40} height={30} />
          </Link>
        )}

        {matches || inputIsActive ? (
          <Box className="tw-flex tw-flex-col tw-items-start tw-gap-4 tw-w-3/4">
            <TextField
              value={inputValue}
              onClick={() => setInputIsActive(true)}
              onChange={({target: {value}}) => {
                setInputValue(value);
                searchMatches(value);
              }}
              onKeyDown={event => handleKeyDown(event)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Image
                      src="/icons/search-normal.svg"
                      alt="search"
                      width={24}
                      height={24}
                    />
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              disabled={!!isLoading}
              className={inputIsActive ? 'tw-w-full' : 'tw-w-80'}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '31px',
                },
              }}
              placeholder={constants.INPUT_PLACEHOLDER.SEARCH}
            />

            {inputIsActive && (
              <>
                <Typography variant="subtitle2">
                  {constants.TEXT.POPULAR_SEARCH}
                </Typography>

                {matchesInSearch.map(term => (
                  <Button
                    className="tw-p-0 tw-text-black tw-justify-start"
                    key={term.id}
                    onClick={() => {
                      setInputValue(term.attributes.name);
                      setQueryParams(term.attributes.name);
                      setInputIsActive(false);
                    }}
                  >
                    {term.attributes.name}
                  </Button>
                ))}
              </>
            )}
          </Box>
        ) : (
          <Image
            src="/icons/search-normal.svg"
            alt="search"
            width={24}
            height={24}
            onClick={() => setInputIsActive(true)}
          />
        )}

        {inputIsActive && (
          <IconButton
            aria-label="delete"
            onClick={() => setInputIsActive(false)}
            className="tw-p-0"
          >
            <ClearIcon fontSize="large" className="tw-text-gray-500" />
          </IconButton>
        )}
      </Box>

      {inputIsActive && (
        <Box
          onClick={() => setInputIsActive(false)}
          className="tw-z-30 tw-absolute tw-top-0 tw-left-0 tw-bg-white tw-opacity-80 tw-w-screen tw-h-screen"
        />
      )}
    </>
  );
}
