import React from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import { useInRouterContext, MemoryRouter } from 'react-router-dom';
import store from '../../store';

export function SafeWrapper({ children }) {
  let inRouter = false;
  try {
    inRouter = typeof useInRouterContext === 'function' && useInRouterContext();
  } catch (e) {
    inRouter = false;
  }

  let inRedux = false;
  try {
    const reduxContext = React.useContext(ReactReduxContext);
    inRedux = Boolean(reduxContext && reduxContext.store);
  } catch (e) {
    inRedux = false;
  }

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
