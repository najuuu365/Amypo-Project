import React from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { useInRouterContext, MemoryRouter } from 'react-router-dom';
import store from '../../store';

export function SafeWrapper({ children }) {
  const inRouter = useInRouterContext();
  const reduxContext = React.useContext(ReactReduxContext);
  const inRedux = Boolean(reduxContext && reduxContext.store);

  let content = children;
  if (!inRedux && store) {
    content = <Provider store={store}>{content}</Provider>;
  }
  if (!inRouter) {
    content = <MemoryRouter>{content}</MemoryRouter>;
  }
  return content;
}

export default SafeWrapper;
