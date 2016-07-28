import { Component, PropTypes } from 'react';
import TitleCard from '../../components/TitleCard';
import Submissions from '../../components/Submissions';
import FullScreenMessage from '../../components/FullScreenMessage';

const voteLimit = 5;
const submissions = [
  'cool beans',
  'sweet ride',
  'awesome to work with',
];

export default class VoteView extends Component {
  static contextTypes = {
    setBackground: PropTypes.func,
  };

  static propTypes = {
    submissions: PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      voteCount: 0,
      votes: {},
    };
  }

  componentWillMount() {
    this.context.setBackground('red');
  }

  vote = (submission) => {
    const newState = {
      ...this.state,
      voteCount: this.state.voteCount + 1,
    };

    if (newState.votes[submission]) {
      newState.votes[submission] += 1;
    } else {
      newState.votes[submission] = 1;
    }

    if (newState.voteCount > voteLimit) {
      return;
    }

    setTimeout(() => {
      if (this.state.voteCount >= voteLimit) {
        this.setState({
          ...this.state,
          finishedVoting: true,
        });
      }
    }, 50);

    console.log(`vote for ${submission}`);
    this.setState(newState);
  }

  render() {
    return (
      <span>
        <FullScreenMessage background="white" text="Your votes have been submitted" shown={this.state.finishedVoting} />
        <TitleCard text={`Vote on the top ${voteLimit} topics you want to discuss...`} />
        <Submissions onItemClick={this.vote} items={submissions} votes={this.state.votes} />
      </span>
    );
  }
}
