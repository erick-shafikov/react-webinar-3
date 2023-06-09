import { memo, useEffect, useRef } from "react"
import './style.css'
import PropTypes from 'prop-types';

function CommentTextArea({onChangeHandler, text, isFocus}){

  const ref = useRef();

  useEffect(() => {
    if(isFocus) ref.current.focus();
  })
  
  return (
    <>
      <textarea className="Comment-Input" onChange={onChangeHandler} value={text} ref={ref}/>
    </>
  )
};

CommentTextArea.propTypes = {
  onChangeHandler: PropTypes.func,
  text: PropTypes.string,
  isFocus: PropTypes.bool
};

CommentTextArea.defaultProps = {
  text: '',
  onChangeHandler: () => {},
}

export default memo(CommentTextArea)