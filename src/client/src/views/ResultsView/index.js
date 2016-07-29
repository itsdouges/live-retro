import { Component, PropTypes } from 'react';
import TitleCard from '../../components/TitleCard';
import Submissions from '../../components/Submissions';
import { get } from 'axios';
import config from '../../../scripts/config';
import bgPositive from '../../assets/images/bg-positive.png';

export default class ResultsView extends Component {
  static contextTypes = {
    setBackground: PropTypes.func,
  };

  static propTypes = {
    master: PropTypes.bool,
    location: PropTypes.object,
  };

  state = {
    submissions: [],
  };

  componentWillMount() {
    this.context.setBackground(`url(${bgPositive})`);

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
    const { submissions } = this.state;
    const message = Object.keys(submissions).length === 0
      ? 'Waiting for submissions...'
      : 'The results are in...';

    return (
      <span>
        <TitleCard text={message} />
        <Submissions items={this.state.submissions} />
      </span>
    );
  }
}
