import React, { Component, PropTypes } from 'react';
import { get } from 'axios';
import config from '../../../scripts/config';

import styles from './styles.less';

const pollInterval = 1000;
const stageToRouteMapping = {
  submit: '/master/waiting',
  vote: '/master/waiting',
  result: '/master/results',
};

export default class MasterView extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.any,
  };

  constructor() {
    super();
    this.state = {};

    setInterval(() => {
      this.readServerStage();
    }, pollInterval);
  }

  readServerStage() {
    get(`${config.api}master/state`)
      .then(({ data }) => {
        const toRoute = stageToRouteMapping[data.stage];

        if (this.props.location.pathname !== toRoute) {
          this.context.router.push(toRoute);
        }
      });
  }

  render() {
    return (
      <span>
        <div className={styles.contentContainer}>
          {React.cloneElement(this.props.children, { master: true })}
        </div>
        <div className={styles.controlsContainer}>
          nxt
          prv
        </div>
      </span>
    );
  }
}
