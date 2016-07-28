import { Component, PropTypes } from 'react';
import config from '../../../scripts/config';
import { get } from 'axios';

const pollInterval = 1000;
const stageToRouteMapping = {
  submit: '/submit',
  vote: '/vote',
  results: '/results',
};

export default class ParticipantView extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.any,
    location: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.any,
  };

  componentWillMount() {
    this.checkStage();

    setInterval(() => {
      this.checkStage();
    }, pollInterval);
  }

  checkStage() {
    get(`${config.api}participant/stage`)
      .then(({ data }) => {
        const toRoute = stageToRouteMapping[data.stage];

        if (this.props.location.pathname !== toRoute) {
          this.context.router.push(toRoute);
        }
      });
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}
