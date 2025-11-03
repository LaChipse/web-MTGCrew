import { Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import MainSnackbar from './components/MainSnackBar';
import FullscreenLoader from './Layouts/Theme/components/loader/FullscreenLoader/FullscreenLoader';
import Loading from './pages/loader/Loading/Loading';
import QueryClientProvider from './providers/QueryClientProvider';
import Router from './router/Router';
import { store } from './store/store';

const App = () => (
  <ReduxProvider store={store}>
    <QueryClientProvider>
      <FullscreenLoader />
      <Suspense fallback={<Loading />}>
        <Router />
      </Suspense>
      {createPortal(<MainSnackbar />, document.body)}
    </QueryClientProvider>
  </ReduxProvider>
);

export default App;
