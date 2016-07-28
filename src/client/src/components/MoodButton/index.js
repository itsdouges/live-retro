import { PropTypes } from 'react';
import styles from './styles.less';
import MoodIcon from '../MoodIcon';

const MoodButton = (props) => (
  <div
    className={styles.container}
    onClick={() => props.onClick(props.mood)}
  >
    <MoodIcon mood={props.mood} size={props.size} />
  </div>
);

MoodButton.prototype.propTypes = {
  mood: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default MoodButton;
