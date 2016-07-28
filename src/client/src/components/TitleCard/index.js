import styles from './styles.less';
import { PropTypes } from 'react';

const TitleCard = (props) => (
  <div className={styles.container}>
    {props.text}
  </div>
);

TitleCard.prototype.propTypes = {
  text: PropTypes.string,
};

export default TitleCard;
