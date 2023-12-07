const DOLLAR_SIGN = '$';
const TAXES = 0;
const SHIPPING_PRICE = 20;
const ALERT_PARAGRAPH =
  'Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur. ';

enum BAG_CONTENT {
  HEADER = 'Cart',
  CHECKOUT_BUTTON_TEXT = 'Go to checkout',
  DELETE_BUTTON_TEXT = 'Delete',
}

enum EMPTY_BAG_CONTENT {
  HEADER = 'Cart',
  SYBTITLE1 = 'You don`t have any products yet',
  SYBTITLE2 = 'Post can contain video, images and text.',
  BUTTON_TEXT = 'Add product',
}

enum DIALOG_BUTTONS {
  CONFIRMATION = 'Delete',
  REFUSAL = 'Cancel',
}

enum SUMMARY_CONTENT {
  HEADER = 'Summary',
  TITLE_FOR_COLLAPSIBLE_AREA = 'Do you have a promocode ?',
  INPUT_PLACEHOLDER = 'Enter promocode',
  BUTTON_TEXT = 'Checkout',
}

enum ITEM_IN_BAG_CONTENT {
  INPUT = 'Quantity',
  DIALOG_MESSAGE = 'Are you sure to delete selected item?',
}

enum ITEM_IMAGE_SIZES {
  LARGE_WIDTH = 223,
  LARGE_HEIGHT = 214,
  SMALL_WIDTH = 104,
  SMALL_HEIGHT = 104,
}

enum ITEM_STATUS {
  AVAILABLE = 'In stock',
  NOT_AVAILABLE = 'Size is not available',
}

const constants = {
  DOLLAR_SIGN,
  TAXES,
  SHIPPING_PRICE,
  ALERT_PARAGRAPH,
  EMPTY_BAG_CONTENT,
  DIALOG_BUTTONS,
  BAG_CONTENT,
  SUMMARY_CONTENT,
  ITEM_IN_BAG_CONTENT,
  ITEM_IMAGE_SIZES,
  ITEM_STATUS,
};

export default constants;
