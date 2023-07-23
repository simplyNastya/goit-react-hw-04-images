import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

const ErrorMessage = ({ error }) => {
  return Notiflix.Notify.error({ error });
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};
