import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.scss';

export const ImageGalleryItem = ({ link, openModal, name, largeUrl }) => {
  return (
    <li className={styles.image} onClick={openModal}>
      <img className={styles.image} src={link} alt={name} onClick={largeUrl} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  link: PropTypes.string,
  name: PropTypes.string,
};
