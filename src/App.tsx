import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import QueryClientProvider from './providers/QueryClientProvider';
import Router from './router/Router';
import { store } from './store/store';
import { createPortal } from 'react-dom';
import Loading from './pages/Loading/Loading';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainSnackbar from './components/MainSnackBar';
import FullscreenLoader from './Layouts/Theme/components/loader/FullscreenLoader/FullscreenLoader';

const theme = unstable_createMuiStrictModeTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <QueryClientProvider>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
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
