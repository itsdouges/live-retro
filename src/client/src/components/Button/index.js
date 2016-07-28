import { PropTypes } from 'react';
import styles from './styles.less';

const Button = (props) => (
  <div
    className={`${styles.button} ${props.enabled ? '' : styles.disabled}`}
    onClick={() => props.enabled && props.onClick()}
  >
    {props.text}
  </div>
);

Button.prototype.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  enabled: PropTypes.bool,
};

export default Button;
