import { Component, PropTypes } from 'react';
import TitleCard from '../../components/TitleCard';
import Submissions from '../../components/Submissions';

const submissions = [
  'hey',
  'there',
  'whatsup',
  'man',
];

export default class ResultsView extends Component {
  static contextTypes = {
    setBackground: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.context.setBackground('purple');
  }

  render() {
    return (
      <span>
        <TitleCard text="The results are in..." />
        <Submissions items={submissions} />
      </span>
    );
  }
}
