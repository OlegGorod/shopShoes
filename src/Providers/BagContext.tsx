import {ReactElement, useEffect} from 'react';

import {useBagStore} from '@/hooks/store/bag';
import {BagContext} from '@/store/Bag';

interface IProps {
  children: ReactElement;
}

export function BagContextProvider({children}: IProps) {
  const bagStore = useBagStore();

  useEffect(() => {
    const res = localStorage.getItem('chart');

    if (res) {
      bagStore?.setProducts(JSON.parse(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bagStore?.state !== null) {
      localStorage.setItem('chart', JSON.stringify(bagStore?.state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bagStore?.state]);

  return <BagContext.Provider value={bagStore}>{children}</BagContext.Provider>;
}
