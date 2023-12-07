interface IActionProducts {
  type: 'SET_PRODUCTS';
  payload: IChartProducts;
}

interface IActionAddProduct {
  type: 'ADD_PRODUCT';
  payload: {id: number; size: number};
}

interface IActionRemoveProduct {
  type: 'REMOVE_PRODUCT';
  payload: {id: number; size?: number};
}

interface IActionChangeProductAmount {
  type: 'CHANGE_PRODUCT_AMOUNT';
  payload: {id: number; size: number; amount: number};
}

export interface IBagStore {
  state: IChartProducts | null;
  addProduct: (id: number, size: number) => void;
  removeProduct: (id: number, size?: number) => void;
  setProducts: (products: IChartProducts) => void;
  changeProductAmount: (id: number, size: number, amount: number) => void;
}

export interface IChartProducts {
  [id: number]: {[size: number]: number};
}

export type IAction =
  | IActionAddProduct
  | IActionProducts
  | IActionChangeProductAmount
  | IActionRemoveProduct;
