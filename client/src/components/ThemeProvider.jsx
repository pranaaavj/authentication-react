import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='dark:bg-slate-800'>{children}</div>
    </div>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.any,
};
