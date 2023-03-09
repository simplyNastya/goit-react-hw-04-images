import { Component } from 'react';
import { LineWave } from 'react-loader-spinner';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ErrorMessage from './Message/ErrorMessage';
import WarningMessage from './Message/WarningMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import getPost from './posts/posts';
import '../index.css';

export class App extends Component {
  state = {
    items: [],
    page: 1,
    searchRequest: '',
    isLoader: false,
    error: '',
    message: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchRequest, page } = this.state;

    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      this.fetchPost();
    }
  }

  async fetchPost() {
    const { searchRequest, page } = this.state;

    try {
      this.setState({ isLoader: true, message: false });
      const {
        data: { hits },
      } = await getPost(searchRequest, page);
      hits.length
        ? this.setState(prevState => ({
            items: [...prevState.items, ...hits],
          }))
        : this.setState({ items: [], message: true });
    } catch ({ response: { data } }) {
      this.setState({
        error:
          data || 'Error! Unable to load the image, please try again later!',
      });
    } finally {
      this.setState({ isLoader: false });
    }
  }

  submitHandler = searchValue => {
    if (!searchValue.trim()) {
      alert('Please enter a valid search term');
      return;
    }
    if (!searchValue.match(/^[a-zA-Z0-9-_ ]*$/)) {
      alert('Invalid search query');
      return;
    }

    if (searchValue === this.state.searchRequest) {
      return;
    }
    this.setState({
      items: [],
      page: 1,
      searchRequest: searchValue,
      isLoader: false,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  showModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      largeImageURL,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { items, isLoader, error, message, showModal, largeImageURL, tags } =
      this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.submitHandler} />
        {error && <ErrorMessage error={error} />}
        {message && <WarningMessage />}
        {items.length > 0 && (
          <ImageGallery items={items} showModal={this.showModal} />
        )}
        {isLoader && (
          <LineWave
            color="#8se36t"
            ariaLabel="lineWave-loading"
            wrapperClass="Loader"
          />
        )}
        {Boolean(items.length) && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
