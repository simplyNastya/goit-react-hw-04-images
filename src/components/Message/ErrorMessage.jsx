import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => {
  return <p>{error}</p>;
};

export default ErrorMessage;

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};
