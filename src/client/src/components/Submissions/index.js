import { PropTypes } from 'react';
import styles from './styles.less';
import Submission from '../Submission';

const Submissions = (props) => (
  <div className={styles.container}>
    {props.items.map((submission) => <Submission key={submission} data={submission} />)}
  </div>
);

Submissions.prototype.propTypes = {
  items: PropTypes.array,
};

export default Submissions;
