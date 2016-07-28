import { Component, PropTypes } from 'react';
import TitleCard from '../../components/TitleCard';
import Submissions from '../../components/Submissions';

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
    this.state = {};
  }

  componentWillMount() {
    this.context.setBackground('red');
  }

  render() {
    return (
      <span>
        <TitleCard text={`Vote on the top ${voteLimit} topics you want to discuss...`} />
        <Submissions items={submissions} />
      </span>
    );
  }
}
