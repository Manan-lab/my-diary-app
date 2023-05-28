import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from '../../store';
import Button from '../../components/common/button/Button';
import RegisterModal from '../../components/modals/registerModal/RegistrationModal';
import LoginModal from '../../components/modals/loginModal/LoginModal';
import ModalWrapper from '../../components/common/modalWrapper/ModalWrapper';
import Typography from '../../components/common/typography/Typography';
import { type LoginCredentialsType, type RegisterCredentialsType, type UserInfoType } from '../../types';
import Api from '../../api';
import styles from './welcomePage.module.css';

const WelcomePage: React.FC = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const handleRegisterClick = (): void => {
    setShowRegisterModal(!showRegisterModal);
  };

  const handleLoginClick = (): void => {
    setShowLoginModal(!showLoginModal);
  };

  const handleUserRegister = (newUserCredentials: RegisterCredentialsType): void => {
    const api = new Api();
    void api.register(newUserCredentials)
      .then(() => {
        toast.success('Congratulations, you have successfully registered 🎉! Now you can login.');
        setShowRegisterModal(false);
        setShowLoginModal(true);
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleUserLogin = (userCredentials: LoginCredentialsType): void => {
    const api = new Api();
    void api.logIn(userCredentials)
      .then(res => {
        userStore.setUserInfo(res as UserInfoType);
        navigate('/diary');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <Typography variant='h1'>Welcome to My Diary!</Typography>
      <Typography variant='p1'>
        To try all the features of the app, please register or log in if you already have an account
      </Typography>
      <div className={styles.btnContainer}>
        <Button
          className={styles.btn}
          variant='warning'
          onClick={handleRegisterClick}
        >
          Register
        </Button>
        <Button
          variant='success'
          className={styles.btn}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
      {
        showRegisterModal && (
          <ModalWrapper
            content={ RegisterModal }
            handleClose={() => { setShowRegisterModal(false); }}
            handleSave={handleUserRegister}
            title='Register'
          />
        )
      }
      {
        showLoginModal && (
          <ModalWrapper
            content={ LoginModal }
            handleClose={() => { setShowLoginModal(false); }}
            handleSave={handleUserLogin}
            title='Login'
          />
        )
      }
    </div>
  );
};

export default observer(WelcomePage);
