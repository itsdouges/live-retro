import { Component, PropTypes } from 'react';

export default class MasterView extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
