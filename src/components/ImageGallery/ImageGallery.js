import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import Loader from 'react-loader-spinner';
import { Modal } from '../Modal/Modal';
import styles from './ImageGallery.module.scss';
import PropTypes from 'prop-types';
import { findImage } from '../../services/ApiSrvice';
import { useState, useEffect } from 'react';

export function ImageGallery({ value }) {
  const [imgQuery, setImgQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imgArray, setImgArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');

  useEffect(() => {
    if (!value) return;
    setLoading(true);
    setTimeout(() => {
      findImage(value, page)
        .then(data => {
          setImgArray([...data.hits]);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, [value, page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeUrl = largeImageURL => {
    setLargeUrl(largeImageURL);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeUrl} alt={imgQuery} />
        </Modal>
      )}
      <ul className={styles.ImageGallery}>
        {imgArray.map(image => (
          <ImageGalleryItem
            key={image.id}
            link={image.webformatURL}
            name={imgQuery}
            largeUrl={() => getLargeUrl(image.largeImageURL)}
            openModal={toggleModal}
          />
        ))}
      </ul>
      {loading && (
        <Loader type="Rings" color="#00BFFF" height={80} width={80} />
      )}
      {imgArray.length !== 0 && <Button onClick={nextPage} />}
    </>
  );
}

ImageGallery.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  openModal: PropTypes.func,
};
