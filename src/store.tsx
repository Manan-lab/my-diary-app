import React from 'react';
import { useLocalObservable } from 'mobx-react';
import rootStore, { type RootStore } from './stores';

const StoreContext = React.createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const store = useLocalObservable(() => rootStore);
  return <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>;
};

export const useStore = (): RootStore => {
  const store = React.useContext(StoreContext);
  if (store == null) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
