import { Component, PropTypes } from 'react';

const participant = 'participant';
const stageToRouteMapping = {
  submit: `/${participant}/submit`,
  vote: `/${participant}/voting`,
  result: `/${participant}/result`,
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
      const result = 'submit';

      const toRoute = stageToRouteMapping[result];
      this.context.router.push(toRoute);
    }, 50);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
