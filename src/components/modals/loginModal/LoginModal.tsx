import React, { useState } from 'react';
import _ from 'lodash';
import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import Typography from '../../common/typography/Typography';
import { type LoginCredentialsType } from '../../../types';
import { isValidEmail } from '../../../utils';
import styles from './loginModal.module.css';

interface LoginModalProps {
  handleSave: (userParams: LoginCredentialsType) => void
}

const LoginModal: React.FC<LoginModalProps> = ({ handleSave }) => {
  const [emailValidationMessage, setEmailValidationMessage] = useState<string>('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<string>('');
  const [userData, setUserData] = useState<LoginCredentialsType>(
    {
      email: '',
      password: ''
    }
  );

  const handleUserDataChange = (value: string, key: string): void => {
    const updatedData = {
      ...userData,
      [key]: value
    };

    setUserData(updatedData);
  };

  const handleSubmitLogin = (): void => {
    if (userData != null) {
      const { email, password } = userData;

      if (_.isEmpty(email)) {
        setEmailValidationMessage('Email is required.');
      } else if (!isValidEmail(email)) {
        setEmailValidationMessage('Invalid email format.');
      } else if (_.isEmpty(password)) {
        setPasswordValidationMessage('Password is required.');
      } else {
        setEmailValidationMessage('');
        setPasswordValidationMessage('');
        handleSave(userData);
      }
    }
  };

  return (
    <div className={styles.modalContainer}>
      <label htmlFor="email">Email:</label>
      <Input
        id="email"
        type="email"
        className={`${emailValidationMessage !== '' ? styles.errorContainer : ''}`}
        value={userData.email}
        handleChange={(evt) => { handleUserDataChange(evt.target.value, 'email'); }}
      />
      {(emailValidationMessage !== '') && (
        <Typography variant="p3" className={styles.errorMessage}>{emailValidationMessage}</Typography>
      )}
      <label htmlFor="password">Password:</label>
      <Input
        id="password"
        type='password'
        className={`${passwordValidationMessage !== '' ? styles.errorContainer : ''}`}
        value={userData.password}
        handleChange={(evt) => { handleUserDataChange(evt.target.value, 'password'); }}
      />
      {(passwordValidationMessage !== '') && (
        <Typography variant="p3" className={styles.errorMessage}>{passwordValidationMessage}</Typography>
      )}
      <Button
        variant='info'
        onClick={handleSubmitLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginModal;
