import { PropTypes } from 'react';
import styles from './styles.less';
import Submission from '../Submission';

function normaliseSubmissions(submissions) {
  return Object.keys(submissions).map((key) => {
    const data = submissions[key];
    return {
      text: key,
      mood: data > 0 ? 'positive' : 'negative',
      votes: Math.abs(data),
    };
  });
}

const Submissions = (props) => (
  <div className={styles.container}>
    {normaliseSubmissions(props.items).map((submission) => (
      <Submission
        onClick={() => props.onItemClick && props.onItemClick(submission.text)}
        key={submission.text}
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
