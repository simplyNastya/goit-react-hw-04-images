import { useEffect, useState } from 'react';
import { LineWave } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ErrorMessage from './Message/ErrorMessage';
import WarningMessage from './Message/WarningMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import getPost from './posts/posts';
import '../index.css';

export const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [searchRequest, setSearchRequest] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoader(true);
        setMessage(false);
        const { data } = await getPost(searchRequest, page);
        if (data.hits.length) {
          setItems(prevItems => [...prevItems, ...data.hits]);
          setTotalHits(data.totalHits);
        } else {
          setItems([]);
          setMessage(true);
        }
      } catch ({ response: { data } }) {
        setError(
          data || 'Error! Unable to load the image, please try again later!'
        );
      } finally {
        setIsLoader(false);
      }
    };
    if (searchRequest) {
      fetchPost();
    }
  }, [searchRequest, page]);

  const submitHandler = searchValue => {
    if (!searchValue.trim()) {
      alert('Please enter a valid search term');
      return;
    }
    if (!searchValue.match(/^[a-zA-Z0-9-_ ]*$/)) {
      alert('Invalid search query');
      return;
    }
    if (searchValue === searchRequest) {
      return;
    }
    setItems([]);
    setPage(1);
    setSearchRequest(searchValue);
    setIsLoader(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toShowModal = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <Searchbar onSubmit={submitHandler} />
      {error && <ErrorMessage error={error} />}
      {message && <WarningMessage />}
      {items.length > 0 && (
        <ImageGallery items={items} showModal={toShowModal} />
      )}
      {isLoader && (
        <LineWave
          color="#8se36t"
          ariaLabel="lineWave-loading"
          wrapperClass="Loader"
        />
      )}
      {Boolean(items.length) && items.length !== totalHits && (
        <Button loadMore={loadMore} />
      )}
    </div>
  );
};
