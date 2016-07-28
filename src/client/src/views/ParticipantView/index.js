import { Component, PropTypes } from 'react';

const stageToRouteMapping = {
  submit: '/submit',
  vote: '/voting',
  result: '/results',
};

export default class ParticipantView extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.any,
  };

  static contextTypes = {
    router: PropTypes.any,
  };

  constructor() {
    super();
    this.state = {};

    this.readServerStage();

    // setInterval(() => {
    //   this.readServerState();
    // }, 50);
  }

  readServerStage() {
    setTimeout(() => {
      const result = 'result';

      const toRoute = stageToRouteMapping[result];
      this.context.router.push(toRoute);
    }, 50);
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}
