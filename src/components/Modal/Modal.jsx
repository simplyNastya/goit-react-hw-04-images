import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    document.body.addEventListener('keydown', handleClose);
    return () => {
      document.body.removeEventListener('keydown', handleClose);
    };
  }, []);

  const handleClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      closeModal();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
