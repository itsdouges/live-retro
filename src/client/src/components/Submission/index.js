import { PropTypes } from 'react';
import styles from './styles.less';

const Submission = (props) => (
  <div onClick={props.onClick} className={styles.container}>
    {props.data}
    {props.votes}
  </div>
);

Submission.prototype.propTypes = {
  data: PropTypes.string,
  onClick: PropTypes.func,
  votes: PropTypes.string,
};

export default Submission;
