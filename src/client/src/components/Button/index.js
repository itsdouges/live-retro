import { PropTypes } from 'react';
import styles from './styles.less';

function getFilledStyle(props) {
  return {
    borderColor: props.color,
    color: props.color,
    backgroundColor: undefined,
  };
}

function getOutlineStyle(props) {
  return {
    borderColor: props.color,
    backgroundColor: props.color,
    color: 'white',
  };
}

function getStyle(props) {
  if (!props.enabled) {
    return props.invert ? getOutlineStyle(props) : getFilledStyle(props);
  }

  return !props.invert ? getOutlineStyle(props) : getFilledStyle(props);
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
  invert: PropTypes.bool,
};

export default Button;
