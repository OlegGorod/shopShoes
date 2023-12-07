enum BUTTON_TEXT {
  CHANGE_PHOTO = 'Change photo',
  DELETE_PHOTO = 'Delete',
  SAVE = 'Save changes',
  ADD_PRODUCT = 'Add product',
}

enum TEXT {
  GREETING = 'Welcome',
  BONUS_DEFAULT = '1 374 bonus points',
  MY_PRODUCTS_HEADER = 'My products',
  MY_PROFILE_SETTINGS_HEADER = 'My profile',
  NO_PRODUCTS = 'You don’t have any products yet',
  HINT = 'Post can contain video, images and text.',
}

enum LINK_TEXT {
  MY_PRODUCTS = 'My products',
  SETTINGS = 'Settings',
  LOG_OUT = 'Logout',
}

enum INPUT_LABEL {
  USERNAME = 'Name',
  EMAIL = 'Email',
  PHONE = 'Phone',
}

enum INPUT_PLACEHOLDER {
  USERNAME = 'Jane',
  EMAIL = 'email@email.com',
  PHONE = '(949) 354-2574',
}

const constants = {
  BUTTON_TEXT,
  TEXT,
  LINK_TEXT,
  INPUT_LABEL,
  INPUT_PLACEHOLDER,
};

export default constants;
