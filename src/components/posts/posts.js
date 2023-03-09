import axios from 'axios';

const API_KEY = '33057333-6c82ba77f09b588ec1ac95420';

const getPost = (searchRequest, page = 1) => {
  return axios.get(
    `https://pixabay.com/api/?q=${searchRequest}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default getPost;
