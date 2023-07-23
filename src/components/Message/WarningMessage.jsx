import Notiflix from 'notiflix';

const WarningMessage = () => {
  return Notiflix.Notify.warning(
    'Sorry, but nothing was found for your request!'
  );
};

export default WarningMessage;
