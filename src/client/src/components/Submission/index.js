import { PropTypes } from 'react';
import styles from './styles.less';

const Submission = (props) => (
  <div className={styles.container}>
    {props.data}
  </div>
);

Submission.prototype.propTypes = {
  data: PropTypes.string,
};

export default Submission;
