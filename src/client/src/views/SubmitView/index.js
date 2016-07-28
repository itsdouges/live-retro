import { Component, PropTypes } from 'react';
import TextArea from '../../components/TextArea';
import MoodButton from '../../components/MoodButton';
import Button from '../../components/Button';
import styles from './styles.less';
import { post } from 'axios';
import config from '../../../scripts/config';

const colourMapping = {
  1: 'yellow',
  [-1]: 'blue',
};

const defaultState = {
  mood: 0,
  readyToSubmit: false,
  selectingMood: true,
  submission: '',
};

export default class SubmitView extends Component {
  static contextTypes = {
    setBackground: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentWillMount() {
    this.context.setBackground('gray');
  }

  setMood = (mood) => {
    this.setState({
      ...this.state,
      selectingMood: false,
      mood,
    });

    this.context.setBackground(colourMapping[mood]);
  }

  textChanged = ({ target: { value } }) => {
    this.setState({
      ...this.state,
      readyToSubmit: !!value,
      submission: value,
    });
  }

  submit = () => {
    console.log(this.state.submission);

    post(`${config.api}participant/submissions`, {
      submission: this.state.submission,
      mood: this.state.mood,
    })
    .then(() => {
      console.log('subbmitted');
    });

    this.setState(defaultState);
    this.context.setBackground('gray');
  };

  render() {
    return (
      <div className={styles.container}>
        <div
          className={`${styles.feedbackTitle} ${!this.state.selectingMood && styles.invisible}`}
        >
          Choose the type of feedback...
        </div>

        <div>
          <MoodButton
            selected={this.state.mood === 1}
            showText={!this.state.selectingMood && this.state.mood !== 1}
            mood={1}
            onClick={this.setMood}
          />

          <MoodButton
            selected={this.state.mood === -1}
            showText={!this.state.selectingMood && this.state.mood !== -1}
            mood={-1}
            onClick={this.setMood}
          />
        </div>

        <div className={`${styles.submissionContainer} ${!this.state.selectingMood && styles.visible}`}>
          <TextArea value={this.state.submission} onChange={this.textChanged} />
          <Button enabled={this.state.readyToSubmit} onClick={this.submit} text="SUBMIT" />
        </div>
      </div>
    );
  }
}
