import { PropTypes } from 'react';
import styles from './styles.less';

const MoodButton = (props) => {
  const icon = props.mood === 'positive' ? <div>:)</div> : <div>:(</div>;
  const text = props.showText && (<span>{`Give ${props.mood} feedback`.toUpperCase()}</span>);

  return (
    <div
      className={`${styles.container} ${props.hidden && styles.hidden}`}
      onClick={() => props.onClick(props.mood)}
    >
      {icon}
      {text}
    </div>
  );
};

MoodButton.prototype.propTypes = {
  mood: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  showText: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default MoodButton;
