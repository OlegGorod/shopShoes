import {Box, Button} from '@mui/material';
import Image from 'next/image';
import {ChangeEvent, Dispatch, useEffect, useRef, useState} from 'react';

import constants from '@/constants/Profile';

const AvatarUpload = ({
  className,
  avatar,
  selectedFile,
  setSelectedFile,
}: {
  className?: string;
  avatar: string;
  selectedFile: File | undefined | null;
  setSelectedFile: Dispatch<File | null>;
}) => {
  const [preview, setPreview] = useState<string>(avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let objectUrl: string;
    if (selectedFile) {
      objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onAvatarDelete = () => {
    setSelectedFile(null);
    setPreview('/images/defaultAvatar.jpg');
  };

  return (
    <Box className={`tw-flex tw-items-center tw-w-full tw-gap-10 ${className}`}>
      <Image
        src={preview}
        alt="Avatar"
        width={150}
        height={150}
        className="tw-rounded-full tw-object-cover"
      />

      <Box className="tw-flex tw-flex-col tw-gap-6">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          ref={fileInputRef}
          className="tw-hidden"
        />

        <Button
          variant="outlined"
          onClick={() => fileInputRef.current?.click()}
        >
          {constants.BUTTON_TEXT.CHANGE_PHOTO}
        </Button>

        <Button
          variant="contained"
          onClick={onAvatarDelete}
          disabled={preview === '/images/defaultAvatar.jpg'}
        >
          {constants.BUTTON_TEXT.DELETE_PHOTO}
        </Button>
      </Box>
    </Box>
  );
};

export default AvatarUpload;
