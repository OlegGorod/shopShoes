const popularSearchTermsDefault = [
  {
    id: 1,
    attributes: {
      name: 'Nike Air Force 1 LV8',
    },
  },
  {
    id: 2,
    attributes: {
      name: 'Nike Air Force 1',
    },
  },
  {
    id: 3,
    attributes: {
      name: 'Nike Air Force 1 07 High',
    },
  },
];

enum TEXT {
  POPULAR_SEARCH = 'Popular Search Terms',
}

enum LINK_TEXT {
  PRODUCTS = 'Products',
  SIGN_IN = 'Sign in',
}

enum INPUT_PLACEHOLDER {
  SEARCH = 'Search...',
}

const constants = {
  popularSearchTermsDefault,
  TEXT,
  LINK_TEXT,
  INPUT_PLACEHOLDER,
};

export default constants;
