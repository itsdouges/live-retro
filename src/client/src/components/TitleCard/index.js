import styles from './styles.less';
import { PropTypes } from 'react';

const TitleCard = (props) => (
  <div className={`${styles.container} ${props.big && styles.big}`}>
    {props.text}
  </div>
);

TitleCard.prototype.propTypes = {
  text: PropTypes.string,
  big: PropTypes.bool,
};

export default TitleCard;
