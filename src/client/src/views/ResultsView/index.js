import { Component, PropTypes } from 'react';
import TitleCard from '../../components/TitleCard';
import Submissions from '../../components/Submissions';
import { get } from 'axios';
import config from '../../../scripts/config';

export default class ResultsView extends Component {
  static contextTypes = {
    setBackground: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      submissions: [],
    };
  }

  componentWillMount() {
    this.context.setBackground('purple');

    get(`${config.api}results`)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          submissions: data.submissions,
        });
      });
  }

  render() {
    return (
      <span>
        <TitleCard text="The results are in..." />
        <Submissions items={this.state.submissions} />
      </span>
    );
  }
}
