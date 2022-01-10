import styles from './Modal.module.scss';
import { useEffect } from 'react';

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, []);

  const hendleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const clickOnModal = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={clickOnModal}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}
