import { Component, PropTypes } from 'react';
import TextArea from '../../components/TextArea';
import MoodButton from '../../components/MoodButton';
import Button from '../../components/Button';
import styles from './styles.less';

const colourMapping = {
  positive: 'yellow',
  negative: 'blue',
};

const defaultState = {
  mood: '',
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

    this.setState(defaultState);
    this.context.setBackground('gray');
  };

  render() {
    return (
      <span>
        <div
          className={`${styles.feedbackTitle} ${!this.state.selectingMood && styles.invisible}`}
        >
          Choose the type of feedback...
        </div>

        <div>
          <MoodButton
            selected={this.state.mood === 'positive'}
            showText={!this.state.selectingMood && this.state.mood !== 'positive'}
            mood="positive"
            onClick={this.setMood}
          />

          <MoodButton
            selected={this.state.mood === 'negative'}
            showText={!this.state.selectingMood && this.state.mood !== 'negative'}
            mood="negative"
            onClick={this.setMood}
          />
        </div>

        <div className={`${styles.submissionContainer} ${!this.state.selectingMood && styles.visible}`}>
          <TextArea value={this.state.submission} onChange={this.textChanged} />
          <Button enabled={this.state.readyToSubmit} onClick={this.submit} text="SUBMIT" />
        </div>
      </span>
    );
  }
}
