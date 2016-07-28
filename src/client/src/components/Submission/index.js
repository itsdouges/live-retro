import { PropTypes } from 'react';
import styles from './styles.less';
import MoodIcon from '../MoodIcon';

const Submission = (props) => (
  <div onClick={props.onClick} className={styles.container}>
    <div className={styles.icon}><MoodIcon size="micro" mood={props.data.mood} /></div>
    <div className={styles.text}>{props.data.text}</div>
    <div className={styles.votes}>{props.data.votes}</div>
  </div>
);

Submission.prototype.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default Submission;
