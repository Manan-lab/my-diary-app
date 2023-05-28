import React from 'react';
import styles from './input.module.css';

interface InputProps {
  id?: string;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  type: string;
  className?: string;
  placeholder?: string;
  cols?: number;
  rows?: number
}

const Input: React.FC<InputProps> = ({
  id = '',
  handleChange,
  type,
  value,
  className = '',
  placeholder = '',
  cols = 30,
  rows = 10
}) => {
  return (
    <>
      {
        type === 'textArea'
          ? <textarea
            id={id}
            cols={cols}
            rows={rows}
            className={className}
            onChange={handleChange}
            value={value}
          />
          : <input
            id={id}
            type={type}
            className={`${className} ${styles.inputMain}`}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
          />

      }
    </>
  );
};

export default Input;
