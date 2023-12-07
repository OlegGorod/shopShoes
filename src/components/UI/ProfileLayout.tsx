import {Box} from '@mui/material';
import {ReactElement, useState} from 'react';

import ProfileSideBar from './ProfileSidebar';

const ProfileLayout = ({children}: {children: ReactElement}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className="tw-flex tw-relative">
      <ProfileSideBar isOpen={isOpen} close={() => setIsOpen(false)} />
      {children}
    </Box>
  );
};

export default ProfileLayout;
