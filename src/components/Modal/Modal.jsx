import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={this.handleClose}>
        <div className={styles.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
