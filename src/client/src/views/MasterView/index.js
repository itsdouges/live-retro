import React, { Component, PropTypes } from 'react';
import { get, post } from 'axios';
import Button from '../../components/Button';
import config from '../../../scripts/config';

import styles from './styles.less';

const pollInterval = 1000;
const stageToRouteMapping = {
  submit: '/master/waiting',
  vote: '/master/waiting',
  results: '/master/results',
};

export default class MasterView extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.any,
  };

  state = {
    stage: Object.keys(stageToRouteMapping)[0],
  };

  componentDidMount() {
    setInterval(() => {
      this.readServerStage();
    }, pollInterval);
  }

  readServerStage() {
    get(`${config.api}master/state`)
      .then(({ data }) => {
        this.setState({ stage: data.stage });
        this.goTo(data.stage);
      });
  }

  updateServerStage(stage) {
    post(`${config.api}master/state`, { stage })
      .then(() => this.goTo(stage));
  }

  goTo(stage) {
    const toRoute = stageToRouteMapping[stage];
    if (this.props.location.pathname !== toRoute) {
      this.context.router.push(toRoute);
    }
  }

  render() {
    return (
      <span>
        <div className={styles.contentContainer}>
          {React.cloneElement(this.props.children, { master: true })}
        </div>
        <div className={styles.buttonsContainer}>
          {Object.keys(stageToRouteMapping).map((stage) => (
            <Button
              key={stage}
              color="blue"
              text={stage}
              enabled={stage !== this.state.stage}
              onClick={() => this.updateServerStage(stage)}
            />
          ))}
        </div>
      </span>
    );
  }
}
