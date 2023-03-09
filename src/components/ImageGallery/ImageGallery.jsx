import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.css';

const ImageGallery = ({ items, showModal }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      key={id}
      imageURL={webformatURL}
      largeImageURL={largeImageURL}
      tags={tags}
      showModal={showModal}
    />
  ));
  return <ul className={styles.imageGallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  showModal: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
