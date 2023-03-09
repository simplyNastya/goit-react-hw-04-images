import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => {
  return <p>{error}</p>;
};

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMessage;
