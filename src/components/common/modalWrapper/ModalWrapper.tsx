import React from 'react';
import styles from './modalWrapper.module.css';

interface ContentProps {
  handleSave: (data: any) => void
}

interface LoginModalProps {
  title: string;
  modalProps?: Record<string, unknown>;
  content: React.FC<ContentProps>;
  handleClose: () => void;
  handleSave: (data: any) => void
}

const ModalWrapper: React.FC<LoginModalProps> = ({ title, content: Content, modalProps, handleClose, handleSave }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>{title}</h5>
          <button
            onClick={handleClose}
            type="button"
            className={styles.close}
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <Content
          {...modalProps}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ModalWrapper;
