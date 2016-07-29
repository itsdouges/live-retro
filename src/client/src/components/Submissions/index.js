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

function normaliseSubmissions({ items, votes, master }) {
  const finalResult = !votes; // if votes is undefined data is from results page

  const normalised = Object.keys(items).map((key) => {
    const data = items[key];
    return {
      text: key,
      mood: data > 0 ? 'positive' : 'negative',
      votes: votes ? votes[key] : Math.abs(data) - 1,
      finalResult,
    };
  });

  const submissions = finalResult ? normalised.sort(orderByVotes) : normalised;

  if (master && !hasVotes(submissions)) {
    return submissions.reverse();
  }

  return submissions;
}

const Submissions = (props) => (
  <div className={styles.container}>
    {normaliseSubmissions(props).map((submission, index) => (
      <Submission
        winner={props.highlightWinner && index === 0}
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
  master: PropTypes.bool,
  highlightWinner: PropTypes.bool,
};

export default Submissions;
