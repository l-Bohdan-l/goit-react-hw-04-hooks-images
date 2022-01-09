import { Component } from 'react';
import styles from './Modal.module.scss';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  clickOnImg = e => {
    this.props.onClose();
  };

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  clickOnModal = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.clickOnModal}>
        <div className={styles.modal}>{this.props.children}</div>
      </div>
    );
  }
}
