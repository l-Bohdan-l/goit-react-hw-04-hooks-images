import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import Loader from 'react-loader-spinner';
import { Modal } from '../Modal/Modal';
import styles from './ImageGallery.module.scss';
import PropTypes from 'prop-types';
import { findImage } from '../../services/ApiSrvice';

export class ImageGallery extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    openModal: PropTypes.func,
  };

  state = {
    imgQuery: '',
    page: 1,
    imgArray: [],
    loading: false,
    showModal: false,
    largeUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imgQuery !== this.props.imgQuery) {
      this.setState({ loading: true });
      this.setState({ page: 1, imgArray: [] });
    }

    if (
      prevProps.imgQuery !== this.props.imgQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      setTimeout(() => {
        findImage(this.props.imgQuery, this.state.page)
          .then(data => {
            this.setState(({ imgArray }) => {
              return { imgArray: [...imgArray, ...data.hits] };
            });
          })
          .finally(() => this.setState({ loading: false }));
      }, 1000);
      return;
    }
  }

  nextPage = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getLargeUrl = e => {
    const image = this.state.imgArray.find(
      img => img.webformatURL === e.target.src,
    );
    this.setState(({ largeUrl }) => ({
      largeUrl: image.largeImageURL,
    }));
  };

  // largeUrl =() => {this.getLargeUrl(image. largeImageURL)}

  // getLargeUrl = largeUrl => {
  // this.setState(({ largeUrl }) => ({
  // largeUrl
  // }));
  // };

  render() {
    return (
      <>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeUrl} alt={this.state.imgQuery} />
          </Modal>
        )}
        <ul className={styles.ImageGallery}>
          {this.state.imgArray.map(image => (
            <ImageGalleryItem
              key={image.id}
              link={image.webformatURL}
              name={this.props.imgQuery}
              largeUrl={this.getLargeUrl}
              openModal={this.toggleModal}
            />
          ))}
        </ul>
        {this.state.loading && (
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        )}
        {this.state.imgArray.length !== 0 && <Button onClick={this.nextPage} />}
      </>
    );
  }
}
