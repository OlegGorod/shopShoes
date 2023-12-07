enum FORM {
  HEADER_TEXT = 'Add a product',
  BUTTON_TEXT = 'Save',
  PARAGRAPH = 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero.s De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:',
}

enum INPUT_LABEL {
  NAME = 'Product name',
  PRICE = 'Price',
  GENDER = 'Gender',
  BRAND = 'Brand',
  DESCRIPTION = 'Description',
  SIZES = 'Add size',
  COLOR = 'Add color',
  IMAGES = 'Product images',
  CATEGORIES = 'Product categories',
}

enum INPUT_PLACEHOLDER {
  NAME = 'Nike Air Max 90',
  PRICE = '$160',
  DESCRIPTION = 'Do not exceed 300 characters.',
}

enum SIDE_MENU {
  GREETING = 'Welcome',
  ORDERS = 'Orders',
  SETTINGS = 'Settings',
  LOG_OUT = 'Log out',
}

enum IMAGE_UPLOADER {
  TEXT = 'Drop your image here, or select click to browse',
}

const constants = {
  FORM,
  INPUT_LABEL,
  INPUT_PLACEHOLDER,
  SIDE_MENU,
  IMAGE_UPLOADER,
};

export default constants;
