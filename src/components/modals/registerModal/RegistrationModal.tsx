import React, { useState } from 'react';
import _ from 'lodash';
import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import { type RegisterCredentialsType } from '../../../types';
import { isValidEmail } from '../../../utils';
import Typography from '../../common/typography/Typography';
import styles from './registerModal.module.css';

interface ModalProps {
  handleSave: (userParams: RegisterCredentialsType) => void
}

const RegisterModal: React.FC<ModalProps> = ({ handleSave }) => {
  const [nameValidationMessage, setNameValidationMessage] = useState<string>('');
  const [emailValidationMessage, setEmailValidationMessage] = useState<string>('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<string>('');
  const [userData, setUserData] =
    useState<RegisterCredentialsType>({
      name: '',
      email: '',
      password: ''
    });

  const handleUserDataChange = (value: string, key: string): void => {
    const updatedData = {
      ...userData,
      [key]: value
    };

    setUserData(updatedData);
  };

  const handleSubmitRegister = (): void => {
    if (userData != null) {
      const { name, email, password } = userData;

      if (_.isEmpty(email)) {
        setEmailValidationMessage('Email is required.');
      } else if (!isValidEmail(email)) {
        setEmailValidationMessage('Invalid email format.');
      } else if (_.isEmpty(name)) {
        setNameValidationMessage('Name is required.');
      } else if (_.isEmpty(password)) {
        setPasswordValidationMessage('Password is required.');
      } else if (password.length < 6) {
        setPasswordValidationMessage('Password length must be more than 5.');
      } else {
        setEmailValidationMessage('');
        setNameValidationMessage('');
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
      <label htmlFor="name">Name:</label>
      <Input
        id="name"
        type="text"
        className={`${nameValidationMessage !== '' ? styles.errorContainer : ''}`}
        value={userData.name}
        handleChange={(evt) => { handleUserDataChange(evt.target.value, 'name'); }}
      />
      {(nameValidationMessage !== '') && (
        <Typography variant="p3" className={styles.errorMessage}>{nameValidationMessage}</Typography>
      )}
      <label htmlFor="password">Password:</label>
      <Input
        id="password"
        type="password"
        className={`${passwordValidationMessage !== '' ? styles.errorContainer : ''}`}
        value={userData.password}
        handleChange={(evt) => { handleUserDataChange(evt.target.value, 'password'); }}
      />
      {(passwordValidationMessage !== '') && (
        <Typography variant="p3" className={styles.errorMessage}>{passwordValidationMessage}</Typography>
      )}
      <Button
        variant='info'
        onClick={handleSubmitRegister}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterModal;
