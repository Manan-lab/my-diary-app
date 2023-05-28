import React from 'react';
import { ToastContainer } from 'react-toastify';
import { observer, Observer } from 'mobx-react';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes/Routes';
import { useStore } from './store';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';

const App: React.FC = observer(() => {
  const { userStore } = useStore();

  const isAuthenticated = Boolean(userStore.userInfo);

  return (
    <Observer>
      {() => (
        <BrowserRouter>
          {isAuthenticated && <Header/>}
          <Routes />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      )}
    </Observer>
  );
});

export default App;
