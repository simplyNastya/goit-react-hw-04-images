import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ imageURL, showModal, largeImageURL, tags }) => {
  return (
    <li
      onClick={() => showModal(largeImageURL, tags)}
      className={styles.imageGalleryItem}
    >
      <img src={imageURL} alt={tags} className={styles.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
