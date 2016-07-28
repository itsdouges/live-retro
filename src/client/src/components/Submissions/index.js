import { PropTypes } from 'react';
import styles from './styles.less';
import Submission from '../Submission';

const Submissions = (props) => (
  <div className={styles.container}>
    {props.items.map((submission) => (
      <Submission
        onClick={() => props.onItemClick && props.onItemClick(submission)}
        votes={props.votes && props.votes[submission]}
        key={submission}
        data={submission}
      />
    ))}
  </div>
);

Submissions.prototype.propTypes = {
  items: PropTypes.array,
  onItemClick: PropTypes.func,
  votes: PropTypes.object,
};

export default Submissions;
