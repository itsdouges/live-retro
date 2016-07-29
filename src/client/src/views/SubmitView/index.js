import { Component, PropTypes } from 'react';
import TextArea from '../../components/TextArea';
import MoodButton from '../../components/MoodButton';
import Button from '../../components/Button';
import styles from './styles.less';
import { post } from 'axios';
import config from '../../../scripts/config';
import bgNeutral from '../../assets/images/bg-neutral.png';
import bgPositive from '../../assets/images/bg-positive.png';
import bgNegative from '../../assets/images/bg-negative.png';
import TitleCard from '../../components/TitleCard';

const imageMapping = {
  positive: bgPositive,
  negative: bgNegative,
};

const colourMapping = {
  positive: '#3bb7be',
  negative: '#f89965',
};

const placeHolderMapping = {
  positive: 'Retro app was awesome... ;-)',
  negative: 'Hackathon went by too fast !!',
};

const defaultState = {
  mood: 'neutral',
  readyToSubmit: false,
  selectingMood: true,
  submission: '',
  starterText: 'Have your say, pick a mood..',
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
    this.setNeutralBackground();
  }

  setNeutralBackground() {
    this.context.setBackground(`url(${bgNeutral})`);
  }

  setMood = (mood) => {
    this.setState({
      ...this.state,
      selectingMood: false,
      mood,
    });

    this.context.setBackground(`url(${imageMapping[mood]})`);
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
      mood: this.state.mood === 'positive' ? 1 : -1,
    })
    .then(() => {
      console.log('subbmitted');
    });

    this.setState({
      ...defaultState,
      starterText: 'Say more! Else wait a bit..',
    });
    this.setNeutralBackground();
  };

  render() {
    const titleCard = this.state.selectingMood && <TitleCard big text={this.state.starterText} />;
    const negativeSize = (this.state.selectingMood && 'big') || (this.state.mood === 'negative' && 'bigger') || 'small';
    const positiveSize = (this.state.selectingMood && 'big') || (this.state.mood === 'positive' && 'bigger') || 'small';

    const positive = (
      <MoodButton
        inline={this.state.selectingMood}
        size={positiveSize}
        mood="positive"
        onClick={this.setMood}
      />
    );

    const negative = (
      <MoodButton
        inline={this.state.selectingMood}
        size={negativeSize}
        mood="negative"
        onClick={this.setMood}
      />
    );

    const submissionContainer = !this.state.selectingMood && (
      <div className={`${styles.submissionContainer} ${!this.state.selectingMood && styles.visible}`}>
        <TextArea
          color={colourMapping[this.state.mood]}
          value={this.state.submission}
          onChange={this.textChanged}
          placeholder={placeHolderMapping[this.state.mood]}
        />
        <Button
          color={colourMapping[this.state.mood]}
          enabled={this.state.readyToSubmit}
          onClick={this.submit}
          text="SUBMIT"
        />
      </div>
    );

    return (
      <div className={styles.container}>
        <div className={styles.moodContainer}>
          {positive}
          {negative}
        </div>
        {titleCard}
        {submissionContainer}
      </div>
    );
  }
}
