import { memo, useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import CommentTextArea from "../comment-text-area"
import PropTypes from 'prop-types';
import './style.css'
import {cn as bem} from '@bem-react/classname';

function CommentAnswer({isSession, addNewComment, switchActive, cancelAnswer, parentId}){
  const cn = bem('Answer');
  const ref = useRef(null);

  useEffect(()=>{
    ref.current.scrollIntoView({behavior: "smooth", block: "center"})
  }, [parentId])

  const [text, setText] = useState('');
  const location = useLocation();
  const navigate = useNavigate()

  const onChangeHandler = (e) =>{
    const value = e.target.value;
    setText(value);
  };

  const onSubmitHandler = () =>{
    const str = text.trim();

    if(str !== '') addNewComment(str, parentId, 'comment');

    setText('');
    switchActive('new')
    navigate(location.pathname, {})
  };

  const declineHandler = () =>{
    cancelAnswer();
    switchActive('new')
  }

  return (
    <div className={cn('container')} ref={ref}>
    {isSession 
      ? <>
          <h3 className={cn('header')}>Новый ответ</h3>
          <CommentTextArea text={text} onChangeHandler={onChangeHandler} isFocus={true}/>
          <button className={cn('button')} onClick={onSubmitHandler}>Отправить</button>
          <button onClick={declineHandler}>Отмена</button>
        </> 
      : <div className={cn('link')}>
          <Link to='/login' state={{back: location.pathname, from: parentId}}>Войдите</Link> чтобы иметь возможность комментировать
          &nbsp;<button className={cn('decline')} onClick={declineHandler}>Отмена</button>
        </div>}
    </div>
  )   
}

CommentAnswer.propTypes = {
  isSession: PropTypes.bool,
  addNewComment: PropTypes.func,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  switchActive: PropTypes.func,
  cancelAnswer: PropTypes.func,
};

CommentAnswer.defaultProps = {
  isSession: false,
  addAnswer: () => {},
  switchActive: () => {}
}

export default memo(CommentAnswer)