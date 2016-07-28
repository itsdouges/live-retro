import styles from './styles.less';
import { PropTypes } from 'react';

const TextArea = (props) => (
  <div className={styles.container}>
    <textarea value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
  </div>
);

TextArea.prototype.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default TextArea;
