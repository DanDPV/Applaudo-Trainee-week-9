import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from 'routers/AppRouter/AppRouter';
import store, { persistor } from 'store/store';
import Loading from 'components/Loading/Loading';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

export default App;
