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
  const [page, setPage] = useState(0);
  const [imgArray, setImgArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeUrl, setLargeUrl] = useState('');

  console.log('searc', value);
  // useEffect(() => {
  //   setPage(page + 1), [value]
  // })

  useEffect(() => {
    // setPage(1);
    // setImgArray([])

    setLoading(true);
    setTimeout(() => {
      findImage(value, page + 1)
        .then(data => {
          setImgArray([...imgArray, ...data.hits]);
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

  const getLargeUrl = e => {
    const image = imgArray.find(img => img.webformatURL === e.target.src);
    setLargeUrl(image.largeImageURL);
  };

  // largeUrl =() => {this.getLargeUrl(image. largeImageURL)}

  // getLargeUrl = largeUrl => {
  // this.setState(({ largeUrl }) => ({
  // largeUrl
  // }));
  // };

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
            largeUrl={getLargeUrl}
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
