import { PropTypes } from 'react';
import styles from './styles.less';

const Submission = (props) => (
  <div onClick={props.onClick} className={styles.container}>
    {props.data.mood}
    {props.data.text}
    {props.data.votes}
  </div>
);

Submission.prototype.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default Submission;
