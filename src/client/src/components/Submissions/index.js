import { PropTypes } from 'react';
import styles from './styles.less';
import Submission from '../Submission';

function orderByVotes(a, b) {
  if (a.votes < b.votes) {
    return 1;
  }

  if (a.votes > b.votes) {
    return -1;
  }

  return 0;
}

function hasVotes(submissions) {
  return submissions.filter(({ votes }) => !!votes).length > 0;
}

function normaliseSubmissions(submissions, votes) {
  const finalResult = !votes; // if votes is undefined data is from results page

  const normalised = Object.keys(submissions).map((key) => {
    const data = submissions[key];
    return {
      text: key,
      mood: data > 0 ? 'positive' : 'negative',
      votes: votes ? votes[key] : Math.abs(data) - 1,
      finalResult,
    };
  });

  const items = finalResult ? normalised.sort(orderByVotes) : normalised;

  if (!hasVotes(items)) {
    return items.reverse();
  }

  return items;
}

const Submissions = (props) => (
  <div className={styles.container}>
    {normaliseSubmissions(props.items, props.votes).map((submission) => (
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
