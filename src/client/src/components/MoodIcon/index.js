import { PropTypes } from 'react';
import styles from './styles.less';
import positive from '../../assets/images/positive.svg';
import negative from '../../assets/images/negative.svg';

const MoodIcon = (props) => {
  const moodSvg = props.mood === 'positive' ? positive : negative;

  return (
    <img className={`${styles.container} ${styles[props.size]}`} alt="img" src={moodSvg} />
  );
};

MoodIcon.prototype.propTypes = {
  mood: PropTypes.string,
  size: PropTypes.string,
};

export default MoodIcon;
