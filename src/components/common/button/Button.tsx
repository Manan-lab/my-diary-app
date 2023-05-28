import React from 'react';
import { type ButtonColorType } from '../../../types';
import styles from './button.module.css';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  variant: ButtonColorType
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, variant }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.buttonMain} ${styles[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
