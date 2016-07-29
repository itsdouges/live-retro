import styles from './styles.less';
import { PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

const TextArea = (props) => (
  <div style={{ borderColor: props.color }} className={styles.container}>
    <Textarea autoFocus value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
  </div>
);

TextArea.prototype.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default TextArea;
