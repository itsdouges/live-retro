import { PropTypes } from 'react';
import styles from './styles.less';

function getStyle(props) {
  if (!props.enabled) {
    return {
      borderColor: props.color,
      color: props.color,
      backgroundColor: undefined,
    };
  }

  return {
    borderColor: props.color,
    backgroundColor: props.color,
    color: 'white',
  };
}

const Button = (props) => (
  <div
    style={getStyle(props)}
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
  color: PropTypes.color,
};

export default Button;
