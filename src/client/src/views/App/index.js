import { Component, PropTypes } from 'react';
import styles from './style.less';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static childContextTypes = {
    setBackground: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      background: 'yellow',
    };
  }

  getChildContext() {
    return {
      setBackground: this.setBackground,
    };
  }

  setBackground = (background) => {
    this.setState({
      ...this.state,
      background,
    });
  }

  render() {
    return (
      <div
        style={{
          background: this.state.background,
        }}
        className={styles.container}
      >
        {this.props.children}
      </div>
    );
  }
}
