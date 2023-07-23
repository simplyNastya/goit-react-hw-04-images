import { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import Notiflix from 'notiflix';
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
      return Notiflix.Notify.info('Please enter a valid search term');
    }
    if (!searchValue.match(/^[a-zA-Z0-9-_ ]*$/)) {
      return Notiflix.Notify.info('Invalid search query');
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
        <div className="loader">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#3f51b5"
          />
        </div>
      )}
      {Boolean(items.length) && items.length !== totalHits && (
        <Button loadMore={loadMore} />
      )}
    </div>
  );
};
