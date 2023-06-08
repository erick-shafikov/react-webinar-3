import { memo } from "react"
import './style.css'
import PropTypes from 'prop-types';

function CommentTextArea({onChangeHandler, text}){
  
  return (
    <>
      <textarea className="Comment-Input" onChange={onChangeHandler} value={text}/>
    </>
  )
};

CommentTextArea.propTypes = {
  onChangeHandler: PropTypes.func,
  text: PropTypes.string,
};

CommentTextArea.defaultProps = {
  text: '',
  onChangeHandler: () => {},
}

export default memo(CommentTextArea)