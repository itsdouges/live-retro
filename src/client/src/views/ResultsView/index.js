import { Component, PropTypes } from 'react';
import TitleCard from '../../components/TitleCard';
import Submissions from '../../components/Submissions';
import { get } from 'axios';
import config from '../../../scripts/config';
import bgNeutral from '../../assets/images/bg-neutral.png';

export default class ResultsView extends Component {
  static contextTypes = {
    setBackground: PropTypes.func,
  };

  static propTypes = {
    master: PropTypes.bool,
    stage: PropTypes.string,
    location: PropTypes.object,
  };

  state = {
    submissions: [],
  };

  componentWillMount() {
    this.context.setBackground(`url(${bgNeutral})`);
    const masterMode = this.props.master;

    const url = masterMode
      ? `${config.api}master/state`
      : `${config.api}results`;

    this.hydrateSubmissions(url);

    if (masterMode) {
      this.hydrateInterval = setInterval(() => {
        this.hydrateSubmissions(url);
      }, 1000);
    }
  }

  componentWillUnmount() {
    if (this.hydrateInterval) {
      clearInterval(this.hydrateInterval);
    }
  }

  hydrateSubmissions(url) {
    get(url)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          submissions: data.submissions,
        });
      });
  }

  render() {
    let message;
    switch (this.props.stage) {
      case 'vote':
        message = 'Voting...';
        break;
      case 'results':
        message = 'The results are in!';
        break;
      default:
        message = 'Waiting for submissions...';
    }
    return (
      <span>
        <TitleCard text={message} />
        <Submissions highlightWinner master={this.props.master} items={this.state.submissions} />
      </span>
    );
  }
}
