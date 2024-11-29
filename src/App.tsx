import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import { Suspense } from 'react';
import { createPortal } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import MainSnackbar from './components/MainSnackBar';
import FullscreenLoader from './Layouts/Theme/components/loader/FullscreenLoader/FullscreenLoader';
import Loading from './pages/Loading/Loading';
import QueryClientProvider from './providers/QueryClientProvider';
import Router from './router/Router';
import { store } from './store/store';

const theme = unstable_createMuiStrictModeTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <QueryClientProvider>
            <FullscreenLoader />
            <Suspense fallback={<Loading />}>
              <Router />
            </Suspense>
            {createPortal(<MainSnackbar />, document.body)}
          </QueryClientProvider>
        </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
