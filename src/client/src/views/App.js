import 'normalize.css/normalize.css';
import { Component } from 'react';
import Main from '../components/Main';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <Main />;
  }
}
