import { Component, PropTypes } from 'react';
import TitleCard from '../../components/TitleCard';
import Submissions from '../../components/Submissions';
import FullScreenMessage from '../../components/FullScreenMessage';
import { get, post } from 'axios';
import config from '../../../scripts/config';
import bgFlash from '../../assets/images/bg-flash.png';
import tick from '../../assets/images/tick.svg';

const voteLimit = 5;

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
      submissions: [],
      finishedVoting: false,
    };
  }

  componentWillMount() {
    this.context.setBackground(`url(${bgFlash})`);

    get(`${config.api}participant/submissions`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          ...this.state,
          submissions: data.submissions,
        });
      });
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

    post(`${config.api}participant/submissions/vote`, {
      submission,
    });
  }

  render() {
    return (
      <span>
        <FullScreenMessage
          background="white"
          text="Thanks for being awesome! Waiting for results.." shown={this.state.finishedVoting}
          icon={tick}
        />
        <TitleCard text="Choose your top five ;-)" />
        <Submissions onItemClick={this.vote} items={this.state.submissions} votes={this.state.votes} />
      </span>
    );
  }
}
