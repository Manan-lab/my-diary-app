import React from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import Button from '../common/button/Button';
import Typography from '../common/typography/Typography';
import Api from '../../api';
import styles from './header.module.css';

function Header (): React.JSX.Element {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const handleLogout = (): void => {
    const api = new Api();
    void api.logOut()
      .then(() => {
        userStore.clearUserInfo();
        navigate('/');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  return (
    <header className={styles.header}>
      <Typography variant="h5" className={styles.greeting}>
        Welcome, {_.get(userStore, 'userInfo.name', '')}!
      </Typography>
      <Button onClick={handleLogout} variant="info">Logout</Button>
    </header>
  );
}

export default Header;
