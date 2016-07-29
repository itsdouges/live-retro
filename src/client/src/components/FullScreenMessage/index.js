import { PropTypes } from 'react';
import styles from './styles.less';

const FullScreenMessage = (props) => (
  <div
    className={`${styles.container} ${props.shown && styles.visible}`}
    style={{ background: props.background }}
  >
    <div className={styles.iconContainer}>
      <img className={styles.icon} src={props.icon} alt="abc" />
    </div>
    {props.text}
  </div>
);

FullScreenMessage.prototype.propTypes = {
  shown: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.any,
  background: PropTypes.string,
};

export default FullScreenMessage;
