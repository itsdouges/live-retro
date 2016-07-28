import { Component, PropTypes } from 'react';
import styles from './styles.less';

const stageToRouteMapping = {
  submit: '/master/waiting',
  vote: '/master/waiting',
  result: '/master/results',
};

export default class MasterView extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    router: PropTypes.any,
  };

  constructor() {
    super();
    this.state = {};

    this.readServerStage();
  }

  readServerStage() {
    setTimeout(() => {
      const result = 'submit';

      const toRoute = stageToRouteMapping[result];
      this.context.router.push(toRoute);
    }, 50);
  }

  render() {
    return (
      <span>
        <div className={styles.contentContainer}>
          {this.props.children}
        </div>
        <div className={styles.controlsContainer}>
          nxt
          prv
        </div>
      </span>
    );
  }
}
