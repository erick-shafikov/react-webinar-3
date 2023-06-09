import { Link, useLocation, useParams } from "react-router-dom"
import CommentTextArea from "../comment-text-area"
import { memo, useState } from "react"
import PropTypes from 'prop-types';
import './style.css'


function NewComment({isSession, addNewComment, current}){
  const { id } = useParams();
  const location = useLocation()
  const [text, setText] = useState('');


  const onChangeHandler = (e) =>{
    const value = e.target.value;
    setText(value);
  };

  const onSubmitHandler = () =>{
    const str = text.trim();

    if(str !== '') addNewComment(str, id, 'article');

    setText('');
  };
  
  return (
    <div className="NewComment-container">
    {isSession 
      ? <>
          <h3 className="NewComment-header">Новый комментарий</h3>
          <CommentTextArea onChangeHandler={onChangeHandler} text={text} isFocus={current=== 'new'}/>
          <button onClick={onSubmitHandler}>Отправить</button>
        </> 
      : <>
          <Link to='/login' state={{back: location.pathname, from: 'new'}}>Войдите</Link> чтобы иметь возможность комментировать
        </>}
    </div>
  )   
}

NewComment.propTypes = {
  addNewComment: PropTypes.func,
  isSession: PropTypes.bool,
  current: PropTypes.string
};

NewComment.defaultProps = {
  isSession: false,
  addNewComment: () => {},
}

export default memo(NewComment)